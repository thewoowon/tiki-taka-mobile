import React from 'react';
import Svg, {Path} from 'react-native-svg';

const DownChevronIcon = ({width = 20, height = 20, color = '#1F1F1F'}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      d="M5.83317 7.91671L9.99984 12.0834L14.1665 7.91671"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DownChevronIcon;
