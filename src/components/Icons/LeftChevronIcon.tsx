import React from 'react';
import Svg, {Path} from 'react-native-svg';

const LeftChevronIcon = ({width = 24, height = 24, color = 'black'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 4L8 12L16 20"
      stroke="#181818"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LeftChevronIcon;
