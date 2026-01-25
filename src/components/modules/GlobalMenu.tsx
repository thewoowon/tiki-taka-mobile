import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlobalMenu } from '@contexts/GlobalMenuContext';
import { theme } from '@contexts/theme';
import { TikiTakaIcon, XIcon } from '@components/Icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.75;

type MenuItem = {
  label: string;
  tab: string;
};

const MENU_ITEMS: MenuItem[] = [
  { label: 'AI 면접', tab: 'Interview' },
  { label: '아티클', tab: 'Article' },
  { label: '히스토리', tab: 'MyPage' },
  { label: '마이페이지', tab: 'MyPage' },
];

const GlobalMenu = () => {
  const { isVisible, closeMenu } = useGlobalMenu();
  const navigation = useNavigation<any>();
  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_WIDTH - MENU_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_WIDTH,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, slideAnim, fadeAnim]);

  const handleMenuPress = (tab: string) => {
    closeMenu();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs', params: { screen: tab } }],
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Pressable style={styles.overlayPressable} onPress={closeMenu} />
        </Animated.View>

        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <TikiTakaIcon />
            {/* <Text style={styles.headerTitle}>메뉴</Text> */}
            <Pressable onPress={closeMenu} style={styles.closeButton}>
              <XIcon width={16} height={16} color={theme.colors.white} />
            </Pressable>
          </View>

          <View style={styles.menuList}>
            {MENU_ITEMS.map((item, index) => (
              <Pressable
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.tab)}
                android_ripple={{ color: theme.colors.lightBg }}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              @2026 스톤즈랩. All rights reserved.
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayPressable: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: theme.colors.darkBg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightBg,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.white,
  },
  closeButton: {
    padding: 8,
  },
  menuList: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  menuItemText: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightBg,
  },
  footerText: {
    fontSize: 14,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray400,
  },
});

export default GlobalMenu;
