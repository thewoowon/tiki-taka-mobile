import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Icon, { IconName } from '@components/atoms/icon/Icon';
import { theme } from '@contexts/theme';

type Props = {
  name: keyof typeof IconStyle;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

const IconStyle = {
  KAKAO: {
    text: '카카오',
    backgroundColor: '#FAE200',
    textColor: '#000',
    borderColor: '#FAE200',
    iconName: 'KakaoIcon',
  },
  NAVER: {
    text: '네이버',
    backgroundColor: '#03C75A',
    textColor: '#fff',
    borderColor: '#03C75A',
    iconName: 'NaverIcon',
  },
  GOOGLE: {
    text: '구글',
    backgroundColor: '#fff',
    textColor: '#000',
    borderColor: theme.scale.gray.gray7,
    iconName: 'GoogleIcon',
  },
  APPLE: {
    text: '애플',
    backgroundColor: '#000',
    textColor: '#fff',
    borderColor: '#000',
    iconName: 'AppleIcon',
  },
};

const SocialLoginButton: React.FC<Props> = ({
  name,
  onPress,
  style,
  disabled = false,
}) => {
  const { colors, fontFamily } = useTheme();
  const iconColor = disabled ? colors.tikiDarkGreen : IconStyle[name].textColor;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        style,
        {
          backgroundColor: IconStyle[name].backgroundColor,
          borderColor: IconStyle[name].borderColor,
          borderWidth: IconStyle[name].borderColor ? 1 : 0,
        },
      ]}
    >
      <Icon
        name={IconStyle[name].iconName as IconName}
        color={iconColor}
        size={30}
      />
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          marginLeft: -30,
          fontFamily: fontFamily.bold,
          fontSize: 16,
          color: IconStyle[name].textColor,
        }}
      >
        {IconStyle[name].text}로 로그인하기
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 48,
    fontSize: 16,
  },
});

export default SocialLoginButton;
