import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import * as Icons from '../../Icons';

export type IconName = keyof typeof Icons;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  text?: string;
  width?: number;
  height?: number;
}

const Icon = ({
  name,
  size = 44,
  color,
  style,
  onPress,
  text,
  width,
  height,
}: IconProps) => {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const icon = (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      color={color}
      text={text}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        {icon}
      </TouchableOpacity>
    );
  }

  return icon;
};

export default Icon;
