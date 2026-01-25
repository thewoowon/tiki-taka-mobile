import axios from 'axios';
import { Platform } from 'react-native';
import { API_PREFIX, API_URL } from '@env';
import {
  getAccessToken,
  getRefreshToken,
  login,
  setAccessToken,
} from '@services/auth';

const BASE_URL = Platform.select({
  ios: API_URL,
  android: API_URL,
});

const customAxios = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

// queue 처리 (동시 요청 시 리프레시 토큰 한 번만 요청)
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

customAxios.interceptors.request.use(async config => {
  const token = await getAccessToken();
  console.log('Current access token:', config.url);
  console.log(config.headers);

  // /auth로 시작하거나 /verify로 시작하는 요청은 토큰을 포함하지 않음
  if (
    (config.url?.startsWith(`${API_PREFIX}/auth`) &&
      !config.url?.startsWith(`${API_PREFIX}/auth/withdraw`)) ||
    config.url?.startsWith(`${API_PREFIX}/verify`)
  ) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No access token found, request will proceed without it.');
  }

  return config;
});

customAxios.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    // "data": {
    //   "code": "JWT_VERIFY_EXPIRED",
    //   "message": "인증정보가 만료 됐습니다.",
    //   "name": "TokenExpiredException",
    //   "path": "/api/v1/favorite",
    //   "statusCode": 401
    // },
    const reponseData = error.response?.data;

    const isTokenError = error.response?.status === 401;

    console.error('Axios error:', {
      message: error.message,
      status: error.response?.status,
      data: reponseData,
      config: originalRequest,
    });

    if (isTokenError) {
      const errorCode = reponseData?.code;

      if (errorCode === 'JWT_VALIDATE_ERROR') {
        console.warn(
          'JWT_VALIDATE_ERROR: Refresh token also invalid. Clearing queue and aborting.',
        );

        failedQueue = []; // 큐 비우기
        isRefreshing = false; // 플래그 초기화

        return handleAuthFailure(error); // 재시도 없이 바로 실패 처리
      }

      if (errorCode === 'JWT_VERIFY_EXPIRED') {
        console.warn('Token expired, attempting to refresh token...');

        if (originalRequest._retry) {
          return handleAuthFailure(error);
        }

        originalRequest._retry = true;

        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          return handleAuthFailure(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(customAxios(originalRequest));
              },
              reject: (err: any) => {
                reject(err);
              },
            });
          });
        }

        isRefreshing = true;

        try {
          const res = await customAxios.post(`/token/refresh`, {
            refreshToken,
          });

          const newAccessToken = res.headers['accesstoken']?.replace(
            'Bearer ',
            '',
          );
          const newRefreshToken = res.headers['refreshtoken']?.replace(
            'RefreshToken ',
            '',
          );

          if (!newAccessToken || !newRefreshToken) {
            throw new Error('토큰 재발급 실패: 응답 헤더 누락');
          }

          await login({
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
          });

          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return customAxios(originalRequest);
        } catch (err) {
          processQueue(err, null);
          return handleAuthFailure(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

// ❗ Hook 호출 불가 영역이므로 콜백으로 추후 주입 필요
let authFailureCallback: (() => void) | null = null;

export const setAuthFailureHandler = (fn: () => void) => {
  authFailureCallback = fn;
};

const handleAuthFailure = (error: any) => {
  if (authFailureCallback) {
    authFailureCallback(); // 로그인 화면으로 이동, 모달 등
  }
  return Promise.reject(error);
};

export default customAxios;
