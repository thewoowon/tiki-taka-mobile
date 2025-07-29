import React from 'react';
import Svg, { Rect, Ellipse, Circle } from 'react-native-svg';

const TikiTakaDeco1 = ({ width = 42, height = 42, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    <Rect width="42" height="42" rx="5" fill="#00CE72" />
    <Ellipse
      cx="20.7665"
      cy="28.8084"
      rx="3.96667"
      ry="5.28889"
      fill="#040404"
    />
    <Circle cx="12.6" cy="15.9584" r="7.56" fill="white" />
    <Circle cx="29.3998" cy="15.9584" r="7.56" fill="white" />
    <Circle cx="12.6001" cy="15.9619" r="5.04" fill="#040404" />
    <Circle cx="29.3999" cy="15.9619" r="5.04" fill="#040404" />
  </Svg>
);

export default TikiTakaDeco1;
