import React from 'react';
import Svg, {Path} from 'react-native-svg';

const HeartIcon = ({width = 24, height = 24, color = '#9E9E9E'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21L10.695 19.7052C6.06 15.1243 3 12.0932 3 8.3951C3 5.36403 5.178 3 7.95 3C9.516 3 11.019 3.79455 12 5.04033C12.981 3.79455 14.484 3 16.05 3C18.822 3 21 5.36403 21 8.3951C21 12.0932 17.94 15.1243 13.305 19.7052L12 21Z"
      fill={color}
    />
  </Svg>
);

export default HeartIcon;
