import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStack } from '../screens/main';
import { ArticleStack } from '../screens/article';
import { InterviewStack } from '../screens/interview';
import { MyPageStack } from '../screens/myPage';
import { useTabBar } from '../contexts/TabBarContext';
import {
  HomeIcon,
  HeartIcon,
  MarkerIcon,
  MyPageIcon,
  OrderIcon,
  HeartSolidIcon,
  TikiTakaLogoIcon,
} from '../components/Icons';
import { Alert, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { theme } from '@contexts/theme';
import {
  InterviewEnterJobPostingScreen,
  InterviewSelectAResumeScreen,
  InterviewQuestionDisplayScreen,
  InterviewChatScreen,
  InterviewResultScreen,
  InterviewUploadAResumeScreen,
} from '../screens/interview';
import useAuth from '@hooks/useAuth';
import { useUser } from '@contexts/UserContext';
import { logout } from '@services/auth';

export type RootStackParamList = {
  Tabs: undefined;
  FullScreens: undefined;
};

export type TabsParamList = {
  Main: undefined;
  Interview: undefined;
  Article: undefined;
  MyPage: undefined;
};

export type FullScreenStackParamList = {
  InterviewEnterJobPostingScreen: undefined;
  InterviewSelectAResumeScreen: undefined;
  InterviewQuestionDisplayScreen: undefined;
  InterviewChatScreen: undefined;
  InterviewResultScreen: undefined;
  InterviewUploadAResumeScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabsParamList>();
const FullStack = createStackNavigator<FullScreenStackParamList>();

const Tab = createBottomTabNavigator();

const CustomTabBar = (props: any) => {
  return <BottomTabBar {...props} />;
};

// 탭바를 숨길 자식 스크린들의 이름(스택 안의 screen name)
const HIDE_TABBAR_ON: Record<string, true> = {
  InterviewEnterJobPostingScreen: true,
  InterviewSelectAResumeScreen: true,
  InterviewQuestionDisplayScreen: true,
  InterviewChatScreen: true,
  InterviewResultScreen: true,
  InterviewUploadAResumeScreen: true,
};

const VISIBLE_TABBAR = {
  height: 90,
  paddingTop: 7,
  backgroundColor: theme.colors.darkBg,
} as const;

const HIDDEN_TABBAR = {
  display: 'none',
  height: 0,
  borderTopWidth: 0,
  elevation: 0,
  backgroundColor: 'transparent',
} as const;

const MainTab = () => {
  const { scale } = useTheme();
  const { user } = useUser();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: VISIBLE_TABBAR,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Pretendard-Regular',
          color: '#8E979E',
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainStack}
        options={{
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <HomeIcon
              color={focused ? theme.colors.tikiGreen : theme.colors.gray100}
            />
          ),
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused
                    ? theme.colors.tikiGreen
                    : theme.colors.gray100,
                },
              ]}
            >
              메인
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Interview"
        component={InterviewStack}
        options={{
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <TikiTakaLogoIcon
              color={focused ? theme.colors.tikiGreen : theme.colors.gray100}
            />
          ),
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused
                    ? theme.colors.tikiGreen
                    : theme.colors.gray100,
                },
              ]}
            >
              인터뷰
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Article"
        component={ArticleStack}
        options={{
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <OrderIcon
              color={focused ? theme.colors.tikiGreen : theme.colors.gray100}
            />
          ),
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused
                    ? theme.colors.tikiGreen
                    : theme.colors.gray100,
                },
              ]}
            >
              아티클
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          headerShown: false,
          tabBarIcon: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <MyPageIcon
              color={focused ? theme.colors.tikiGreen : theme.colors.gray100}
            />
          ),
          tabBarLabel: ({
            focused,
            color,
          }: {
            focused: boolean;
            color: string;
          }) => (
            <Text
              style={[
                styles.tabBarItemTextStyle,
                {
                  color: focused
                    ? theme.colors.tikiGreen
                    : theme.colors.gray100,
                },
              ]}
            >
              MY
            </Text>
          ),
        }}
        listeners={({ navigation }: { navigation: any; route: any }) => ({
          tabPress: (e: any) => {
            if (!isAuthenticated || !user?.email) {
              e.preventDefault(); // 탭 이동 막기
              Alert.alert(
                '로그인이 필요합니다(임시)',
                '마이페이지는 로그인 후 이용할 수 있어요.',
                [
                  { text: '취소', style: 'cancel' },
                  {
                    text: '로그인 하기',
                    onPress: async () => {
                      // 로그인 페이지
                    },
                  },
                ],
              );
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

function FullScreenStack() {
  return (
    <FullStack.Navigator screenOptions={{ headerShown: false }}>
      <FullStack.Screen
        name="InterviewEnterJobPostingScreen"
        component={InterviewEnterJobPostingScreen}
      />
      <FullStack.Screen
        name="InterviewSelectAResumeScreen"
        component={InterviewSelectAResumeScreen}
      />
      <FullStack.Screen
        name="InterviewQuestionDisplayScreen"
        component={InterviewQuestionDisplayScreen}
      />
      <FullStack.Screen
        name="InterviewChatScreen"
        component={InterviewChatScreen}
      />
      <FullStack.Screen
        name="InterviewResultScreen"
        component={InterviewResultScreen}
      />
      <FullStack.Screen
        name="InterviewUploadAResumeScreen"
        component={InterviewUploadAResumeScreen}
      />
    </FullStack.Navigator>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Tabs" component={MainTab} />
      <RootStack.Screen name="FullScreens" component={FullScreenStack} />
    </RootStack.Navigator>
  );
}

export default RootNavigator;

const styles = StyleSheet.create({
  tabBarItemTextStyle: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  visibleTabBar: {
    height: 90,
    paddingTop: 7,
  },
  hiddenTabBar: {
    height: 0,
    overflow: 'hidden',
    display: 'none',
  },
});
