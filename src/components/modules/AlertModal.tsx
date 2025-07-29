import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import {useTheme} from '@contexts/ThemeContext';
import {View, Modal, StyleSheet, Text, Animated} from 'react-native';

type AlertModalProps = {
  visible: boolean;
  message?: string;
  onConfirm?: () => void;
};

const AlertModal = ({visible, message, onConfirm}: AlertModalProps) => {
  const {scale, borderRadius} = useTheme();
  return (
    <View>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 2,
          display: visible ? 'flex' : 'none',
        }}
      />
      <Modal visible={visible} transparent animationType="fade">
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: borderRadius.md,
            position: 'relative',
            height: 173,
            width: 300,
            margin: 'auto',
            borderColor: scale.gray.gray7,
            borderWidth: 1,
          }}>
          <View
            style={[
              styles.flexColumnBox,
              {
                gap: 4,
                alignItems: 'center',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
              },
            ]}>
            <Text
              style={{
                fontFamily: 'Pretendard-Bold',
                fontSize: 20,
                lineHeight: 30,
                letterSpacing: -1,
              }}>
              로그인이 필요해요!
            </Text>
            <Text
              style={{
                fontFamily: 'Pretendard-Regular',
                fontSize: 14,
                lineHeight: 22,
                letterSpacing: -0.5,
                color: scale.gray.gray4,
              }}>
              서비스 이용을 위해 로그인을 해주세요.
            </Text>
          </View>
          <View
            style={{
              padding: 20,
            }}>
            <PrimaryButton
              title="확인"
              onPress={() => {
                onConfirm?.();
              }}
              style={{
                width: '100%',
              }}
              textStyle={{
                color: '#000000',
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundStyle: {
    flex: 1,
  },
  flexRowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexColumnBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
