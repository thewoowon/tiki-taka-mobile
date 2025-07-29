import React from 'react';
import Svg, {Path, G, Rect, Defs, ClipPath} from 'react-native-svg';

const WarningIcon = ({width = 24, height = 24, color = '#FFB51F'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_1249_5625)">
      <Path
        d="M10.2679 5C11.0377 3.66667 12.9623 3.66667 13.7321 5L20.6603 17C21.4301 18.3333 20.4678 20 18.9282 20H5.0718C3.5322 20 2.56995 18.3333 3.33975 17L10.2679 5Z"
        fill={color}
      />
      <Rect x="11.25" y="8.75" width="1.5" height="6" rx="0.75" fill="white" />
      <Rect
        x="11.25"
        y="16.25"
        width="1.5"
        height="1.5"
        rx="0.75"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1249_5625">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default WarningIcon;
