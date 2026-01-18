import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import rLoadingAnim from '@assets/lottie/r-loading.json';

const SimulationR = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <SkeletonPlaceholder backgroundColor="#2D2D2D">
          <SkeletonPlaceholder.Item
            width="100%"
            height={150}
            borderRadius={10}
          />
        </SkeletonPlaceholder>
      )}
      <LottieView
        source={rLoadingAnim}
        autoPlay
        loop
        resizeMode="cover"
        style={[styles.lottie, { opacity: loading ? 0 : 1 }]}
        onLayout={() => setLoading(false)}
      />
    </View>
  );
};

export default SimulationR;

const styles = StyleSheet.create({
  container: {
    width: 323,
  },
  lottie: {
    width: '100%',
    height: 150,
  },
});
