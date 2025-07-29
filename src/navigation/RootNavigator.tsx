import React, { useEffect } from 'react';
import AuthStack from './AuthStack'; // 인증 스택
import MainTab from './MainTab'; // 메인 스택
import { useAuth } from '@hooks/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// App.tsx 또는 Root.tsx 등 진입점

import { useModal } from '@contexts/ModalContext';
import { setAuthFailureHandler } from '@axios/customAxios';

const RootNavigator = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // AuthContext에서 상태 가져오기
  const modal = useModal(); // 모달 컨텍스트 사용

  type NavigationProp = NativeStackNavigationProp<{
    Main: { screen: 'MainScreen' };
  }>;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main', params: { screen: 'MainScreen' } }],
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setAuthFailureHandler(() => {
      modal.showModal('세션이 만료되었습니다. 다시 로그인해주세요.', () => {
        setIsAuthenticated(false);
      });
    });
  }, []);

  return isAuthenticated ? <MainTab /> : <AuthStack />;
};

export default RootNavigator;
