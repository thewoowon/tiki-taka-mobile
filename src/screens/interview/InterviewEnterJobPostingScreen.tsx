import React, { useState } from 'react';
import {
  Alert,
  Image,
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
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '@components/layout/Header';
import { theme } from '@contexts/theme';
import { ImageIcon, JobPostingIcon } from '@components/Icons';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const InterviewEnterJobPostingScreen = ({ navigation, route }: any) => {
  const [inputMethod, setInputMethod] = useState<'text' | 'image' | null>(null);
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [text, setText] = useState<string>('');
  const { colors } = useTheme();

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert(
        '오류',
        result.errorMessage || '이미지를 선택할 수 없습니다.',
      );
      return;
    }

    const asset = result.assets?.[0];
    if (!asset) return;

    // 파일 크기 체크 (10MB)
    if (asset.fileSize && asset.fileSize > MAX_FILE_SIZE_BYTES) {
      Alert.alert(
        '파일 크기 초과',
        `이미지 크기는 ${MAX_FILE_SIZE_MB}MB 이하여야 합니다.`,
      );
      return;
    }

    setSelectedImage(asset);
  };

  const goNext = () => {
    // 다음 버튼 클릭
    if (inputMethod === 'image' && selectedImage) {
      navigation.navigate('InterviewQuestionDisplayScreen');
    }

    if (inputMethod === 'text' && text.length > 0) {
      navigation.navigate('InterviewQuestionDisplayScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      <Header onPress={() => navigation.goBack()} title="채용 공고 입력" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          }}
        >
        {inputMethod === null && (
          <View style={[styles.flexColumnBox]}>
            <Text style={styles.titleText}>
              어떤 회사의 직무에 지원하시나요?
            </Text>
            <Text
              style={[
                styles.subtitleText,
                {
                  marginBottom: 30,
                },
              ]}
            >
              텍스트나 이미지 형태의 채용 공고를 넣을 수 있어요.
            </Text>

            <Pressable
              style={[styles.flexRowBox, styles.button]}
              onPress={() => setInputMethod('text')}
              android_ripple={{ color: colors.gray200 }}
            >
              <JobPostingIcon />
              <Text style={[styles.resumeText]} numberOfLines={1}>
                텍스트로 붙여넣기
              </Text>
            </Pressable>
            <Pressable
              style={[styles.flexRowBox, styles.button]}
              onPress={() => setInputMethod('image')}
              android_ripple={{ color: colors.gray200 }}
            >
              <ImageIcon />
              <Text style={[styles.resumeText]} numberOfLines={1}>
                이미지로 붙여넣기
              </Text>
            </Pressable>
          </View>
        )}

        {inputMethod === 'text' && (
          <View style={[styles.flexColumnBox]}>
            <Text style={styles.titleText}>채용공고 내용을 입력해주세요</Text>
            <Text style={styles.subtitleText}>
              회사명, 팀, 직무, 주요업무, 자격요건, 우대사항
            </Text>
            <Text
              style={[
                styles.subtitleText,
                {
                  marginBottom: 30,
                },
              ]}
            >
              6가지 내용 중 입력 가능한 내용을 입력해주세요.
            </Text>
            {/* 텍스트 입력 컴포넌트 추가 예정 */}
            <View
              style={[
                styles.multilineInputBox,
                {
                  borderColor:
                    text.length > 0
                      ? theme.colors.tikiGreen
                      : theme.colors.gray400,
                },
              ]}
            >
              <TextInput
                value={text}
                onChangeText={setText}
                style={styles.multilineInput}
                multiline
                placeholder="채용공고를 텍스트로 붙여넣기 해주세요.
              (최대 1,500자)"
                placeholderTextColor={colors.gray400}
              />
              <Text style={styles.multilineInputIndicator}>
                {`(현재 ${text.length}자 / 총 1,500자)`}
              </Text>
            </View>
          </View>
        )}

        {inputMethod === 'image' && (
          <View style={[styles.flexColumnBox]}>
            <Text style={styles.titleText}>
              채용공고를 캡처하여 업로드해주세요
            </Text>
            <Text
              style={[
                styles.subtitleText,
                {
                  marginBottom: 30,
                },
              ]}
            >
              본인이 해당하는 직무부분만 캡처하여 넣어 주세요.
            </Text>

            {selectedImage ? (
              <Pressable
                onPress={handlePickImage}
                style={styles.imagePreviewContainer}
              >
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.imagePreview}
                  resizeMode="contain"
                />
                <Text style={styles.changeImageText}>탭하여 이미지 변경</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.flexRowBox, styles.uploadBox]}
                onPress={handlePickImage}
                android_ripple={{ color: colors.gray200 }}
              >
                <ImageIcon />
                <Text style={styles.uploadText}>이미지 선택하기</Text>
              </Pressable>
            )}

            <Text style={styles.infoText}>
              * 이미지는 최대{' '}
              <Text style={styles.highlightText}>{MAX_FILE_SIZE_MB}MB</Text>까지
              등록하실 수 있어요
            </Text>
          </View>
        )}
        </ScrollView>
      </KeyboardAvoidingView>
      {inputMethod === null ? null : (
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
            title={`${
              inputMethod === 'image' ? '텍스트' : '이미지'
            }로 넣을래요`}
            onPress={() => {
              if (inputMethod === 'image') {
                setInputMethod('text');
              } else {
                setInputMethod('image');
              }
            }}
            style={{
              width: 155,
              backgroundColor: colors.darkBg,
            }}
          />
          <PrimaryButton
            title="다음"
            onPress={goNext}
            style={{
              width: 155,
              backgroundColor:
                inputMethod === 'image'
                  ? selectedImage
                    ? theme.colors.tikiDarkGreen
                    : theme.colors.gray400
                  : text.length > 0
                  ? theme.colors.tikiDarkGreen
                  : theme.colors.gray400,
            }}
          />
        </View>
      )}
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.tikiDarkGreen,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
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
  uploadBox: {
    backgroundColor: theme.colors.darkBg,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: theme.colors.gray400,
    borderWidth: 1,
    borderStyle: 'dashed',
    gap: 10,
  },
  uploadText: {
    color: theme.colors.gray400,
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
  },
  imagePreviewContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 8,
  },
  changeImageText: {
    color: theme.colors.gray400,
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
  },
  multilineInputBox: {
    borderColor: theme.colors.gray400,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.darkBg,
  },
  multilineInput: {
    height: 234,
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    color: 'white',
  },
  multilineInputIndicator: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 24,
    color: theme.colors.tikiGreen,
    textAlign: 'right',
  },
});

export default InterviewEnterJobPostingScreen;
