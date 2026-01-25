import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import DocumentPicker, {
  types,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '@components/layout/Header';
import { MenuIcon, ResumeIcon } from '@components/Icons';
import { theme } from '@contexts/theme';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { useGlobalMenu } from '@contexts/GlobalMenuContext';
import SecondaryButton from '@components/atoms/buttons/SecondaryButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import customAxios from '@axios/customAxios';
import { useToast } from '@contexts/ToastContext';
import { useUser } from '@contexts/UserContext';

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const MyPageUploadAResumeScreen = ({ navigation, route }: any) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);
  const { colors } = useTheme();
  const { showToast } = useToast();
  const { user } = useUser();

  const { openMenu } = useGlobalMenu();

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

  const { mutate, isPending } = useMutation({
    mutationFn: (file: DocumentPickerResponse) => {
      const formData = new FormData();
      formData.append('file', {
        uri: file.fileCopyUri || file.uri,
        type: file.type || 'application/pdf',
        name: file.name || 'resume.pdf',
      } as any);
      formData.append('userId', data?.userId);
      return customAxios
        .post('/resume/uploadResume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => res.data);
    },
    onSuccess: data => {
      if (data.code === '200') {
        showToast('이력서 업로드에 성공했어요.', 'success');
        navigation.goBack();
      } else {
        showToast(data.message, 'error');
      }
    },
    onError: error => {
      console.error(error);
      showToast('이력서 업로드에 실패했어요. 다시 시도해 주세요.', 'error');
    },
  });

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

      // 여기서 파일 개수도 확인해야 하나..?
      if (resumeData && resumeData.length === 3) {
        setOpen(true);
        return;
      }

      setSelectedFile(file);
      mutate(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // 사용자가 취소함
      } else {
        Alert.alert('오류', '파일을 선택하는 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  };

  const goMyPage = () => {
    navigation.goBack();
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
        rightButtonAction={openMenu}
      />
      {isPending && (
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
          <View>
            <Text style={[styles.subtitleText, { marginBottom: 0 }]}>
              이력서를 등록하고 있어요
            </Text>
            <Text style={[styles.subtitleText]}>조금만 기다려주세요</Text>
          </View>
          <ActivityIndicator size="large" color={colors.tikiGreen} />
        </Animated.View>
      )}
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
            style={[styles.flexColumnBox, { gap: 10, alignItems: 'center' }]}
          >
            <Text style={styles.modalTitle}>
              이력서는 최대 3개까지 저장 가능해요
            </Text>
            <View style={[styles.flexColumnBox, { alignItems: 'center' }]}>
              <Text style={styles.modalSubtitle}>이력서를 삭제하고</Text>
              <Text style={styles.modalSubtitle}>
                새로운 이력서를 등록하시겠어요?
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
              onPress={goMyPage}
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

export default MyPageUploadAResumeScreen;
