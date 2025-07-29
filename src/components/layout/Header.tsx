import { LeftArrowIcon } from '@components/Icons';
import { theme } from '@contexts/theme';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

type HeaderProps = {
  onPress?: () => void;
  title?: string;
  isBack?: boolean;
  rightButton?: React.ReactNode;
  rightButtonAction?: () => void;
  style?: ViewStyle;
};

const Header = ({
  onPress,
  title,
  isBack = true,
  rightButton,
  rightButtonAction,
  style,
}: HeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {/* 상단 헤더 */}
      {isBack && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            left: 16,
          }}
        >
          <Pressable onPress={onPress}>
            <LeftArrowIcon />
          </Pressable>
        </View>
      )}
      <Text style={styles.headerText}>{title}</Text>
      {/* 오른쪽 공간을 차지하기 위한 빈 View */}
      <View
        style={{
          position: 'absolute',
          right: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    maxHeight: 56,
    zIndex: 1,
    backgroundColor: theme.colors.darkBg,
  },
  headerText: {
    color: '#181818',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default Header;
