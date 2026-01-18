import './gesture-handler.native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme, NativeModules } from 'react-native';
import { RootNavigator } from '@navigation/index';
import {
  AuthProvider,
  ThemeProvider,
  TabBarProvider,
  theme,
} from '@contexts/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PermissionProvider } from '@contexts/PermissionContext';
import { ToastProvider } from '@contexts/ToastContext';
import { ModalProvider, useModal } from '@contexts/ModalContext';
import { AlertModal } from '@components/modules';
import { useGoogleAuth } from '@thewoowon/google-rn';
import { UserProvider } from '@contexts/UserContext';

// Google OAuth 설정
const { GoogleAuthModule } = NativeModules;
import {
  IOS_GOOGLE_CLIENT_ID,
  ANDROID_GOOGLE_CLIENT_ID,
  IOS_GOOGLE_REDIRECT_URI,
  ANDROID_GOOGLE_REDIRECT_URI,
} from '@env';

import { Platform } from 'react-native';

const clientId = Platform.select({
  ios: IOS_GOOGLE_CLIENT_ID,
  android: ANDROID_GOOGLE_CLIENT_ID,
  default: '',
});

const redirectUri = Platform.select({
  ios: IOS_GOOGLE_REDIRECT_URI,
  android: ANDROID_GOOGLE_REDIRECT_URI,
  default: '',
});

const GOOGLE_CLIENT_ID = clientId!;
const GOOGLE_REDIRECT_URI = redirectUri!;

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const result = useGoogleAuth();
  const { user, loading, signIn, signOut, isAuthenticated, getAccessToken } =
    useGoogleAuth();

  useEffect(() => {
    // Google OAuth 설정 (앱 시작시 한번만)
    GoogleAuthModule.configure({
      clientId: GOOGLE_CLIENT_ID,
      redirectUri: GOOGLE_REDIRECT_URI,
      scopes: ['openid', 'profile', 'email'],
    }).catch((error: Error) => {
      console.error('[App] Google Auth configuration failed:', error);
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            primary: '#FF6B6B',
            background: theme.colors.lightBg,
            card: '#FFFFFF',
            text: '#000000',
            notification: '#FF6B6B',
          },
          fonts: {
            regular: {
              fontFamily: 'Pretendard-Regular',
              fontWeight: 'normal',
            },
            medium: {
              fontFamily: 'Pretendard-Medium',
              fontWeight: 'normal',
            },
            bold: {
              fontFamily: 'Pretendard-Bold',
              fontWeight: 'normal',
            },
            heavy: {
              fontFamily: 'Pretendard-ExtraBold',
              fontWeight: 'normal',
            },
          },
        }}
      >
        <UserProvider>
          <RootNavigator />
        </UserProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default function RootApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider>
            <TabBarProvider>
              <PermissionProvider>
                <ModalProvider>
                  <App />
                  <GlobalModalRenderer />
                </ModalProvider>
              </PermissionProvider>
            </TabBarProvider>
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

// GlobalModalRenderer.tsx
const GlobalModalRenderer = () => {
  const { isVisible, message, onConfirm, hideModal } = useModal();

  if (!isVisible) return null;

  return (
    <AlertModal
      visible={isVisible}
      message={message}
      onConfirm={() => {
        onConfirm?.();
        hideModal();
      }}
    />
  );
};
