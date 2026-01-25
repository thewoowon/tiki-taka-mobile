import React, { useEffect, useState, type ReactElement } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Pressable,
} from 'react-native';
import { useAuth } from '@hooks/index';
import SocialLoginButton from '@components/molecules/SocialLoginButton';
import Icon from '@components/atoms/icon/Icon';
import { getLastLoginProvider } from '@storage/lastLoginProvider';
import type {
  GetProfileResponse,
  NaverLoginResponse,
} from '@react-native-seoul/naver-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {
  logout as kakaoLogout,
  login as kakaoLogin,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '@axios/customAxios';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@contexts/ToastContext';
import { login, logout } from '@services/auth';
import { theme } from '@contexts/theme';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const Gap = (): ReactElement => <View style={{ marginTop: 24 }} />;
const ResponseJsonText = ({
  json = {},
  name,
}: {
  json?: object;
  name: string;
}): ReactElement => (
  <View
    style={{
      padding: 12,
      borderRadius: 16,
      borderWidth: 1,
      backgroundColor: '#242c3d',
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
      {name}
    </Text>
    <Text style={{ color: 'white', fontSize: 13, lineHeight: 20 }}>
      {JSON.stringify(json, null, 4)}
    </Text>
  </View>
);

type IntroViewProps = {
  result: string;
};

function IntroView({ result }: IntroViewProps): React.ReactElement {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>{result}</Text>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const SignInScreen = ({ navigation, route: _route }: any) => {
  const { showToast } = useToast();
  const [loginContext, setLoginContext] = useState<{
    providerType: 'NAVER' | 'KAKAO' | 'GOOGLE' | 'APPLE' | 'NONE';
    authCode: string;
    name: string;
    nickName: string;
    phoneNumber: string;
  }>({
    providerType: 'NONE',
    authCode: '',
    nickName: '',
    name: '',
    phoneNumber: '',
  });
  const { setIsAuthenticated } = useAuth();
  const [recentLogin, setRecentLogin] = useState<ProviderType | null>(null);
  const [result, setResult] = useState<string>('');

  const [success, setSuccessResponse] =
    useState<NaverLoginResponse['successResponse']>();

  const [failure, setFailureResponse] =
    useState<NaverLoginResponse['failureResponse']>();
  const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();

  // // APPROVED, REJECTED, WAITING
  // const fetchMyInfo = async () => {
  //   try {
  //     const response = await customAxios.get(`${API_PREFIX}/user/me`);
  //     if (response.status !== 200) {
  //       throw new Error('Failed to fetch my info');
  //     }

  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching my info:', error);
  //     showToast('내 정보 조회에 실패했습니다.', 'error');

  //     return null;
  //   }
  // };

  // // 기존 유저인지 아닌지 검증하는 mutation
  // const { mutateAsync: verifyMutation } = useMutation({
  //   mutationFn: async (context: {
  //     providerType: 'NAVER' | 'KAKAO' | 'GOOGLE' | 'APPLE';
  //     authCode: string;
  //   }) => {
  //     const response = await customAxios.get(`${API_PREFIX}/verify/social`, {
  //       params: {
  //         providerType: context.providerType,
  //         authCode: context.authCode,
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error('Failed to verify social login');
  //     }

  //     return response.data;
  //   },
  // });

  // const { mutateAsync: loginMutation } = useMutation({
  //   mutationFn: async ({
  //     providerType,
  //     authCode,
  //   }: {
  //     providerType: ProviderType;
  //     authCode: string;
  //   }) => {
  //     if (!loginContext) {
  //       throw new Error('Login context is required to update user role');
  //     }

  //     const response = await customAxios.post(
  //       `${API_PREFIX}/auth/oauth/login`,
  //       {
  //         providerType: providerType || 'KAKAO',
  //         authCode: authCode || '',
  //         name: '',
  //         nickName: '',
  //         phoneNumber: '',
  //         // userRole: 'CUSTOMER',
  //       },
  //     );

  //     if (response.status !== 200) {
  //       throw new Error('Failed to login with social account');
  //     }

  //     console.log('Access token:', response.headers['authorization']);

  //     await login({
  //       access_token: response.headers['authorization'].replace('Bearer ', ''),
  //       refresh_token: response.headers['refreshtoken'].replace(
  //         'RefreshToken ',
  //         '',
  //       ),
  //     });

  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     console.log('Login successful');
  //     // setIsAuthenticated(true);
  //     // navigation.navigate('RegisterStore', {
  //     //   screen: 'RegisterStoreStart',
  //     // });
  //   },
  //   onError: error => {
  //     console.error('Error during login:', error);
  //     showToast('로그인에 실패했습니다. 다시 시도해주세요.', 'error');
  //   },
  // });

  // const { mutate: guestMutation } = useMutation({
  //   mutationFn: async () => {
  //     const response = await customAxios.post(`${API_PREFIX}/auth/user/test`);

  //     if (response.status !== 200) {
  //       throw new Error('Failed to login with social account');
  //     }

  //     console.log('Access token:', response.headers['authorization']);

  //     await login({
  //       access_token: response.headers['authorization'].replace('Bearer ', ''),
  //       refresh_token: response.headers['refreshtoken'].replace(
  //         'RefreshToken ',
  //         '',
  //       ),
  //     });

  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     console.log('Login successful');
  //     setIsAuthenticated(true);
  //   },
  //   onError: error => {
  //     console.error('Error during login:', error);
  //     showToast('게스트 로그인에 실패했습니다. 다시 시도해주세요.', 'error');
  //   },
  // });

  // const handleLoginButtonClick = async (name: ProviderType) => {
  //   if (name === 'KAKAO') {
  //     await signInWithKakao();
  //   } else if (name == 'GOOGLE') {
  //     // 보류
  //     // setIsAuthenticated(true);
  //     navigation.navigate('SignUp', {
  //       screen: 'UserRole',
  //       params: {
  //         providerType: 'NAVER',
  //         authCode: 'accessToken',
  //       },
  //     });
  //   } else if (name == 'NAVER') {
  //     await signInWithNaver();
  //   } else {
  //     await signInWithApple();
  //   }
  // };

  const socialLoginButton = (name: ProviderType) => {
    return (
      <View style={styles.socialLoginWrapper}>
        {recentLogin === name && (
          <View style={styles.recentLoginIndicator}>
            <Icon
              name="MessageBubbleIcon"
              text="최근에 로그인했어요"
              width={129}
              height={42}
            />
          </View>
        )}
        <SocialLoginButton
          name={name}
          onPress={() => {
            return;
          }}
        />
      </View>
    );
  };

  const signInAsAGuest = async () => {
    // /api/v1/auth/user/test
    // await guestMutation();
    return;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.topBackground} />
      <View style={styles.bottomBackground} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentWrapper}>
              <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.title}>안녕하세요:)</Text>
                  <Text style={styles.subtitle}>티키타카입니다.</Text>
                  <Text style={styles.description}>
                    티키타카 서비스를 이용하려면 로그인이 필요해요
                  </Text>
                </View>
                <View style={styles.bottomContainer}>
                  <View style={styles.socialLoginContainer}>
                    {socialLoginButton('KAKAO')}
                    {/* {socialLoginButton('NAVER')} */}
                    {socialLoginButton('GOOGLE')}
                    {Platform.OS === 'ios' && socialLoginButton('APPLE')}
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <Pressable
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={signInAsAGuest}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          color: theme.colors.gray400,
                          fontSize: 14,
                        },
                      ]}
                    >
                      - 로그인 없이 둘러보기 -
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: theme.colors.tikiDarkGreen,
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: theme.colors.darkBg,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: theme.colors.darkBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: Platform.select({
      ios: 40,
      android: 20,
    }),
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.white,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.white,
  },
  description: {
    fontSize: 14,
    color: theme.colors.gray400,
  },
  bottomContainer: {
    paddingTop: 20,
  },
  socialLoginContainer: {
    justifyContent: 'center',
    gap: 12,
    marginBottom: Platform.select({
      ios: 0,
      android: 40,
    }),
  },
  socialLoginWrapper: {
    position: 'relative',
  },
  recentLoginIndicator: {
    position: 'absolute',
    top: -30,
    right: 8,
    zIndex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  button: {
    backgroundColor: '#FEE500',
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
});

export default SignInScreen;
