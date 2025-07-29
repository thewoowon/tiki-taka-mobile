import React from 'react';
import Svg, {Path, G, Mask, Defs, ClipPath, Rect} from 'react-native-svg';

type NaverIconProps = {
  width?: number;
  height?: number;
};

const NaverIcon = ({width = 43, height = 43}: NaverIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 43 43" fill="none">
    <G clipPath="url(#clip0_186_3278)">
      <Mask
        id="mask0_186_3278"
        maskType="luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="43"
        height="44">
        <Path
          d="M1.76374 0H41.2381C42.2099 0 43 0.789437 43 1.7622V41.2397C43 42.2124 42.2099 43.0019 41.2363 43.0019H1.76374C0.790125 43.0019 0 42.2124 0 41.2397V1.7622C0 0.789437 0.790125 0 1.76374 0Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_186_3278)">
        <Path d="M43 0H0V43H43V0Z" fill="#03C75A" />
      </G>
      <Path
        d="M24.9338 22.1753L17.7834 11.9126H11.8574V31.0873H18.0661V20.8246L25.2165 31.0873H31.1443V11.9126H24.9338V22.1753Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_186_3278">
        <Rect width="43" height="43" rx="21.5" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default NaverIcon;
