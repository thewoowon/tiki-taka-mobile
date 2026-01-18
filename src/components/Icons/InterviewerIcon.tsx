import React from 'react';
import Svg, { Rect, Ellipse, Circle } from 'react-native-svg';

const InterviewerIcon = ({ width = 24, height = 24, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Rect width="24" height="24" rx="5" fill="#00CE72" />
    <Ellipse cx="6.0002" cy="8.7" rx="4.8" ry="2.7" fill="#040404" />
    <Ellipse cx="18.0002" cy="8.7" rx="4.8" ry="2.7" fill="#040404" />
    <Rect x="8.7002" y="8.10156" width="8.4" height="1.2" fill="#040404" />
    <Circle cx="12" cy="14.6992" r="1.5" fill="#040404" />
  </Svg>
);

export default InterviewerIcon;
