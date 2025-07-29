// components/atoms/SecondaryButton.tsx
import React from 'react';
import { Text, Pressable, ViewStyle, TextStyle, View } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

type Props = {
  icon?: React.ReactNode;
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
};

const SecondaryButton: React.FC<Props> = ({
  icon,
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { colors, spacing, borderRadius, fontSize } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: 'transparent',
          borderColor: disabled ? colors.tikiDarkGreen : colors.tikiGreen,
          borderWidth: 1,
          borderRadius: borderRadius.md,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: fullWidth ? '100%' : undefined,
          height: 50,
          gap: spacing.xs,
        },
        style,
      ]}
    >
      {icon && icon}
      <Text
        style={[
          {
            color: disabled ? colors.tikiDarkGreen : colors.tikiGreen,
            fontSize: fontSize.md,
            fontWeight: 'bold',
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default SecondaryButton;
