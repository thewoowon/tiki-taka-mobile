import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { theme } from '@contexts/theme';
import MainHeader from '@components/layout/MainHeader';
import { MenuIcon } from '@components/Icons';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import { Deco1Icon, Deco2Icon, Deco3Icon } from '@components/Icons';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import {
  TikiTakaDeco1 as TikiTakaDeco1Part1,
  TikiTakaDeco2 as TikiTakaDeco2Part1,
  TikiTakaDeco3 as TikiTakaDeco3Part1,
} from '@assets/deco/part1';
import {
  TikiTakaDeco1 as TikiTakaDeco1Part2,
  TikiTakaDeco2 as TikiTakaDeco2Part2,
  TikiTakaDeco3 as TikiTakaDeco3Part2,
} from '@assets/deco/part2';
import {
  TikiTakaDeco1 as TikiTakaDeco1Part3,
  TikiTakaDeco2 as TikiTakaDeco2Part3,
  TikiTakaDeco3 as TikiTakaDeco3Part3,
} from '@assets/deco/part3';

const { width, height } = Dimensions.get('window');

const VideoBackground = () => {
  return (
    <Video
      source={require('@assets/videos/m-background.mp4')} // 또는 { uri: 'https://example.com/video.mp4' }
      style={styles.backgroundVideo}
      muted
      repeat
      resizeMode="cover"
      rate={1.0}
      ignoreSilentSwitch="obey"
    />
  );
};

type DecoCarouselItem = {
  part: 'part1' | 'part2' | 'part3';
  title: string;
  description1: string;
  description2: string;
};

type DecoCarouselProps = {
  decos: DecoCarouselItem[];
};

const DECO_DATA: DecoCarouselItem[] = [
  {
    part: 'part1',
    title: '면접 준비가 끝나는 시간 단 1분',
    description1: '이력서와 채용 공고만 넣으면 준비 끝!',
    description2: '나머지는 티키타카에게 맡기세요',
  },
  {
    part: 'part2',
    title: '환상의 면접 케미를 위한 맞춤형 질문',
    description1: '직무 경험, 지원하는 회사, 직무 정보로',
    description2: '면접 적중 예상 질문을 제공해요',
  },
  {
    part: 'part3',
    title: 'AI가 알려주는 면접관의 속마음',
    description1: '면접이 끝나면 면접관의 속마음과',
    description2: '면접관을 사로잡을 답변을 알려줘요',
  },
];

const DecoCarousel = ({ decos }: DecoCarouselProps) => {
  const progress = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <Carousel
      width={width}
      height={148}
      data={decos}
      onProgressChange={(_, absoluteProgress) => {
        setCurrentIndex(Math.round(absoluteProgress));
      }}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: 148,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {item.part === 'part1' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <TikiTakaDeco1Part1 />
              <TikiTakaDeco2Part1 />
              <TikiTakaDeco3Part1 />
            </View>
          ) : item.part === 'part2' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <TikiTakaDeco1Part1 />
              <TikiTakaDeco2Part1 />
              <TikiTakaDeco3Part1 />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <TikiTakaDeco1Part3 />
              <TikiTakaDeco2Part3 />
              <TikiTakaDeco3Part3 />
            </View>
          )}
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 20,
                  fontFamily: 'Pretendard-Bold',
                  lineHeight: 28,
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: theme.colors.gray100,
                  fontSize: 16,
                  fontFamily: 'Pretendard-Regular',
                  lineHeight: 24,
                  textAlign: 'center',
                }}
              >
                {item.description1}
              </Text>
              <Text
                style={{
                  color: theme.colors.gray100,
                  fontSize: 16,
                  fontFamily: 'Pretendard-Regular',
                  lineHeight: 24,
                  textAlign: 'center',
                }}
              >
                {item.description2}
              </Text>
            </View>
          </View>
        </View>
      )}
      loop
      autoPlay
      autoPlayInterval={5000}
      pagingEnabled
      enabled
      snapEnabled
    />
  );
};

const MainScreen = ({ navigation, route }: any) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.darkBg}
        translucent={false}
      />
      <SafeAreaView style={styles.backgroundStyle}>
        {/* 상단 헤더 */}
        <MainHeader onPress={() => navigation.goBack()} rightButton={null} />
        <View>
          <VideoBackground />
        </View>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              flex: 1,
              paddingTop: 50,
              paddingBottom: 20,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 50,
            }}
          >
            <LinearGradient
              start={{ x: 0.5, y: 1 }} // 중앙 상단
              end={{ x: 1, y: 0.5 }} // 중앙 하단
              locations={[0.3, 1]} // 시작과 끝 색상의 위치
              colors={['#121212', '#2B2B2B']} // 시작과 끝 색상
              style={styles.ball}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.ballText}>면접부터 합격까지</Text>
                <Text style={styles.ballText}>AI 면접 코칭, 티키타카</Text>
                <View style={styles.ballDecoration1}>
                  <Deco1Icon />
                </View>
                <View style={styles.ballDecoration2}>
                  <Deco2Icon />
                </View>
                <View style={styles.ballDecoration3}>
                  <Deco3Icon />
                </View>
              </View>
            </LinearGradient>
            <View>
              <DecoCarousel decos={DECO_DATA} />
            </View>
          </View>
        </ScrollView>
        <PrimaryButton
          title="티키타카 하러가기"
          onPress={() =>
            navigation.navigate('Interview', {
              screen: 'InterviewScreen',
            })
          }
          style={{ marginBottom: 20, marginHorizontal: 20 }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkBg,
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
    color: '#181818',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },
  scrollView: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: theme.colors.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 36,
  },
  ballDecoration1: {
    position: 'absolute',
    top: -7,
    left: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballDecoration2: {
    position: 'absolute',
    top: -25,
    right: -9,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballDecoration3: {
    position: 'absolute',
    bottom: -28,
    right: 14,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
