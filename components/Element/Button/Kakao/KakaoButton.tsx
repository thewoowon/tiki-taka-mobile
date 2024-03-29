import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

type kakaoParamType = {
  client_id?: string;
  redirect_uri: string;
  response_type: string;
};

const KakaoButton = () => {
  const [locationOrigin, setLocationOrigin] = useState('');
  const kakaoParam: kakaoParamType | URLSearchParams | Record<string, string> =
    {
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: `${locationOrigin}/auth/kakao/callback`,
      response_type: 'code',
    };
  const kakaoCodeURL = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
    kakaoParam,
  ).toString()}`;

  useEffect(() => {
    if (window && window.location.origin)
      setLocationOrigin(window.location.origin);
  }, []);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Linking.openURL(kakaoCodeURL);
      }}>
      <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
        <Rect x="0.5" width="24" height="24" fill="#FAE100" />
        <Path
          d="M12.5 5C7.52927 5 3.5 7.88881 3.5 11.4544C3.5 13.7743 5.20619 15.8076 7.76888 16.9453C7.58025 17.5819 7.08742 19.2545 6.98886 19.6121C6.8665 20.0561 7.1673 20.0499 7.36613 19.9312C7.52077 19.8372 9.83195 18.4112 10.8295 17.7962C11.3716 17.8686 11.929 17.9072 12.5 17.9072C17.4707 17.9072 21.5 15.0184 21.5 11.4544C21.5 7.89036 17.4707 5 12.5 5Z"
          fill="#191600"
        />
      </Svg>
      카카오로 시작하기
    </TouchableOpacity>
  );
};

export default KakaoButton;

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    width: 300,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 5,
    backgroundColor: '#ffeb00',
  },
});
