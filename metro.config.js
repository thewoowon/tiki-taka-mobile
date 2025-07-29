const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname);

// 빈 config를 wrapWithReanimated로 래핑
const reanimatedConfig = wrapWithReanimatedMetroConfig({});

// 그 다음 Storybook으로 또 래핑
const finalConfig = mergeConfig(baseConfig, reanimatedConfig);

module.exports = finalConfig;
