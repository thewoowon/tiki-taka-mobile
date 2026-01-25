import { useTheme } from '@contexts/ThemeContext';
import useAuth from '@hooks/useAuth';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { theme } from '@contexts/theme';
import SecondaryButton from '@components/atoms/buttons/SecondaryButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import customAxios from '@axios/customAxios';
import { useUser } from '@contexts/UserContext';
import { ExclamationMarkIcon } from '@components/Icons';

const HistoryScreen = ({ navigation, route }: any) => {
  const { scale, colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [continueOpen, setContinueOpen] = useState(false);
  const { user } = useUser();
  const [selectedInterview, setSelectedInterview] =
    useState<HistoryElementType | null>(null);

  const deleteResume = () => {
    setOpen(true);
  };

  const continueInterview = (history: HistoryElementType) => {
    setSelectedInterview(history);
    setContinueOpen(true);
  };

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

  const { data: interviewData, refetch } = useQuery({
    queryKey: [data?.userId, 'interviews'],
    queryFn: async () => {
      const response = await customAxios.get(`/interview/getInterviewList`, {
        params: {
          userId: data?.userId,
        },
      });

      if (response.status !== 200) {
        throw new Error('프로필 정보를 가져오는 데 실패했습니다.');
      }

      console.log('response: ', response.data.data);

      return response.data.data as HistoryElementType[];
    },
    enabled: isSuccess,
  });

  // 기존 유저인지 아닌지 검증하는 mutation
  const { mutateAsync: deleteMutation, isPending: deleteIsPending } =
    useMutation({
      mutationFn: async (interviewId: number) => {
        await customAxios.delete(`/interview/deleteInterview`, {
          data: {
            userId: data?.userId,
            interviewId,
          },
        });
      },
      onSuccess: () => {
        console.log('이력서 삭제 성공!');
      },
      onError: () => {
        console.log('이력서 삭제 실패!');
      },
    });

  const deleteInterview = async () => {
    if (!selectedInterview) return;
    setOpen(false);

    await deleteMutation(selectedInterview.interviewId);
    refetch();
  };

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
          padding: 20,
        }}
      >
        <View
          style={[
            styles.flexColumnBox,
            {
              gap: 30,
            },
          ]}
        >
          <Text style={styles.titleText}>면접 히스토리</Text>
          <View
            style={[
              styles.flexColumnBox,
              {
                gap: 10,
              },
            ]}
          >
            {interviewData?.map((history, index) => {
              return (
                <View
                  key={`history_${index}`}
                  style={[
                    styles.flexColumnBox,
                    {
                      backgroundColor: colors.darkBg,
                      borderRadius: 10,
                      padding: 20,
                      gap: 10,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.flexColumnBox,
                      {
                        width: '100%',
                        gap: 6,
                      },
                    ]}
                  >
                    <Text style={styles.nameText}>{history.title}</Text>
                    <Text
                      style={styles.rateText}
                    >{`${history.useCnt} / ${history.totalCnt}`}</Text>
                  </View>
                  <Text style={styles.dateText}>
                    마지막 진행일 : {history.regDate.split('T')[0]}
                  </Text>
                  <View
                    style={[
                      styles.flexRowBox,
                      {
                        width: '100%',
                        gap: 10,
                        justifyContent: 'flex-end',
                        marginTop: 6,
                      },
                    ]}
                  >
                    <Pressable
                      style={styles.buttonBox}
                      onPress={deleteInterview}
                    >
                      <Text style={styles.buttonText}>삭제하기</Text>
                    </Pressable>
                    <Pressable
                      style={styles.buttonFillBox}
                      onPress={() => {
                        continueInterview(history);
                      }}
                    >
                      <Text style={styles.buttonText}>계속하기</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
            {(!interviewData || interviewData.length === 0) && (
              <View
                style={[
                  styles.flexColumnBox,
                  {
                    gap: 16,
                    alignItems: 'center',
                  },
                ]}
              >
                <ExclamationMarkIcon />
                <View>
                  <Text style={styles.subtitleText}>
                    아직 등록된 인터뷰가 없어요.
                  </Text>
                  <Text style={styles.subtitleText}>
                    등록된 이력서로 면접을 진행해주세요.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 2,
          display: open || continueOpen ? 'flex' : 'none',
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
            minWidth: 300,
            margin: 'auto',
            padding: 20,
            gap: 20,
          }}
        >
          <View
            style={[styles.flexColumnBox, { gap: 6, alignItems: 'center' }]}
          >
            <Text style={styles.modalTitle}>{selectedInterview?.title}</Text>
            <View style={[styles.flexColumnBox, { alignItems: 'center' }]}>
              <Text style={styles.modalSubtitle}>
                이력서 파일을 정말 삭제할까요?
              </Text>
            </View>
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
              title="아니오"
              onPress={() => setOpen(false)}
              style={{
                flex: 1,
              }}
            />
            <PrimaryButton
              title="네"
              onPress={() => setOpen(false)}
              style={{
                flex: 1,
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={continueOpen} transparent animationType="fade">
        <View
          style={{
            backgroundColor: colors.lightBg,
            borderRadius: 15,
            position: 'relative',
            minWidth: 300,
            margin: 'auto',
            padding: 20,
            gap: 20,
          }}
        >
          <View style={[styles.flexColumnBox, { alignItems: 'center' }]}>
            <Text style={styles.modalTitle}>{selectedInterview?.title}</Text>
            <Text
              style={[
                styles.modalTitle,
                {
                  marginBottom: 6,
                },
              ]}
            >
              면접을 이어서 진행할까요?
            </Text>
            <View style={[styles.flexColumnBox, { alignItems: 'center' }]}>
              <Text style={styles.modalSubtitle}>질문은 동일하지만,</Text>
              <Text style={styles.modalSubtitle}>
                이전에 답변한 내용은 초기화 돼요.
              </Text>
            </View>
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
              title="처음부터"
              onPress={() => setContinueOpen(false)}
              style={{
                flex: 1,
              }}
            />
            <PrimaryButton
              title="이어서 진행"
              onPress={() => setContinueOpen(false)}
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
  nameText: {
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    lineHeight: 28,
    color: 'white',
  },
  rateText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    color: 'white',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 21,
    color: theme.colors.gray400,
  },
  resumeBox: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.darkBg,
    borderRadius: 5,
  },
  resumeText: {
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
  imageBox: {
    width: 52,
    height: 52,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonFillBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: theme.colors.tikiGreen,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    color: 'white',
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
});

export default HistoryScreen;
