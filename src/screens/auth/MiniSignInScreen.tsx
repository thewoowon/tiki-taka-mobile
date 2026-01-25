import { MenuIcon, TikiTakaLogoIcon, XIcon } from '@components/Icons';
import { useTheme } from '@contexts/ThemeContext';
import useAuth from '@hooks/useAuth';
import { confirm } from '@utils/confirm';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { login, logout } from '@services/auth';
import Animated from 'react-native-reanimated';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { theme } from '@contexts/theme';
import SecondaryButton from '@components/atoms/buttons/SecondaryButton';
import Header from '@components/layout/Header';
import { useGlobalMenu } from '@contexts/GlobalMenuContext';
import SocialLoginButton from '@components/molecules/SocialLoginButton';
import { useToast } from '@contexts/ToastContext';
import { GoogleUser, useGoogleAuth } from '@thewoowon/google-rn';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import customAxios from '@axios/customAxios';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@contexts/UserContext';

const MiniSignInScreen = ({ navigation, route }: any) => {
  const { user, loading, signIn, signOut, isAuthenticated, getAccessToken } =
    useGoogleAuth();

  const { setIsAuthenticated } = useAuth();
  const { scale, colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [continueOpen, setContinueOpen] = useState(false);

  const { showToast } = useToast();

  const { openMenu } = useGlobalMenu();
  const { setUser } = useUser();

  const fetchMyInfo = async () => {
    try {
      const response = await customAxios.get(`/user/getUserInfo`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch my info');
      }

      return response.data.data as UserType;
    } catch (error) {
      console.error('Error fetching my info:', error);
      showToast('내 정보 조회에 실패했습니다.', 'error');

      return null;
    }
  };

  // 기존 유저인지 아닌지 검증하는 mutation
  const { mutateAsync: verifyMutation } = useMutation({
    mutationFn: async (context: { email: string }) => {
      const response = await customAxios.get(`/user/getUserInfo`);

      if (response.status !== 200) {
        throw new Error('Failed to verify social login');
      }

      return response.data;
    },
  });

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: async ({ user }: { user: GoogleUser }) => {
      const response = await customAxios.post(`/login/googleLogin`, {
        sub: user.id,
        email: user.email,
        name: user.name,
        picture: user.photoUrl,
      });

      if (response.status !== 200) {
        throw new Error('Failed to login with social account');
      }

      console.log('response.headers: ', response.headers);

      console.log('Access token:', response.headers['authorization']);

      await login({
        access_token: response.headers['accesstoken'].replace('Bearer ', ''),
        refresh_token: response.headers['refreshtoken'].replace(
          'RefreshToken ',
          '',
        ),
      });

      return response.data;
    },
    onSuccess: () => {
      console.log('Login successful');
    },
    onError: error => {
      console.error('Error during login:', error);
      showToast('로그인에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const { mutateAsync: appleLoginMutation } = useMutation({
    mutationFn: async ({
      identityToken,
      email,
      name,
    }: {
      identityToken: string;
      email: string;
      name?: string;
    }) => {
      const response = await customAxios.post(`/login/appleLogin`, {
        identityToken,
        email,
        name,
      });

      if (response.status !== 200) {
        throw new Error('Failed to login with Apple account');
      }

      console.log('Apple Access token:', response.headers['authorization']);

      await login({
        access_token: response.headers['accesstoken'].replace('Bearer ', ''),
        refresh_token: response.headers['refreshtoken'].replace(
          'RefreshToken ',
          '',
        ),
      });

      return response.data;
    },
    onSuccess: () => {
      console.log('Apple login successful');
    },
    onError: error => {
      console.error('Error during Apple login:', error);
      showToast('애플 로그인에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const signInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - No identity token');
      }

      // Apple에서 받은 데이터
      const {
        identityToken,
        user: appleUserId,
        email,
        fullName,
      } = appleAuthRequestResponse;

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleUserId,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        try {
          console.log('Apple User Info:', {
            appleUserId,
            email,
            fullName,
            identityToken,
          });

          // Apple은 email을 최초 로그인시에만 제공
          // 이후 로그인에서는 identityToken만 제공됨
          if (email) {
            // 최초 로그인 또는 email이 있는 경우
            // const verifyResponse = await verifyMutation({ email });
            // console.log('Verify Response:', verifyResponse);
            // if (verifyResponse.exists) {
            //   // 기존 유저 로그인
            //   await appleLoginMutation({
            //     identityToken,
            //     email,
            //   });
            // } else {
            //   // 신규 유저 회원가입
            //   await appleSignUpMutation({
            //     identityToken,
            //     email,
            //     name: fullName
            //       ? `${fullName.givenName || ''} ${
            //           fullName.familyName || ''
            //         }`.trim()
            //       : undefined,
            //   });
            //   navigation.navigate('SignUp');
            // }
            await appleLoginMutation({
              identityToken,
              email,
              name: fullName
                ? `${fullName.givenName || ''} ${
                    fullName.familyName || ''
                  }`.trim()
                : undefined,
            });
            const userData = await fetchMyInfo();

            console.log('userData: ', userData);

            if (!userData) throw new Error('Failed to fetch user data');

            setUser({
              id: userData.userId,
              email: userData.email,
              nickname: userData.name,
              profileImageUrl: userData.profileImage,
            });
            setIsAuthenticated(true);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Tabs', params: { screen: 'MainScreen' } }],
            });
          } else {
            showToast(
              '이메일을 가져오지 못했어요. 다시 시도해주세요.',
              'error',
            );
          }
        } catch (error) {
          console.error('Error during Apple social login flow:', error);
          showToast(
            '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
            'error',
          );
        }
      } else {
        console.error('Apple login failed:', credentialState);
        showToast('애플 로그인에 실패했습니다.', 'error');
      }
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.log('User canceled Apple Sign in');
      } else {
        console.error('Apple Sign-In error:', error);
        showToast('애플 로그인 중 오류가 발생했습니다.', 'error');
      }
    }
  };

  const handleSignIn = async (name: ProviderType) => {
    try {
      if (name === 'APPLE') {
        await signInWithApple();
        return;
      }
      await signIn();
    } catch (error) {
      console.error('[App] Sign in error:', error);
      Alert.alert('오류', '로그인에 실패했습니다.');
    }
  };

  const handleLoginButtonClick = async () => {
    try {
      if (!user) {
        throw new Error('Google user information is missing after sign-in.');
      }

      // console.log('Google User Info:', user);
      // // 2. 서버에 기존 유저인지 검증 요청
      // const verifyResponse = await verifyMutation({
      //   email: user.email,
      // });
      // console.log('Verify Response:', verifyResponse);
      // if (verifyResponse.exists) {
      //   // 3-1. 기존 유저라면 바로 로그인 처리
      //   await loginMutation({ user });
      // } else {
      //   await signUpMutation({ user });
      //   navigation.navigate('SignUp');
      // }
      await loginMutation({ user });
      const userData = await fetchMyInfo();

      console.log('userData: ', userData);

      if (!userData) throw new Error('Failed to fetch user data');

      setUser({
        id: userData.userId,
        email: userData.email,
        nickname: userData.name,
        profileImageUrl: userData.profileImage,
      });
      setIsAuthenticated(true);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs', params: { screen: 'MainScreen' } }],
      });
    } catch (error) {
      console.error('Error during Google social login flow:', error);
      showToast('로그인 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    }
  };

  const socialLoginButton = (name: ProviderType) => {
    return (
      <SocialLoginButton
        name={name}
        onPress={() => {
          handleSignIn(name);
        }}
      />
    );
  };

  useEffect(() => {
    console.log('useEffect User info changed:', user);
    if (user) handleLoginButtonClick();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <Header
        onPress={() => navigation.goBack()}
        title="로그인"
        rightButton={<MenuIcon />}
        rightButtonAction={openMenu}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 20,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={[
            styles.flexColumnBox,
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.darkBg,
              paddingVertical: 30,
              paddingHorizontal: 20,
              borderRadius: 15,
            },
          ]}
        >
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text style={styles.titleText}>AI 면접 진행을 위해</Text>
            <Text style={styles.titleText}>로그인이 필요해요</Text>
          </View>
          <View style={styles.socialLoginContainer}>
            {/* {socialLoginButton('KAKAO')} */}
            {/* {socialLoginButton('NAVER')} */}
            {socialLoginButton('GOOGLE')}
            {Platform.OS === 'ios' && socialLoginButton('APPLE')}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    maxHeight: 50,
    borderBottomWidth: 1,
    borderColor: '#F2F4F6',
  },
  headerText: {
    color: '#181818',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
  flexRowBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumnBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 28,
    color: 'white',
  },
  rateText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    color: 'white',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 21,
    color: theme.colors.gray400,
  },
  resumeBox: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.darkBg,
    borderRadius: 5,
  },
  resumeText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    color: theme.colors.gray100,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
  imageBox: {
    width: 52,
    height: 52,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonFillBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: theme.colors.tikiGreen,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    color: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 28,
    color: 'white',
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    color: theme.colors.gray100,
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
});

export default MiniSignInScreen;
