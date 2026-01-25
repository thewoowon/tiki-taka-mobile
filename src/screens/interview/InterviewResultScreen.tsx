import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '@components/layout/Header';
import {
  InterviewerIcon,
  MenuIcon,
  TikiTakaIcon,
  TipIcon,
  XIcon,
} from '@components/Icons';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useSharedValue } from 'react-native-reanimated';
import { SimulationR } from '@components/modules';
import { theme } from '@contexts/theme';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { useInterview } from '@contexts/InterviewContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import customAxios from '@axios/customAxios';
import { useGlobalMenu } from '@contexts/GlobalMenuContext';
import { useToast } from '@contexts/ToastContext';
import { generatePDF } from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { Platform } from 'react-native';

const InterviewResultScreen = ({ navigation, route }: any) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  // BottomSheet 애니메이션 값을 관리하는 shared value
  const bottomSheetTranslateY = useSharedValue(0);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // 바텀 시트의 snap 포인트 정의
  const snapPoints = useMemo(() => [325], []);

  const openBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);
  const closeBottomSheet = () => bottomSheetRef.current?.close();

  const { colors } = useTheme();

  const { interviewForm } = useInterview();

  const { openMenu } = useGlobalMenu();
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

  const { data: interview, refetch } = useQuery({
    queryKey: ['interview', data?.userId, interviewForm.interviewId],
    queryFn: async () => {
      const response = await customAxios.get('/interview/getInterview', {
        params: {
          userId: data?.userId,
          interviewId: interviewForm.interviewId,
        },
      });

      if (response.status !== 200) {
        throw new Error('면접 결과를 가져오는 데 실패했습니다.');
      }
      return response.data.data as ResultType;
    },
    enabled: isSuccess,
  });

  // /interview/generateFeedback
  const { mutateAsync: generateResult, isPending: generateIsPending } =
    useMutation({
      mutationFn: async () => {
        await customAxios.post(`/interview/generateFeedback`, {
          data: {
            userId: data?.userId,
            interviewId: interviewForm.interviewId,
          },
        });
      },
      onSuccess: () => {
        console.log('질문 재생성 성공!');
      },
      onError: () => {
        console.log('질문 재생성 실패!');
      },
    });

  const generateResultHTML = (result: ResultType): string => {
    const qaItems = result.qaData
      .map(
        (qa, index) => `
        <div class="qa-section">
          <div class="question-header">
            <span class="question-tag">질문 ${index + 1}</span>
            <span class="question-text">${qa.question}</span>
          </div>
          <div class="keyword-box">
            <span class="keyword">${qa.keyword}</span>
          </div>
          <div class="answer-box">
            <div class="answer-label">내 답변</div>
            <p>${qa.answer}</p>
          </div>
          <div class="coaching-box">
            <div class="coaching-label">TikiTaka 답변 코칭</div>
            <p>${qa.bestAnswer}</p>
          </div>
        </div>
      `,
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
            padding: 40px;
            background-color: #1a1a1a;
            color: white;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #3D9A5D;
          }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
          .subtitle { font-size: 14px; color: #888; }
          .highlight { color: #3D9A5D; font-weight: bold; }
          .interviewer-section {
            background-color: #2a2a2a;
            border: 1px solid #3D9A5D;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
          }
          .interviewer-label {
            color: #3D9A5D;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .qa-section { margin-bottom: 24px; }
          .question-header {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 10px;
          }
          .question-tag {
            background-color: #3D9A5D;
            color: black;
            padding: 4px 8px;
            border-radius: 100px;
            font-size: 13px;
            font-weight: 500;
            white-space: nowrap;
          }
          .question-text { font-weight: 600; line-height: 1.5; }
          .keyword-box { margin-bottom: 10px; }
          .keyword {
            background-color: #2a2a2a;
            color: #3D9A5D;
            padding: 6px 12px;
            border-radius: 5px;
            font-size: 14px;
          }
          .answer-box {
            background-color: #2a2a2a;
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 10px;
          }
          .answer-label {
            font-weight: 600;
            margin-bottom: 8px;
            color: #888;
          }
          .coaching-box {
            background-color: #2a2a2a;
            border: 1px solid #3D9A5D;
            border-radius: 8px;
            padding: 16px 20px;
          }
          .coaching-label {
            color: #3D9A5D;
            font-weight: 600;
            margin-bottom: 8px;
          }
          p { font-size: 14px; line-height: 1.6; }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">
            <span class="highlight">${interviewForm.title}</span> 면접 결과
          </div>
          <div class="subtitle">TikiTaka AI 면접 피드백 리포트</div>
        </div>

        <div class="interviewer-section">
          <div class="interviewer-label">면접관의 속마음</div>
          <p>${result.interviewerFeel}</p>
        </div>

        ${qaItems}

        <div class="footer">
          Generated by TikiTaka - ${new Date().toLocaleDateString('ko-KR')}
        </div>
      </body>
      </html>
    `;
  };

  const downloadMutation = useMutation({
    mutationFn: async () => {
      if (!interview) {
        throw new Error('면접 결과가 없습니다.');
      }

      const html = generateResultHTML(interview);
      const pdfFileName = `tikitaka_${interviewForm.title}_면접결과_${Date.now()}`;

      const file = await generatePDF({
        html,
        fileName: pdfFileName,
        directory: Platform.OS === 'ios' ? 'Documents' : 'Download',
      });

      if (!file.filePath) {
        throw new Error('PDF 생성에 실패했습니다.');
      }

      return file.filePath;
    },
    onSuccess: async (filePath: string) => {
      try {
        await Share.open({
          url: Platform.OS === 'ios' ? filePath : `file://${filePath}`,
          type: 'application/pdf',
          title: `${interviewForm.title} 면접 결과`,
        });
        showToast('내보내기에 성공했어요.', 'success');
      } catch (error: any) {
        if (error?.message !== 'User did not share') {
          showToast('공유에 실패했어요.', 'error');
        }
      }
    },
    onError: () => {
      showToast('내보내기에 실패했어요. 다시 시도해 주세요.', 'error');
    },
  });

  if (generateIsPending) {
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
            <Text style={styles.highlightText}>{interviewForm.title}</Text> 면접
            결과
          </Text>
        }
        rightButton={<TipIcon />}
        rightButtonAction={() => {
          openBottomSheet();
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text style={[styles.titleText]}>
            <Text style={styles.highlightText}>우원</Text>님, 수고하셨어요.
          </Text>
          <Text
            style={[
              styles.titleText,
              {
                marginBottom: 6,
              },
            ]}
          >
            합격까지 한걸음 가까워졌네요!
          </Text>
          <Text style={[styles.subtitleText]}>
            티키타카가 면접 결과를 저장했어요.
          </Text>
          <Text
            style={[
              styles.subtitleText,
              {
                marginBottom: 30,
              },
            ]}
          >
            히스토리에서 언제든지 확인 가능해요.
          </Text>
        </View>
        <View
          style={[
            styles.flexColumnBox,
            {
              gap: 16,
              marginBottom: 30,
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
                  color: 'white',
                  fontFamily: 'Pretendard-SemiBold',
                },
              ]}
            >
              면접관의 속마음
            </Text>
          </View>
          <View style={styles.aiChatBox}>
            <Text style={[styles.chatBotText]}>
              {interview?.interviewerFeel}
            </Text>
          </View>
        </View>
        <View
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
                marginBottom: 10,
              },
            ]}
          >
            <TikiTakaIcon width={98} />
            <Text
              style={[
                styles.chatBotText,
                {
                  fontFamily: 'Pretendard-SemiBold',
                },
              ]}
            >
              피드백
            </Text>
          </View>
          {interview?.qaData.map((data, index) => {
            return (
              <View
                style={[
                  styles.flexColumnBox,
                  {
                    gap: 10,
                    marginBottom: 20,
                  },
                ]}
              >
                <View
                  style={[
                    styles.flexRowBox,
                    {
                      alignItems: 'flex-start',
                      gap: 10,
                      marginBottom: 6,
                      justifyContent: 'flex-start',
                    },
                  ]}
                >
                  <View style={[styles.tag]}>
                    <Text style={styles.tagText}>{`질문 ${index + 1}`}</Text>
                  </View>
                  <Text
                    style={[
                      styles.chatBotText,
                      {
                        flex: 1,
                        flexShrink: 1,
                        color: 'white',
                        fontFamily: 'Pretendard-SemiBold',
                      },
                    ]}
                  >
                    {data.question}
                  </Text>
                </View>
                <View
                  style={[
                    styles.flexRowBox,
                    {
                      alignItems: 'center',
                      gap: 10,
                    },
                  ]}
                >
                  <View style={styles.keyword}>
                    <Text style={styles.keywordText}>{data.keyword}</Text>
                  </View>
                </View>
                <View style={[styles.aiChatBox, { borderWidth: 0 }]}>
                  <Text style={[styles.chatBotText]}>{data.answer}</Text>
                </View>
                <View
                  style={[
                    styles.aiChatBox,
                    {
                      gap: 4,
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
                    <TikiTakaIcon width={78} />
                    <Text
                      style={[
                        styles.chatBotText,
                        {
                          fontFamily: 'Pretendard-SemiBold',
                        },
                      ]}
                    >
                      답변 코칭
                    </Text>
                  </View>
                  <Text style={[styles.chatBotText]}>{data.bestAnswer}</Text>
                </View>
              </View>
            );
          })}
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
          title="결과 재생성"
          onPress={async () => {
            await generateResult();
            refetch();
          }}
          style={{ width: 155, backgroundColor: theme.colors.darkBg }}
        />
        <PrimaryButton
          title="내보내기"
          onPress={() => downloadMutation.mutate()}
          disabled={downloadMutation.isPending}
          style={{ width: 155 }}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        containerStyle={{
          zIndex: 3,
        }}
        backgroundStyle={{
          backgroundColor: colors.lightBg,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.tikiDarkGreen,
          width: 60,
        }}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        onAnimate={(fromIndex, toIndex) => {
          if (toIndex === 0) {
            setCurrentIndex(0);
            bottomSheetTranslateY.value = -snapPoints[toIndex] + 10;
          } else {
            setCurrentIndex(-1);
            bottomSheetTranslateY.value = 0;
          }
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            paddingHorizontal: 32,
            paddingTop: 8,
            paddingBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 20,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Pretendard-Bold',
                lineHeight: 28,
              }}
            >
              Tip!
            </Text>
            {/* <Pressable onPress={() => closeBottomSheet()}>
              <XIcon width={14} height={14} color={colors.tikiGreen} />
            </Pressable> */}
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Pretendard-Regular',
                lineHeight: 20,
              }}
            >
              결과 일부가 생성되지 않았거나, 생성된 결과가 만족스럽지 않으면
              오른쪽의{' '}
              <Text
                style={{
                  color: colors.tikiGreen,
                  fontFamily: 'Pretendard-SemiBold',
                }}
              >
                결과 재생성
              </Text>{' '}
              버튼을 클릭하세요
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <SimulationR />
          </View>
        </BottomSheetView>
      </BottomSheet>
      {/* dim 처리 */}
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 2,
          // bottomSheetRef가 열리면 dim 처리
          display: currentIndex === 0 ? 'flex' : 'none',
        }}
        onTouchStart={() => {
          setCurrentIndex(-1);
          bottomSheetTranslateY.value = 0;
          bottomSheetRef.current?.close();
        }}
      />
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
  highlightText: {
    color: theme.colors.tikiGreen,
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
  flexRowBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumnBox: {
    display: 'flex',
    flexDirection: 'column',
  },

  aiChatBox: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: theme.colors.darkBg,
    borderWidth: 1,
    borderColor: theme.colors.tikiGreen,
    paddingVertical: 16,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  chatBotText: {
    color: theme.colors.gray100,
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
  },
  tag: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.tikiDarkGreen,
  },
  tagText: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
  },
  keyword: {
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: theme.colors.darkBg,
  },
  keywordText: {
    color: theme.colors.tikiGreen,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Pretendard-Regular',
  },
});

export default InterviewResultScreen;
