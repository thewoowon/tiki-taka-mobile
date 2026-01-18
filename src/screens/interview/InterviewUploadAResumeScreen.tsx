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
import DocumentPicker, {
  types,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '@components/layout/Header';
import { MenuIcon, ResumeIcon } from '@components/Icons';
import { theme } from '@contexts/theme';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const InterviewUploadAResumeScreen = ({ navigation, route }: any) => {
  const [selectedFile, setSelectedFile] =
    React.useState<DocumentPickerResponse | null>(null);
  const { colors } = useTheme();

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [types.pdf],
        copyTo: 'cachesDirectory',
      });

      const file = result[0];

      // 파일 크기 체크 (50MB)
      if (file.size && file.size > MAX_FILE_SIZE_BYTES) {
        Alert.alert(
          '파일 크기 초과',
          `파일 크기는 ${MAX_FILE_SIZE_MB}MB 이하여야 합니다.`,
        );
        return;
      }

      setSelectedFile(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // 사용자가 취소함
      } else {
        Alert.alert('오류', '파일을 선택하는 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <Header
        onPress={() => navigation.goBack()}
        title="이력서 업로드"
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
          <Text style={styles.titleText}>원하는 이력서를 등록해주세요</Text>
          <Text style={styles.subtitleText}>
            준비된 이력서를{' '}
            <Text
              style={[
                styles.highlightText,
                {
                  fontFamily: 'Pretendard-SemiBold',
                },
              ]}
            >
              PDF 5장 이하
            </Text>
            로 등록해주세요.
          </Text>

          <Pressable
            style={[
              styles.flexRowBox,
              styles.resumeBox,
              {
                borderColor: selectedFile
                  ? theme.colors.tikiGreen
                  : theme.colors.gray400,
              },
            ]}
            onPress={handlePickDocument}
            android_ripple={{ color: colors.gray200 }}
          >
            <Text
              style={[
                styles.resumeText,
                selectedFile && { color: theme.colors.tikiGreen },
              ]}
              numberOfLines={1}
            >
              {selectedFile ? selectedFile.name : '이력서 및 경력 기술서 (pdf)'}
            </Text>
            <ResumeIcon
              color={
                selectedFile ? theme.colors.tikiGreen : theme.colors.gray400
              }
            />
          </Pressable>
          <Text style={styles.infoText}>
            * 파일은 최대 <Text style={styles.highlightText}>50MB</Text>까지
            등록하실 수 있어요
          </Text>
          <Text style={styles.infoText}>
            * 이력서는 자유양식이고,{' '}
            <Text style={styles.highlightText}>한개의 파일로 통합</Text>해서
            등록해주세요.
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: 6,
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Regular',
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
  highlightText: {
    color: theme.colors.tikiGreen,
  },
  infoText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 21,
    fontFamily: 'Pretendard-Regular',
  },
});

export default InterviewUploadAResumeScreen;
