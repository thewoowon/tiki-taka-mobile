import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import LottieView from 'lottie-react-native';
import Simulation01 from '@components/modules/Simulation01';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
// import Header from '@components/layout/Header';

// <Header onPress={() => navigation.goBack()} title="메인화면" />

const InterviewScreen = ({ navigation, route }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View
          style={
            (styles.flexRowBox,
            { justifyContent: 'center', alignItems: 'center' })
          }
        >
          <Simulation01 />
        </View>
        <View
          style={[
            styles.flexColumnBox,
            {
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            },
          ]}
        >
          <Text style={styles.titleText}>면접을 시작할까요?</Text>
          <Text style={styles.subtitleText}>
            면접은 중간에 그만 둘 수 있어요.
          </Text>
          <Text style={styles.subtitleText}>부담 없이 시작해 보세요.</Text>
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <PrimaryButton
          title="면접 시작하기"
          style={{ marginTop: 40 }}
          onPress={() =>
            navigation.navigate('FullScreens', {
              screen: 'InterviewSelectAResumeScreen',
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    color: '#181818',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
  flexRowBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumnBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 28,
    fontFamily: 'Pretendard-Bold',
    marginBottom: 6,
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Regular',
  },
});

export default InterviewScreen;
