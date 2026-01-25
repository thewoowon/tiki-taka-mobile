import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DocumentIcon = ({ width = 24, height = 24, color = '#4BB2FF' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 2.5C13.4379 2.5 6 2.5 6 2.5C4.89543 2.5 4 3.39543 4 4.5V19.5C4 20.6046 4.89543 21.5 6 21.5H18C19.1046 21.5 20 20.6046 20 19.5V4.5C20 3.39543 19.1046 2.5 18 2.5H14.5"
      fill={color}
    />
    <Path d="M8 7.5H10Z" fill="white" />
    <Path
      d="M8 7.5H10"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 16.5H16Z" fill="white" />
    <Path
      d="M8 16.5H16"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 13.5H16Z" fill="white" />
    <Path
      d="M8 13.5H16"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 10.5H16Z" fill="white" />
    <Path
      d="M8 10.5H16"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DocumentIcon;
