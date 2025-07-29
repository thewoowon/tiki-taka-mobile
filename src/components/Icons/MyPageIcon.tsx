import React from 'react';
import Svg, {Path} from 'react-native-svg';

const MyPageIcon = ({width = 24, height = 24, color = '#9E9E9E'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 21V18.6667C21 17.429 20.5259 16.242 19.682 15.3668C18.8381 14.4917 17.6935 14 16.5 14H7.5C6.30653 14 5.16193 14.4917 4.31802 15.3668C3.47411 16.242 3 17.429 3 18.6667V21"
      fill={color}
    />
    <Path
      d="M11.5 12C13.9853 12 16 9.98528 16 7.5C16 5.01472 13.9853 3 11.5 3C9.01472 3 7 5.01472 7 7.5C7 9.98528 9.01472 12 11.5 12Z"
      fill={color}
    />
  </Svg>
);

export default MyPageIcon;
