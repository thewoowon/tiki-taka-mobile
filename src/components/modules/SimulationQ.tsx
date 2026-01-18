import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import qLoadingAnim from '@assets/lottie/q-loading.json';

const SimulationQ = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <SkeletonPlaceholder backgroundColor="#2D2D2D">
          <SkeletonPlaceholder.Item width="100%" height={282} />
        </SkeletonPlaceholder>
      )}
      <LottieView
        source={qLoadingAnim}
        autoPlay
        loop
        resizeMode="cover"
        style={[styles.lottie, { opacity: loading ? 0 : 1 }]}
        onLayout={() => setLoading(false)}
      />
    </View>
  );
};

export default SimulationQ;

const styles = StyleSheet.create({
  container: {
    width: 320,
  },
  lottie: {
    width: '100%',
    height: 282,
  },
});
