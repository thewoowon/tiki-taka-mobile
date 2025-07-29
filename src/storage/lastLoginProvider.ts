import AsyncStorage from '@react-native-async-storage/async-storage';

export const LAST_LOGIN_PROVIDER_KEY = 'lastLoginProvider';

export const setLastLoginProvider = async (
  provider: ProviderType,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(LAST_LOGIN_PROVIDER_KEY, provider);
  } catch (error) {
    console.error('마지막 로그인 방법을 저장하는데 실패했어요:', error);
  }
};

export const getLastLoginProvider = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(LAST_LOGIN_PROVIDER_KEY);
  } catch (error) {
    console.error('마지막 로그인 방법을 가져 오는데 실패했어요:', error);
    return null;
  }
};

export const clearLastLoginProvider = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LAST_LOGIN_PROVIDER_KEY);
  } catch (error) {
    console.error('마지막 로그인 방법 삭제하는데 실패했어요:', error);
  }
};
