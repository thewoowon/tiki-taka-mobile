import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MenuIcon = ({ width = 24, height = 24, color = '#9E9E9E' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path d="M2 4H22V6H2V4ZM2 11H22V13H2V11ZM2 18H22V20H2V18Z" fill="white" />
  </Svg>
);

export default MenuIcon;
