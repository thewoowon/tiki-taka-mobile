import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import loadingAnim from '@assets/lottie/loading.json';

const Simulation01 = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <SkeletonPlaceholder backgroundColor="#2D2D2D">
          <SkeletonPlaceholder.Item
            width="100%"
            height={107}
            borderRadius={10}
          />
        </SkeletonPlaceholder>
      )}
      <LottieView
        source={loadingAnim}
        autoPlay
        loop
        style={[styles.lottie, { opacity: loading ? 0 : 1 }]}
        onLayout={() => setLoading(false)}
      />
    </View>
  );
};

export default Simulation01;

const styles = StyleSheet.create({
  container: {
    width: 353,
    borderRadius: 10,
    overflow: 'hidden',
  },
  lottie: {
    width: '100%',
    height: 107,
  },
});
