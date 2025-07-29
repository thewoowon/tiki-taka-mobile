import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

const TikiTakaDeco3 = ({ width = 42, height = 42, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    <Rect x="0.5" width="42" height="42" rx="5" fill="white" />
    <Circle
      cx="21.4999"
      cy="20.9989"
      r="11.62"
      stroke="#00CE72"
      strokeWidth="7"
    />
    <Path
      d="M22.1499 24.3319C21.888 24.0045 22.1211 23.5195 22.5403 23.5195H27.4991C27.9547 23.5195 28.3857 23.7267 28.6704 24.0825L37.6501 35.3072C37.912 35.6346 37.6789 36.1195 37.2597 36.1195H32.3009C31.8453 36.1195 31.4143 35.9124 31.1296 35.5566L22.1499 24.3319Z"
      fill="#040404"
    />
  </Svg>
);

export default TikiTakaDeco3;
