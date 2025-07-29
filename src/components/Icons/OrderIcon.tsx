import React from 'react';
import Svg, {Path} from 'react-native-svg';

const OrderIcon = ({width = 24, height = 24, color = '#9E9E9E'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 4C18.5304 4 19.039 4.21086 19.4141 4.58594C19.7891 4.96101 20 5.46957 20 6V20C20 20.5304 19.7891 21.039 19.4141 21.4141C19.039 21.7891 18.5304 22 18 22H6C5.46957 22 4.96101 21.7891 4.58594 21.4141C4.21086 21.039 4 20.5304 4 20V6C4 5.46957 4.21086 4.96101 4.58594 4.58594C4.96101 4.21086 5.46957 4 6 4H18ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H8ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
      fill={color}
    />
  </Svg>
);

export default OrderIcon;
