import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
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
  DoubleCircleIcon,
  ExclamationMarkIcon,
  MenuIcon,
} from '@components/Icons';
import { theme } from '@contexts/theme';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { useGlobalMenu } from '@contexts/GlobalMenuContext';
import SecondaryButton from '@components/atoms/buttons/SecondaryButton';
import customAxios from '@axios/customAxios';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useInterview } from '@contexts/InterviewContext';

const InterviewSelectAResumeScreen = ({ navigation, route }: any) => {
  const { openMenu } = useGlobalMenu();
  const [resumes, setResumes] = useState<Array<DocumentPDFType>>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const { colors } = useTheme();

  const { updateInterviewForm } = useInterview();

  const [open, setOpen] = useState(false);

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
      <Header
        onPress={() => navigation.goBack()}
        title="이력서 선택"
        rightButton={<MenuIcon />}
        rightButtonAction={openMenu}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View style={[styles.flexColumnBox]}>
          <Text style={styles.titleText}>어떤 이력서로 면접을 볼까요?</Text>
          {resumeData?.map((resume, index) => (
            <Pressable
              key={index}
              style={[
                styles.flexRowBox,
                styles.resumeBox,
                {
                  borderColor:
                    selectedResumeId === resume.resumeId
                      ? theme.colors.tikiGreen
                      : theme.colors.gray400,
                },
              ]}
              onPress={() => setSelectedResumeId(resume.resumeId)}
              android_ripple={{ color: colors.gray200 }}
            >
              <Text style={styles.resumeText}>{resume.fileName}</Text>
              <DoubleCircleIcon
                color={
                  selectedResumeId === resume.resumeId
                    ? theme.colors.tikiGreen
                    : theme.colors.gray400
                }
              />
            </Pressable>
          ))}
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
          title="새 이력서 등록"
          onPress={() => navigation.navigate('InterviewUploadAResumeScreen')}
          style={{ width: 155, backgroundColor: theme.colors.darkBg }}
        />
        <PrimaryButton
          title="이력서 선택"
          onPress={() => {
            if (selectedResumeId) {
              const selectedResume = resumes.find(
                resume => resume.resumeId === selectedResumeId,
              );
              updateInterviewForm('resumeId', selectedResumeId);
              navigation.navigate('InterviewEnterJobPostingScreen');
            } else {
              setOpen(true);
            }
          }}
          style={{ width: 155 }}
        />
      </View>
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
            minWidth: 300,
            position: 'relative',
            margin: 'auto',
            padding: 20,
            gap: 20,
          }}
        >
          <View
            style={[styles.flexColumnBox, { gap: 10, alignItems: 'center' }]}
          >
            <Text style={styles.modalTitle}>이력서를 선택해주세요</Text>
            <View style={[styles.flexColumnBox, { alignItems: 'center' }]}>
              <Text style={styles.modalSubtitle}>면접진행에는</Text>
              <Text style={styles.modalSubtitle}>
                반드시 이력서가 필요해요.
              </Text>
            </View>
          </View>
          <View style={[styles.flexRowBox]}>
            <PrimaryButton
              title="확인"
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
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Regular',
    textAlign: 'center',
  },
  resumeBox: {
    backgroundColor: theme.colors.darkBg,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: theme.colors.gray400,
    borderWidth: 1,
  },
  resumeText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Pretendard-Medium',
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

export default InterviewSelectAResumeScreen;
