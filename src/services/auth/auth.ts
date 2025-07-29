import customAxios from '@axios/customAxios';
import {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  deleteTokens,
} from './token';
import {API_PREFIX} from '@env';

// 로그인 및 토큰 저장
export const login = async ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}): Promise<void> => {
  try {
    // Access 및 Refresh Token 저장
    await setAccessToken(access_token);
    await setRefreshToken(refresh_token);
  } catch (error) {
    throw error;
  }
};

// 로그아웃 및 토큰 삭제
export const logout = async (): Promise<void> => {
  try {
    await deleteTokens();
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await customAxios.post(
      `${API_PREFIX}/auth/refresh-token`,
      {
        refresh_token: refreshToken,
      },
    );
    await setAccessToken(response.data.access_token);
    return true;
  } catch (error) {
    return false;
  }
};

export const validateAccessToken = async (): Promise<boolean> => {
  try {
    const token = await getAccessToken();
    if (!token) {
      // accessToken이 없으면 무조건 false
      return false;
    }
    const response = await customAxios.get(`${API_PREFIX}/user/me`);
    return response.status === 200;
  } catch (e: any) {
    // refreshToken에 의해 내부적으로 재시도 되었을 수 있음
    // 재발급 실패로 인해 authFailureCallback이 호출되면 그건 별도로 처리
    console.warn('validateAccessToken failed:', e?.response?.status);

    // 실제로 재발급까지 실패한 경우에만 false 리턴
    if (e?.response?.status === 401) {
      // 이 시점에서 다시 accessToken이 존재하는지 체크
      const token = await getAccessToken();
      if (!token) {
        return false; // 여전히 없으면 실패로 간주
      }

      // 재발급 후 토큰이 있다면 다시 한번 호출해봄
      try {
        const retry = await customAxios.get(`${API_PREFIX}/user/me`);
        return retry.status === 200;
      } catch (e2) {
        return false;
      }
    }

    return false;
  }
};
