import React from 'react';
import Svg, {Path, Rect, G, Defs, ClipPath} from 'react-native-svg';

export default function CheckBoxIcon({
  width = 18,
  height = 18,
  color = '#FFB51F',
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Rect width="18" height="18" rx="2" fill={color} />
      <G clipPath="url(#clip0_1305_4439)">
        <Path
          d="M15.0417 4.29289C15.4323 4.68342 15.4323 5.31658 15.0417 5.70711L7.70841 13.0404C7.31788 13.431 6.68472 13.431 6.2942 13.0404L2.96086 9.70711C2.57034 9.31658 2.57034 8.68342 2.96086 8.29289C3.35139 7.90237 3.98455 7.90237 4.37508 8.29289L7.0013 10.9191L13.6275 4.29289C14.0181 3.90237 14.6512 3.90237 15.0417 4.29289Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1305_4439">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(1 1)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
