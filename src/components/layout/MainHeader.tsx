import { LeftArrowIcon, TikiTakaIcon } from '@components/Icons';
import { theme } from '@contexts/theme';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

type HeaderProps = {
  onPress?: () => void;
  rightButton?: React.ReactNode;
  rightButtonAction?: () => void;
  logoButton?: boolean;
  logoButtonAction?: () => void;
  style?: ViewStyle;
};

const MainHeader = ({
  onPress,
  rightButton,
  rightButtonAction,
  logoButton = true,
  logoButtonAction,
  style,
}: HeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {/* 상단 헤더 */}
      {logoButton && (
        <Pressable>
          <TikiTakaIcon />
        </Pressable>
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {rightButton && (
          <Pressable onPress={rightButtonAction}>{rightButton}</Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 56,
    zIndex: 1,
    backgroundColor: theme.colors.darkBg,
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#181818',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default MainHeader;
