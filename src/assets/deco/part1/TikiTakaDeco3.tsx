import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const TikiTakaDeco3 = ({ width = 42, height = 42, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    <Rect width="42" height="42" rx="5" fill="#00CE72" />
    <Path
      d="M21 36.9591C29.8145 36.9591 36.96 29.8135 36.96 20.9991C36.96 12.1846 29.8145 5.03906 21 5.03906C12.1856 5.03906 5.04004 12.1846 5.04004 20.9991C5.04004 29.8135 12.1856 36.9591 21 36.9591Z"
      fill="#040404"
    />
    <Path
      d="M21.0002 32.7583C27.4951 32.7583 32.7602 27.4931 32.7602 20.9983C32.7602 14.5034 27.4951 9.23828 21.0002 9.23828C14.5054 9.23828 9.24023 14.5034 9.24023 20.9983C9.24023 27.4931 14.5054 32.7583 21.0002 32.7583Z"
      fill="white"
    />
    <Rect
      x="20.1602"
      y="15.9609"
      width="1.68"
      height="5.88"
      rx="0.84"
      fill="#040404"
    />
    <Rect
      x="25.7334"
      y="23.1016"
      width="1.68"
      height="5.52555"
      rx="0.84"
      transform="rotate(122.146 25.7334 23.1016)"
      fill="#040404"
    />
    <Rect
      x="20.1602"
      y="10.9219"
      width="1.68"
      height="3.36"
      rx="0.84"
      fill="#00CE72"
    />
    <Rect
      x="19.7402"
      y="19.7383"
      width="2.52"
      height="2.52"
      rx="1.26"
      fill="#040404"
      stroke="#040404"
      strokeWidth="0.5"
    />
    <Rect
      x="20.1602"
      y="27.7188"
      width="1.68"
      height="3.36"
      rx="0.84"
      fill="#00CE72"
    />
    <Rect
      x="27.7202"
      y="21.8398"
      width="1.68"
      height="3.36"
      rx="0.84"
      transform="rotate(-90 27.7202 21.8398)"
      fill="#00CE72"
    />
    <Rect
      x="10.9199"
      y="21.8398"
      width="1.68"
      height="3.36"
      rx="0.84"
      transform="rotate(-90 10.9199 21.8398)"
      fill="#00CE72"
    />
  </Svg>
);

export default TikiTakaDeco3;
