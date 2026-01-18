import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '@components/layout/Header';
import { theme } from '@contexts/theme';
import { InterviewerIcon, SendIcon } from '@components/Icons';

const QUESTIONS_LIST: Array<string> = [
  '카카오페이를 선택한 동기와 흥미로운 경험에 대해 어떤 것이 있나요?',
  '카카오페이가 추구하는 가치 중에서 가장 중요하게 생각하는 것은 무엇인가요?',
  '디지털 금융 분야에서의 최근 트렌드와 그에 따른 도전에 대한 여러분의 시각은 무엇인가요?',
  '카카오페이의 경쟁사와 차별화된 전략에 대해 어떻게 생각하시나요?',
  '금융 서비스 개발 프로세스에서의 여러 경험과 성과에 대해 소개해주세요.',
  '카카오페이에서의 팀 프로젝트 경험 중 가장 도전적이었던 부분은?',
];

const CHAT_STACK_TEST_LIST: Array<QuestionType> = [
  {
    role: 'interviewer',
    interviewId: 0,
    qaId: 0,
    question: '안녕하세요~ 반가워요!, 먼저 자기소개 해주시겠어요?',
    answer: '',
    regDate: '',
    modifyDate: '',
  },
];

const InterviewChatScreen = ({ navigation, route }: any) => {
  const [interviewQuestionsList, setInterviewQuestionsList] =
    useState<Array<string>>(QUESTIONS_LIST);

  const [chatStack, setChatStack] =
    useState<Array<QuestionType>>(CHAT_STACK_TEST_LIST);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputHeight, setInputHeight] = useState(20);

  const progress =
    ((currentQuestion + 1) / interviewQuestionsList.length) * 100;

  const { colors } = useTheme();
  const [text, setText] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  const sendChat = () => {
    if (text.length === 0) {
      return;
    }
    // 처음 자기소개 + index max => interviewQuestionsList.length
    if (currentQuestion === interviewQuestionsList.length) {
      setChatStack(prev => [
        ...prev,
        {
          role: 'user',
          interviewId: 0,
          qaId: 0,
          question: '',
          answer: text,
          regDate: '',
          modifyDate: '',
        },
      ]);
    } else {
      setChatStack(prev => [
        ...prev,
        {
          role: 'user',
          interviewId: 0,
          qaId: 0,
          question: '',
          answer: text,
          regDate: '',
          modifyDate: '',
        },
        {
          role: 'interviewer',
          interviewId: 0,
          qaId: currentQuestion,
          question: interviewQuestionsList[currentQuestion],
          answer: '',
          regDate: '',
          modifyDate: '',
        },
      ]);
    }

    setText('');
    setCurrentQuestion(prev => prev + 1);
    setInputHeight(20);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    if (
      currentQuestion > 0 &&
      currentQuestion < interviewQuestionsList.length
    ) {
      setChatStack(prev => [
        ...prev,
        {
          role: 'interviewer',
          interviewId: 0,
          qaId: currentQuestion,
          question: interviewQuestionsList[currentQuestion],
          answer: '',
          regDate: '',
          modifyDate: '',
        },
      ]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [currentQuestion]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <Header
        onPress={() => navigation.goBack()}
        title={
          <Text style={styles.headerText}>
            <Text style={styles.highlightText}>삼성전자</Text> 모의 면접 중
          </Text>
        }
        rightButton={
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Pretendard-Medium',
              color: theme.colors.gray400,
            }}
          >
            그만하기
          </Text>
        }
        rightButtonAction={() => {
          Alert.alert(
            '면접을 종료하시겠습니까?',
            '진행 중인 내용은 저장되지 않습니다.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '그만하기',
                style: 'destructive',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [
                      { name: 'Tabs', params: { screen: 'MainScreen' } },
                    ],
                  });
                },
              },
            ],
            { cancelable: true },
          );
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={styles.gaugeContainer}>
            <View style={[styles.gaugeBar, { width: `${progress}%` }]} />
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            gap: 20,
            padding: 20,
          }}
        >
          {chatStack.map((chat, index) => {
            if (chat.role === 'user') {
              return (
                <View key={`user_${index}`} style={styles.userChatBox}>
                  <Text
                    style={[
                      styles.chatBotText,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    {chat.answer}
                  </Text>
                </View>
              );
            }
            return (
              <View
                key={`interviewer_${index}`}
                style={[
                  styles.flexColumnBox,
                  {
                    gap: 10,
                  },
                ]}
              >
                <View
                  style={[
                    styles.flexRowBox,
                    {
                      alignItems: 'center',
                      gap: 10,
                    },
                  ]}
                >
                  <InterviewerIcon />
                  <Text
                    style={[
                      styles.chatBotText,
                      {
                        fontFamily: 'Pretendard-Medium',
                      },
                    ]}
                  >
                    삼성전자 면접관
                  </Text>
                </View>
                <View style={styles.aiChatBox}>
                  <Text style={[styles.chatBotText]}>{chat.question}</Text>
                  <View
                    style={[
                      styles.flexRowBox,
                      {
                        justifyContent: 'flex-end',
                      },
                    ]}
                  >
                    <Pressable
                      style={styles.nextButton}
                      onPress={() => {
                        setCurrentQuestion(prev => prev + 1);
                      }}
                    >
                      <Text style={styles.nextButtonText}>질문 넘기기</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={{ padding: 20, gap: 6 }}>
          <Text style={styles.multilineInputIndicator}>
            {`(현재 ${text.length}자 / 총 1,500자)`}
          </Text>
          <View style={[styles.formBox, { minHeight: inputHeight + 32 }]}>
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'Pretendard-Regular',
                color: 'white',
                fontSize: 16,
                lineHeight: 20,
                includeFontPadding: false,
                textAlignVertical: 'top',
                minHeight: inputHeight,
              }}
              value={text}
              onChangeText={val => {
                setText(val);
                const lineCount = val.split('\n').length;
                const newHeight = Math.min(Math.max(lineCount * 20, 20), 120);
                setInputHeight(newHeight);
              }}
              multiline
              scrollEnabled={inputHeight >= 120}
              placeholder="면접 답변을 입력해주세요(최소 20자)"
              placeholderTextColor={'white'}
            />
            <Pressable
              onPress={sendChat}
              disabled={currentQuestion > interviewQuestionsList.length}
            >
              <SendIcon />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    color: 'white',
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
  highlightText: {
    color: theme.colors.tikiGreen,
  },
  gaugeContainer: {
    height: 10,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 100,
  },
  gaugeBar: {
    height: '100%',
    backgroundColor: theme.colors.tikiGreen,
    borderRadius: 100,
  },
  userChatBox: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: theme.colors.tikiGreen,
    padding: 16,
  },
  aiChatBox: {
    width: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: theme.colors.darkBg,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  chatBotText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
  },
  formBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.tikiGreen,
    backgroundColor: theme.colors.darkBg,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  multilineInputIndicator: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    color: theme.colors.tikiGreen,
    textAlign: 'right',
  },
  nextButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.gray400,
    paddingHorizontal: 10,
    paddingVertical: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 24,
    color: theme.colors.gray400,
  },
});

export default InterviewChatScreen;
