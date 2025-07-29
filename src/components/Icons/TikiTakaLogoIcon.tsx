import React from 'react';
import Svg, { Path } from 'react-native-svg';

const TikiTakaLogoIcon = ({ width = 24, height = 24, color = '#00CE72' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 2H10V7.17157L6.34315 3.51472L3.51472 6.34314L7.17158 10H2V14H7.17157L3.51472 17.6568L6.34315 20.4853L10 16.8284V22H14V16.8284L17.6569 20.4853L20.4853 17.6569L16.8284 14H22V10H16.8284L20.4853 6.34314L17.6569 3.51471L14 7.17157V2Z"
      fill={color}
    />
  </Svg>
);

export default TikiTakaLogoIcon;
