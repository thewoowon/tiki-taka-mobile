import {
  ExclamationMarkIcon,
  TikiTakaLogoIcon,
  XIcon,
} from '@components/Icons';
import { useTheme } from '@contexts/ThemeContext';
import useAuth from '@hooks/useAuth';
import { confirm } from '@utils/confirm';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { logout } from '@services/auth';
import Animated from 'react-native-reanimated';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { theme } from '@contexts/theme';
import SecondaryButton from '@components/atoms/buttons/SecondaryButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import customAxios from '@axios/customAxios';
import { useToast } from '@contexts/ToastContext';
import { useFocusEffect } from '@react-navigation/native';

const MyPageScreen = ({ navigation, route }: any) => {
  const { setIsAuthenticated } = useAuth();
  const { scale, colors } = useTheme();
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [selectedResume, setSelectedResume] = useState<ResumeType | null>(null);

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

  const { data: resumeData, refetch } = useQuery({
    queryKey: ['second', data?.userId],
    queryFn: async () => {
      const response = await customAxios.get(`/resume/getResumeList`, {
        params: {
          userId: data?.userId,
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch my info');
      }

      return response.data.data as ResumeType[];
    },
    enabled: isSuccess,
  });

  // 기존 유저인지 아닌지 검증하는 mutation
  const { mutateAsync: deleteMutation, isPending: deleteIsPending } =
    useMutation({
      mutationFn: async (resumeId: number) => {
        await customAxios.delete(`/resume/deleteResume`, {
          data: {
            resumeId,
            userId: data?.userId,
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

  const { mutateAsync: withdrawMutation, isPending: withdrawIsPending } =
    useMutation({
      mutationFn: async () => {
        const response = await customAxios.post(`/user/deleteUser`);
        if (response.status !== 200) {
          throw new Error('회원 탈퇴에 실패했습니다.');
        }
      },
      onSuccess: async () => {
        await logout();
        setIsAuthenticated(false);
        showToast('회원 탈퇴가 완료되었습니다.', 'success');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs', params: { screen: 'MainScreen' } }],
        });
      },
      onError: error => {
        console.error('회원 탈퇴 실패:', error);
        showToast('회원 탈퇴에 실패했습니다. 다시 시도해주세요.', 'error');
      },
    });

  const deleteResume = async () => {
    if (!selectedResume) return;
    setOpen(false);

    await deleteMutation(selectedResume.resumeId);
    refetch();
  };

  const handleLogout = async () => {
    const result = await confirm('로그아웃', '정말 로그아웃 하시겠어요?');
    if (!result) {
      return;
    }
    try {
      await logout();
      console.log('로그아웃 성공');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('로그아웃 실패:', error);
      Alert.alert('로그아웃 실패', '다시 시도해주세요.');
      return;
    }
  };

  const handleWithdraw = async () => {
    const result = await confirm(
      '회원 탈퇴',
      '정말 탈퇴하시겠어요? 이 작업은 되돌릴 수 없어요.',
    );
    if (!result) {
      return;
    }

    try {
      await withdrawMutation();
    } catch (error) {
      console.error('회원 탈퇴 중 오류:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      {(deleteIsPending || withdrawIsPending) && (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onTouchStart={() => {
            // initStates();
          }}
        >
          <ActivityIndicator size="large" color={colors.tikiGreen} />
        </Animated.View>
      )}
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
              marginBottom: 50,
              gap: 30,
            },
          ]}
        >
          <Text style={styles.titleText}>내 정보</Text>
          <View
            style={[
              styles.flexColumnBox,
              {
                backgroundColor: colors.darkBg,
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 30,
                alignItems: 'center',
                gap: 20,
              },
            ]}
          >
            <View style={styles.imageBox}>
              {data?.profileImage ? (
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 52,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                  }}
                >
                  <Image
                    source={{ uri: data?.profileImage }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <TikiTakaLogoIcon width={32} height={32} />
              )}
            </View>
            <View
              style={[
                styles.flexColumnBox,
                {
                  alignItems: 'center',
                  gap: 6,
                },
              ]}
            >
              <Text style={styles.nameText}>{data?.name}</Text>
              <Text style={styles.emailText}>{data?.email}</Text>
            </View>
            <View style={styles.accountActionContainer}>
              <Pressable style={styles.buttonBox} onPress={handleLogout}>
                <Text style={styles.buttonText}>로그아웃</Text>
              </Pressable>
              <Pressable
                style={styles.deleteButtonBox}
                onPress={handleWithdraw}
              >
                <Text style={styles.deleteButtonText}>회원 탈퇴</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.flexColumnBox,
            {
              marginBottom: 50,
              gap: 30,
            },
          ]}
        >
          <View>
            <Text
              style={[
                styles.titleText,
                {
                  marginBottom: 6,
                },
              ]}
            >
              이력서 관리
            </Text>
            <Text style={styles.subtitleText}>
              이력서는 최대 3개까지 등록 할 수 있어요.
            </Text>
          </View>
          <View
            style={[
              styles.flexColumnBox,
              {
                gap: 10,
                alignItems: 'center',
              },
            ]}
          >
            {resumeData?.map(resume => {
              return (
                <View
                  key={`resume-${resume.resumeId}`}
                  style={styles.resumeBox}
                >
                  <Text style={styles.resumeText}>{resume.fileName}</Text>
                  <Pressable
                    onPress={() => {
                      setSelectedResume(resume);
                      setOpen(true);
                    }}
                  >
                    <XIcon color={colors.gray100} />
                  </Pressable>
                </View>
              );
            })}
            {(!resumeData || resumeData.length === 0) && (
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
                    아직 등록된 이력서가 없어요.
                  </Text>
                  <Text style={styles.subtitleText}>
                    면접을 위해 이력서를 등록해주세요.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <PrimaryButton
        title="새 이력서 등록"
        onPress={() =>
          navigation.navigate('FullScreens', {
            screen: 'MyPageUploadAResumeScreen',
          })
        }
        style={{ marginBottom: 20, marginHorizontal: 20 }}
      />
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
            minWidth: 300,
            margin: 'auto',
            padding: 20,
            gap: 20,
          }}
        >
          <View
            style={[styles.flexColumnBox, { gap: 6, alignItems: 'center' }]}
          >
            <Text style={styles.modalTitle}>{selectedResume?.fileName}</Text>
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
              onPress={deleteResume}
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
  emailText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    lineHeight: 20,
    color: 'white',
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
  buttonText: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    color: 'white',
  },
  accountActionContainer: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteButtonBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.colors.errorRed,
  },
  deleteButtonText: {
    fontSize: 13,
    fontFamily: 'Pretendard-Medium',
    color: theme.colors.errorRed,
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

export default MyPageScreen;
