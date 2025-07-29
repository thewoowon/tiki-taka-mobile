import React, { useState } from 'react';
import { Animated, Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

type ToggleButtonProps = {
  value: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  onToggle,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const [animValue] = useState(new Animated.Value(value ? 1 : 0));

  const toggle = () => {
    if (disabled) return;
    Animated.timing(animValue, {
      toValue: value ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onToggle(!value);
  };

  const interpolateTranslate = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 22], // 공 위 이동 범위
  });

  const interpolateBackground = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.tikiDarkGreen, colors.tikiGreen],
  });

  return (
    <Pressable onPress={toggle} disabled={disabled}>
      <Animated.View
        style={[styles.track, { backgroundColor: interpolateBackground }]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: interpolateTranslate }],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.tikiGreen,
            },
          ]}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              backgroundColor: colors.tikiGreen,
            }}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 22,
    borderRadius: 12,
    justifyContent: 'center',
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
});

export default ToggleButton;
