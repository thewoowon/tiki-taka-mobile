module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: `.env.${process.env.NODE_ENV || 'development'}`,
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'], // 루트 기준 폴더
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@storage': './src/storage',
          '@axios': './src/axios',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
