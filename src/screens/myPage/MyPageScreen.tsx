import {
  AppleIcon,
  CoinIcon,
  DetailIcon,
  KakaoIcon,
  NaverIcon,
  RightChevronIcon,
} from '@components/Icons';
import { useTheme } from '@contexts/ThemeContext';
import useAuth from '@hooks/useAuth';
import { confirm } from '@utils/confirm';
import React, { useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { logout } from '@services/auth';
import { useQuery } from '@tanstack/react-query';
import customAxios from '@axios/customAxios';
import { API_PREFIX } from '@env';
import type {
  GetProfileResponse,
  NaverLoginResponse,
  GetAgreementResponse,
} from '@react-native-seoul/naver-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {
  login as kakaoLogin,
  getProfile as getKakaoProfile,
  logout as kakaoLogout,
  getAccessToken as getKakaoAccessToken,
} from '@react-native-seoul/kakao-login';
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';

const MyPageScreen = ({ navigation, route }: any) => {
  const { setIsAuthenticated } = useAuth();
  const { scale } = useTheme();

  // BottomSheet 애니메이션 값을 관리하는 shared value
  const bottomSheetTranslateY = useSharedValue(0);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // 바텀 시트의 snap 포인트 정의
  const snapPoints = useMemo(() => [300], []);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const openBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);
  const closeBottomSheet = () => bottomSheetRef.current?.close();

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  // const { data } = useQuery({
  //   queryKey: ['userProfile'],
  //   queryFn: async () => {
  //     const response = await customAxios.get(`${API_PREFIX}/user/me`);
  //     if (response.status !== 200) {
  //       throw new Error('프로필 정보를 가져오는 데 실패했습니다.');
  //     }
  //     return {
  //       nickName: response.data.data.nickName,
  //       email: response.data.data.email,
  //       providerType: response.data.data.providerType,
  //       userRole: response.data.data.userRole,
  //     };
  //   },
  // });

  // const { data: frequencyData } = useQuery({
  //   queryKey: ['userFrequency'],
  //   queryFn: async () => {
  //     const response = await customAxios.get(`${API_PREFIX}/mypage`);
  //     if (response.status !== 200) {
  //       throw new Error('프로필 정보를 가져오는 데 실패했습니다.');
  //     }

  //     return {
  //       purchaseCount: response.data.data.purchaseCount,
  //       savedKg: response.data.data.savedKg,
  //       savedPrice: response.data.data.savedPrice,
  //     };
  //   },
  // });

  // const handleLogout = async () => {
  //   const result = await confirm('로그아웃', '정말 로그아웃 하시겠어요?');
  //   if (!result) {
  //     return;
  //   }
  //   try {
  //     if (data?.providerType === 'KAKAO') {
  //       await kakaoLogout();
  //       console.log('카카오 로그아웃 성공');
  //     }

  //     if (data?.providerType === 'NAVER') {
  //       await NaverLogin.logout();
  //       console.log('네이버 로그아웃 성공');
  //     }
  //     await logout();
  //     console.log('로그아웃 성공');
  //     setIsAuthenticated(false);
  //   } catch (error) {
  //     console.error('로그아웃 실패:', error);
  //     Alert.alert('로그아웃 실패', '다시 시도해주세요.');
  //     return;
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <SafeAreaView style={styles.backgroundStyle}>
        <View>
          <Text>여기는 마이페이지입니다.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundStyle: {
    flex: 1,
  },
  flexBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  carbohydrateText: {
    color: '#5DB664',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
    lineHeight: 24,
    marginTop: 14,
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 28,
    marginTop: 2,
  },
  emailText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 20,
    marginTop: 4,
  },
  carbohydrateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
  },
  carbohydrateBoxText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 20,
  },
  carbohydrateBoxValueText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 24,
  },
  coinBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
    backgroundColor: '#FFF0D1',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  coinText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
  },
  coinNumber: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 24,
  },
  listBox: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    color: '#212121',
  },
  underText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 20,
  },
});

export default MyPageScreen;
