import {SafeAreaView, ViewStyle} from 'react-native';

type SafeAreaWrapperProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const SafeAreaWrapper = ({children, style}: SafeAreaWrapperProps) => {
  return <SafeAreaView style={[{flex: 1}, style]}>{children}</SafeAreaView>;
};
