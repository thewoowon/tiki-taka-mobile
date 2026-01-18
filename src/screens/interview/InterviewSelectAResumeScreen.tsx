import React from 'react';
import {
  Alert,
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
import { DoubleCircleIcon, MenuIcon } from '@components/Icons';
import { theme } from '@contexts/theme';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';

const InterviewSelectAResumeScreen = ({ navigation, route }: any) => {
  const [resumes, setResumes] = React.useState<Array<DocumentPDFType>>([
    {
      resumeId: 1,
      fileName: '이력서_홍길동.pdf',
      regDate: '2024-06-01',
    },
    {
      resumeId: 2,
      fileName: '이력서_김철수.pdf',
      regDate: '2024-05-15',
    },
  ]);
  const [selectedResumeId, setSelectedResumeId] = React.useState<number | null>(
    null,
  );
  const { colors } = useTheme();
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
          {resumes.length === 0 ? (
            <Text>저장된 이력서가 없습니다.</Text>
          ) : (
            resumes.map((resume, index) => (
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
            ))
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
              navigation.navigate('InterviewEnterJobPostingScreen', {
                ...route.params,
                selectedResume,
              });
            } else {
              Alert.alert('이력서를 선택해주세요.');
            }
          }}
          style={{ width: 155 }}
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
    marginBottom: 30,
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
});

export default InterviewSelectAResumeScreen;
