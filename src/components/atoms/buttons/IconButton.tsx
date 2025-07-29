// 아이콘 시스템은 아직입니다..
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Icon, { IconName } from '../icon/Icon';

type Props = {
  iconName: string;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
};

const IconButton: React.FC<Props> = ({
  iconName,
  onPress,
  size = 24,
  color,
  style,
  disabled = false,
}) => {
  const { colors, spacing } = useTheme();
  const iconColor = disabled ? colors.tikiDarkGreen : color || colors.tikiGreen;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          padding: spacing.sm,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Icon name={iconName as IconName} color={iconColor} />
    </Pressable>
  );
};

export default IconButton;
