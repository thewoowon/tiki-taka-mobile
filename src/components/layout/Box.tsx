import {View, ViewStyle} from 'react-native';

type BoxProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const Box = ({children, style}: BoxProps) => {
  return <View style={style}>{children}</View>;
};
