import React from 'react';
import Svg, {Path} from 'react-native-svg';

const MarkerIcon = ({width = 24, height = 24, color = '#9E9E9E'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 1C14.3869 1 16.6764 1.94791 18.3643 3.63574C20.0521 5.32357 21 7.61305 21 10C21 15.9567 14.4827 21.1898 12.54 22.6172C12.2148 22.8559 11.7852 22.8559 11.46 22.6172C9.51733 21.1898 3 15.9567 3 10C3 7.61305 3.94791 5.32357 5.63574 3.63574C7.32357 1.94791 9.61305 1 12 1ZM12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7Z"
      fill={color}
    />
  </Svg>
);

export default MarkerIcon;
