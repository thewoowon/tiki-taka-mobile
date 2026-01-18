import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '@components/layout/Header';
import { theme } from '@contexts/theme';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { SimulationQ, SimulationR } from '@components/modules';
import { DownloadIcon } from '@components/Icons';

const QUESTIONS_LIST: Array<string> = [
  '카카오페이를 선택한 동기와 흥미로운 경험에 대해 어떤 것이 있나요?',
  '카카오페이가 추구하는 가치 중에서 가장 중요하게 생각하는 것은 무엇인가요?',
  '디지털 금융 분야에서의 최근 트렌드와 그에 따른 도전에 대한 여러분의 시각은 무엇인가요?',
  '카카오페이의 경쟁사와 차별화된 전략에 대해 어떻게 생각하시나요?',
  '금융 서비스 개발 프로세스에서의 여러 경험과 성과에 대해 소개해주세요.',
  '카카오페이에서의 팀 프로젝트 경험 중 가장 도전적이었던 부분은?',
  '금융 서비스 개발 프로세스에서의 여러 경험과 성과에 대해 소개해주세요.',
  '카카오페이에서의 팀 프로젝트 경험 중 가장 도전적이었던 부분은?',
  '금융 서비스 개발 프로세스에서의 여러 경험과 성과에 대해 소개해주세요.',
  '카카오페이에서의 팀 프로젝트 경험 중 가장 도전적이었던 부분은?',
  '금융 서비스 개발 프로세스에서의 여러 경험과 성과에 대해 소개해주세요.',
  '카카오페이에서의 팀 프로젝트 경험 중 가장 도전적이었던 부분은?',
  '금융 서비스 개발 프로세스에서의 여러 경험과 성과에 대해 소개해주세요.',
  '카카오페이에서의 팀 프로젝트 경험 중 가장 도전적이었던 부분은?',
];

const InterviewQuestionDisplayScreen = ({ navigation, route }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reIsLoading, setReIsLoading] = useState(false);
  const [interviewQuestionsList, setInterviewQuestionsList] =
    useState<Array<string>>(QUESTIONS_LIST);

  const { colors } = useTheme();

  const goNext = () => {
    // 면접 시작 버튼 클릭
    navigation.navigate('InterviewChatScreen');
  };

  const regenerateQuestions = () => {
    setReIsLoading(true);

    setTimeout(() => {
      setReIsLoading(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#6a51ae"
          translucent={false}
        />
        <Header
          onPress={() => navigation.goBack()}
          title="질문 생성 중.."
          rightButton={<DownloadIcon />}
        />
        <ScrollView
          key="isloading-scroll"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={[
              styles.flexColumnBox,
              {
                alignItems: 'center',
                position: 'relative',
              },
            ]}
          >
            <View
              style={{
                width: '100%',
                position: 'absolute',
                top: -16,
              }}
            >
              <Text style={styles.titleText}>질문을 생성하고 있어요</Text>
              <Text
                style={[
                  styles.subtitleText,
                  {
                    marginBottom: 30,
                  },
                ]}
              >
                잠시만 기다려주세요.
              </Text>
            </View>
            <SimulationQ />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (reIsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#6a51ae"
          translucent={false}
        />
        <Header
          onPress={() => navigation.goBack()}
          title="질문 생성 중.."
          rightButton={<DownloadIcon />}
        />
        <ScrollView
          key="reloading-scroll"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <View
            style={[
              styles.flexColumnBox,
              {
                alignItems: 'center',
                position: 'relative',
              },
            ]}
          >
            <View
              style={{
                width: '100%',
                position: 'absolute',
                top: -60,
              }}
            >
              <Text
                style={[
                  styles.titleText,
                  {
                    marginBottom: 6,
                  },
                ]}
              >
                질문을 생성하고 있어요
              </Text>
              <Text style={[styles.subtitleText]}>
                <Text style={styles.highlightText}>우원(카카오연동)</Text>
                님의 이력서와{' '}
              </Text>
              <Text
                style={[
                  styles.subtitleText,
                  {
                    marginBottom: 30,
                  },
                ]}
              >
                <Text style={styles.highlightText}>채용공고</Text>를 바탕으로
                면접질문을 다시 만들고 있어요.
              </Text>
            </View>
            <SimulationR />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <Header
        onPress={() => navigation.goBack()}
        title="생성 질문 확인"
        rightButton={<DownloadIcon />}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <View style={[styles.flexColumnBox]}>
          <Text style={styles.titleText}>
            <Text>삼성전자</Text> 면접에
          </Text>
          <Text
            style={[
              styles.titleText,
              {
                marginBottom: 6,
              },
            ]}
          >
            딱 맞는 질문을 가져왔어요
          </Text>
          <Text style={[styles.subtitleText]}>
            면접을 진행할 질문을 골라주세요.
          </Text>
          <Text
            style={[
              styles.subtitleText,
              {
                marginBottom: 30,
              },
            ]}
          >
            생성된 질문은 [히스토리]에서 확인할 수 있어요.
          </Text>
          {interviewQuestionsList.map((question, index) => (
            <View key={index} style={styles.questionBox}>
              <Text style={styles.questionText}>
                질문 {index + 1}. {question}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={[
          styles.flexRowBox,
          {
            justifyContent: 'space-between',
            padding: 20,
          },
        ]}
      >
        <PrimaryButton
          title={'질문 다시 만들기'}
          onPress={regenerateQuestions}
          style={{
            width: 155,
            backgroundColor: colors.darkBg,
          }}
        />
        <PrimaryButton
          title="면접 시작"
          onPress={goNext}
          style={{
            width: 155,
          }}
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
    textAlign: 'center',
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
  questionBox: {
    borderRadius: 5,
    backgroundColor: theme.colors.darkBg,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 10,
  },
  questionText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Regular',
  },
  highlightText: {
    color: theme.colors.tikiGreen,
  },
});

export default InterviewQuestionDisplayScreen;
