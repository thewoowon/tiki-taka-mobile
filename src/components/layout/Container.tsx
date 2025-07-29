import {View, ViewStyle} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';

type ContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const Container = ({children, style}: ContainerProps) => {
  const {spacing} = useTheme();
  return (
    <View style={[{paddingHorizontal: spacing.lg}, style]}>{children}</View>
  );
};
