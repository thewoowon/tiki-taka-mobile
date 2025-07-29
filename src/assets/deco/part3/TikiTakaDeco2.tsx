import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const TikiTakaDeco2 = ({ width = 42, height = 42, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    <Rect width="42" height="42" rx="5" fill="white" />
    <Rect
      x="6.72021"
      y="18.2109"
      width="20.8812"
      height="5.36945"
      fill="#040404"
    />
    <Rect
      x="23.0459"
      y="8.66406"
      width="17.3015"
      height="5.36945"
      transform="rotate(45 23.0459 8.66406)"
      fill="#00CE72"
    />
    <Rect
      x="19.2485"
      y="29.3359"
      width="17.3015"
      height="5.36945"
      transform="rotate(-45 19.2485 29.3359)"
      fill="#00CE72"
    />
  </Svg>
);

export default TikiTakaDeco2;
