declare module '@env' {
  export const API_URL: string;
  export const API_PREFIX: string;
  export const NAVER_CONSUMER_ID: string;
  export const NAVER_CONSUMER_SECRET: string;
  export const NAVER_APP_NAME: string;
  export const SERVICE_URL_SCHEME: string;
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
