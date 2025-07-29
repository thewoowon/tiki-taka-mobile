import React from 'react';
import Svg, {Path, Ellipse} from 'react-native-svg';

const StarCircleIcon = ({width = 24, height = 24, color = '#EF444D'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Ellipse cx="11.9728" cy="11.9726" rx="7.97281" ry="7.97262" fill={color} />
    <Path
      d="M9.93527 15.2344C9.738 15.3423 9.51414 15.1531 9.55401 14.9116L9.9782 12.3332L8.17768 10.5038C8.00954 10.3327 8.09693 10.0198 8.32231 9.98596L10.8256 9.60656L11.9418 7.24783C12.0424 7.03523 12.3148 7.03523 12.4155 7.24783L13.5317 9.60656L16.035 9.98596C16.2603 10.0198 16.3477 10.3327 16.1791 10.5038L14.3791 12.3332L14.8033 14.9116C14.8431 15.1531 14.6193 15.3423 14.422 15.2344L12.1779 14.0046L9.93527 15.2344Z"
      fill="white"
    />
  </Svg>
);

export default StarCircleIcon;
