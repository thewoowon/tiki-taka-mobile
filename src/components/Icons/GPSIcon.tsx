import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const GPSIcon = ({width = 24, height = 24, color = '#212121'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9.4" stroke="black" strokeWidth="1.2" />
    <Path d="M12 3V5" stroke="black" strokeWidth="1.2" strokeLinecap="round" />
    <Path
      d="M12 19V21"
      stroke="black"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <Path
      d="M21 12L19 12"
      stroke="black"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <Path
      d="M5 12L3 12"
      stroke="black"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <Circle cx="12" cy="12" r="2" fill="#1D1B20" />
  </Svg>
);

export default GPSIcon;
