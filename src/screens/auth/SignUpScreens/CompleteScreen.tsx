import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { useTheme } from '@contexts/ThemeContext';
import useAuth from '@hooks/useAuth';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';

const CompleteScreen = ({ navigation, route }: any) => {
  const { setIsAuthenticated } = useAuth();
  const { colors } = useTheme();
  const handleNext = () => {
    setIsAuthenticated(true);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.tikiGreen,
        },
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <SafeAreaView style={styles.backgroundStyle}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.headerText}>영화앤미에 오신것을</Text>
            <Text style={styles.headerText}>환영합니다.</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            width: '100%',
          }}
        >
          <PrimaryButton
            title="영화앤미 시작하기"
            onPress={handleNext}
            style={{
              backgroundColor: '#FFFFFF',
            }}
            textStyle={{
              color: colors.tikiGreen,
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundStyle: {
    flex: 1,
  },
  header: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    maxHeight: 50,
    borderBottomWidth: 1,
    borderColor: '#F2F4F6',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default CompleteScreen;
