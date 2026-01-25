import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Modal,
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
import { InterviewerIcon, MenuIcon, SendIcon } from '@components/Icons';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import SecondaryButton from '@components/atoms/buttons/SecondaryButton';
import { SimulationR } from '@components/modules';
import { useGlobalMenu } from '@contexts/GlobalMenuContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import customAxios from '@axios/customAxios';
import { useInterview } from '@contexts/InterviewContext';
import { useToast } from '@contexts/ToastContext';

const InterviewChatScreen = ({ navigation, route }: any) => {
  const [chatStack, setChatStack] = useState<Array<QuestionType>>([]);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [inputHeight, setInputHeight] = useState(20);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastBtnCk, setLastBtnCk] = useState(0);

  const { openMenu } = useGlobalMenu();
  const { colors } = useTheme();
  const [text, setText] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);

  const { interviewForm } = useInterview();
  const { showToast } = useToast();

  const { data, isSuccess } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await customAxios.get(`/user/getUserInfo`);
      if (response.status !== 200) {
        throw new Error('프로필 정보를 가져오는 데 실패했습니다.');
      }
      return response.data.data as UserType;
    },
  });

  const { data: questions } = useQuery({
    queryKey: ['questions', data?.userId, interviewForm.interviewId],
    queryFn: async () => {
      const response = await customAxios.get('/interview/getQaList', {
        params: {
          userId: data?.userId,
          interviewId: interviewForm.interviewId,
        },
      });

      if (response.status !== 200) {
        throw new Error('질문을 가져오는 데 실패했습니다.');
      }
      return response.data.data as QuestionsResponseType;
    },
    enabled: isSuccess,
  });

  const qaList = questions?.qaData ?? [];
  const progress = ((currentQuestion + 1) / (qaList.length + 1)) * 100;

  // questions 로드 시 첫 번째 질문으로 chatStack 초기화
  useEffect(() => {
    if (qaList.length > 0 && chatStack.length === 0) {
      setChatStack([
        {
          role: 'interviewer',
          interviewId: qaList[0].interviewId,
          qaId: qaList[0].qaId,
          question: qaList[0].question,
          answer: '',
          regDate: qaList[0].regDate,
          modifyDate: qaList[0].modifyDate,
        },
      ]);
    }
  }, [qaList]);

  // /interview/insertAnswer
  const { mutate, isPending } = useMutation({
    mutationFn: (answerData: { qaId: number; answer: string }[]) => {
      return customAxios({
        method: 'POST',
        url: '/interview/insertAnswer',
        data: {
          userId: data?.userId,
          interviewId: interviewForm.interviewId,
          lastBtnCk,
          answerData,
        },
      }).then(res => res.data);
    },
    onSuccess: data => {
      if (data.code === '200') {
        showToast('답변 저장에 성공했어요.');
        navigation.navigate('InterviewResultScreen');
      } else {
        showToast(data.message, 'info');
      }
    },
    onError: error => {
      showToast('답변 저장에 실패했어요. 다시 시도해 주세요.', 'error');
    },
  });

  const sendChat = () => {
    if (text.length === 0) {
      return;
    }

    if (currentQuestion > qaList.length) {
      setOpen(true);
      setText('');
      setInputHeight(20);
      return;
    }

    // 처음 자기소개 + index max => qaList.length
    if (currentQuestion === qaList.length) {
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
      setOpen(true);
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
          qaId: qaList[currentQuestion]?.qaId ?? 0,
          question: qaList[currentQuestion]?.question ?? '',
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

  const passChat = () => {
    if (currentQuestion < qaList.length) {
      setChatStack(prev => [
        ...prev,
        {
          role: 'interviewer',
          interviewId: 0,
          qaId: qaList[currentQuestion]?.qaId ?? 0,
          question: qaList[currentQuestion]?.question ?? '',
          answer: '',
          regDate: '',
          modifyDate: '',
        },
      ]);
      setText('');
      setCurrentQuestion(prev => prev + 1);
      setInputHeight(20);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const goNext = async () => {
    const answerData = qaList.map(q => {
      const found = chatStack.find(c => c.role === 'user' && c.qaId === q.qaId);
      return { qaId: q.qaId, answer: found?.answer ?? '' };
    });
    mutate(answerData);
    setOpen(false);
  };

  if (isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#6a51ae"
          translucent={false}
        />
        <Header
          onPress={() => navigation.goBack()}
          title="결과 생성 중.."
          rightButton={<MenuIcon />}
          rightButtonAction={openMenu}
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
                결과를 생성하고 있어요
              </Text>
              <Text style={[styles.subtitleText]}>
                <Text style={styles.highlightText}>우원(카카오연동)</Text>
                님의 답변과{' '}
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
                면접결과를 만들고 있어요.
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
        title={
          <Text style={styles.headerText}>
            <Text style={styles.highlightText}>{interviewForm.title}</Text> 모의
            면접 중
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
                    {interviewForm.title} 면접관
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
                    <Pressable style={styles.nextButton} onPress={passChat}>
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
              // disabled={currentQuestion > interviewQuestionsList.length}
            >
              <SendIcon />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 2,
          display: open ? 'flex' : 'none',
        }}
        onTouchStart={() => {
          // initStates();
        }}
      />
      <Modal visible={open} transparent animationType="fade">
        <View
          style={{
            backgroundColor: colors.lightBg,
            borderRadius: 15,
            position: 'relative',
            width: 300,
            margin: 'auto',
            padding: 20,
            gap: 20,
          }}
        >
          <View
            style={[styles.flexColumnBox, { gap: 10, alignItems: 'center' }]}
          >
            <Text style={styles.modalTitle}>면접을 종료할까요?</Text>
            <Text style={styles.modalSubtitle}>
              면접내용은 히스토리에서 확인 가능해요
            </Text>
          </View>
          <View
            style={[
              styles.flexRowBox,
              {
                gap: 10,
              },
            ]}
          >
            <SecondaryButton
              title="종료"
              onPress={goNext}
              style={{
                flex: 1,
              }}
            />
            <PrimaryButton
              title="계속 진행"
              onPress={() => {
                setOpen(false);
              }}
              style={{
                flex: 1,
              }}
            />
          </View>
        </View>
      </Modal>
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
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    lineHeight: 28,
    color: 'white',
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    color: theme.colors.gray100,
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
});

export default InterviewChatScreen;
