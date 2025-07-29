import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftArrowIcon = ({ width = 24, height = 24, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6.82843 11.0009H21V13.0009H6.82843L13.1924 19.3648L11.7782 20.779L3 12.0009L11.7782 3.22266L13.1924 4.63687L6.82843 11.0009Z"
      fill="white"
    />
  </Svg>
);

export default LeftArrowIcon;
