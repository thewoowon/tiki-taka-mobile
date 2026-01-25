declare module '@env' {
  export const API_URL: string;
  export const API_PREFIX: string;
  export const IOS_GOOGLE_CLIENT_ID: string;
  export const IOS_GOOGLE_REDIRECT_URI: string;
  export const ANDROID_GOOGLE_CLIENT_ID: string;
  export const ANDROID_GOOGLE_REDIRECT_URI: string;
}

declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

type ProviderType = 'KAKAO' | 'NAVER' | 'APPLE' | 'GOOGLE';

type BaseType = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
};

type Chat = {
  role: 'user' | 'assistant' | 'error';
  content: string;
};

type News = {
  id: number;
  title: string;
  content: string;
  journalist: string;
  src: string;
  press: string;
  date: string;
  url: string;
  summary: string;
};

type SideMessageType = {
  leftMessage?: React.ReactNode | null;
  rightMessage?: React.ReactNode | null;
};

type HistoryElementType = {
  interviewId: number;
  userId: number;
  title: string;
  totalCnt: number;
  useCnt: number;
  status: number;
  regDate: string;
};

type QuestionElementType = {
  interviewId: number;
  qaId: number;
  question: string;
  answer: string;
  regDate: string;
  modifyDate: string;
};

type QuestionType = {
  role: 'user' | 'interviewer' | 'ai';
  interviewId: number;
  qaId: number;
  question: string;
  answer: string;
  regDate: string;
  modifyDate: string;
};

type DocumentPDFType = {
  resumeId: number;
  fileName: string;
  regDate: string;
};

type ResultType = {
  interviewId: number;
  interviewerFeel: string;
  userId: number;
  title: string;
  status: number;
  regDate: string;
  qaData: {
    answer: string;
    bestAnswer: string;
    interviewId: number;
    keyword: string[];
    modifyDate: string;
    qaId: number;
    question: string;
    regDate: string;
  }[];
};

type QuestionsResponseType = {
  interviewId: number;
  userId: number;
  totalCnt: number;
  useCnt: number;
  lastQaId: number;
  qaData: {
    interviewId: number;
    qaId: number;
    question: string;
    answer: string;
    regDate: string;
    modifyDate: string;
  }[];
};

type instantPopUpType = {
  stop: boolean;
  date: string;
};

type ArticleType = {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  published: string;
  guid: string;
  companyName: string;
  createdAt: string;
};

type UserType = {
  userId: number;
  name: string;
  email: string;
  regDate: string;
  modifyDate: string;
  thumbnailImage: string;
  profileImage: string;
};

type ResumeType = {
  resumeId: number;
  fileName: string;
  regDate: string;
  content: string;
};
