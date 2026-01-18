import React from 'react';
import {
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { colors, borderRadius, fontSize } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? '#E5E5E5' : colors.tikiDarkGreen,
          borderRadius: borderRadius.sm,
        },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[{ fontSize: fontSize.md }, styles.buttonText, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  fullWidth: {
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 24,
  },
  disabled: {
    backgroundColor: '#FFDF9F',
  },
});

export default PrimaryButton;
