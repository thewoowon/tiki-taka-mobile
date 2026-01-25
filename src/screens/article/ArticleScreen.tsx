import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import PrimaryButton from '@components/atoms/buttons/PrimaryButton';
import { useQuery } from '@tanstack/react-query';
import customAxios from '@axios/customAxios';
import { ArticleCard } from '@components/modules';
import ArticleDynamicView from '@components/modules/ArticleDynamicView';
// import Header from '@components/layout/Header';

// <Header onPress={() => navigation.goBack()} title="메인화면" />

const ArticleScreen = ({ navigation, route }: any) => {
  const [startNumber, setStartNumber] = useState(0);
  const [offsetNumber, setOffsetNumber] = useState(10);
  // /article/getAllArticleList
  // startNumber, offsetNumber
  // const { data: interviewData, refetch } = useQuery({
  //   queryKey: ['articles'],
  //   queryFn: async () => {
  //     const response = await customAxios.get(`/article/getAllArticleList`, {
  //       params: {
  //         startNumber,
  //         offsetNumber,
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error('프로필 정보를 가져오는 데 실패했습니다.');
  //     }

  //     console.log('response: ', response.data.data);

  //     return response.data.data as ArticleType[];
  //   },
  // });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#6a51ae"
        translucent={false}
      />
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <View
          style={{
            position: 'relative',
            width: '100%',
            height: 210,
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 30,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <View>
                <Text style={styles.titleText}>
                  기회는 주어지는 것이 아니라,
                </Text>
                <Text style={styles.titleText}>만들어내는 것</Text>
              </View>
              <View>
                <Text style={styles.descriptionText}>
                  지금 구독하고 누구보다 빠르게
                </Text>
                <Text style={styles.descriptionText}>취업에 성공하세요!</Text>
              </View>
            </View>
          </View>
          <Image
            source={require('@assets/images/article-banner-short.png')}
            alt="thumbnail"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View
          style={[
            styles.flexColumnBox,
            {
              gap: 16,
            },
          ]}
        >
          {interviewData?.map(article => (
            <ArticleCard article={article} />
          ))}
        </View>
      </ScrollView> */}
      <ArticleDynamicView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundStyle: {
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
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Pretendard-Bold',
    color: 'white',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-Medium',
    color: 'white',
  },
});

export default ArticleScreen;
