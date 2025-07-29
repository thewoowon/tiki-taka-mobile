module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
  },
  'react/self-closing-comp': [
    'error',
    {
      component: true,
      html: true,
      svg: true,
      math: true,
    },
  ],
};
