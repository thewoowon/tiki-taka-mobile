import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { theme } from '@contexts/theme';

const Tab = createBottomTabNavigator();

const CustomTabBar = (props: any) => {
  return <BottomTabBar {...props} />;
};

const MainTab = () => {
  const { isVisible } = useTabBar();
  const { scale } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: isVisible
          ? {
              backgroundColor: theme.colors.darkBg,
              height: 90,
              paddingTop: 7,
            }
          : {
              backgroundColor: theme.colors.darkBg,
              height: 0,
              display: 'none',
            },
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
      />
    </Tab.Navigator>
  );
};

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

export default MainTab;
