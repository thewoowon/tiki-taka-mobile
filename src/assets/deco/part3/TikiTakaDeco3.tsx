import React from 'react';
import Svg, { Ellipse, Rect, Circle } from 'react-native-svg';

const TikiTakaDeco3 = ({ width = 42, height = 42, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    <Rect width="42" height="42" rx="5" fill="#00CE72" />
    <Ellipse cx="10.4996" cy="15.225" rx="8.4" ry="4.725" fill="#040404" />
    <Ellipse cx="31.5001" cy="15.225" rx="8.4" ry="4.725" fill="#040404" />
    <Rect x="15.2251" y="14.1758" width="14.7" height="2.1" fill="#040404" />
    <Circle cx="21" cy="25.7266" r="2.625" fill="#040404" />
  </Svg>
);

export default TikiTakaDeco3;
