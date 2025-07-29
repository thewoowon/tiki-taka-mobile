import './gesture-handler.native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
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

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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
        <RootNavigator />
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
