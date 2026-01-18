import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const DoubleCircleIcon = ({ width = 24, height = 24, color = '#00CE72' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="10.25"
      fill="#1D1D1D"
      stroke={color}
      stroke-width="1.5"
    />
    <Circle cx="12" cy="12" r="6" fill={color} />
  </Svg>
);

export default DoubleCircleIcon;
