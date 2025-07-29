import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const TikiTakaDeco2 = ({ width = 42, height = 42, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    <Rect x="0.5" width="42" height="42" rx="5" fill="#00CE72" />
    <Rect
      x="9.74023"
      y="6.71875"
      width="23.52"
      height="28.56"
      rx="2"
      fill="white"
    />
    <Path
      d="M24.6997 3.35938C25.252 3.35938 25.6997 3.80709 25.6997 4.35938V5.03906H27.2202C27.7724 5.03918 28.2202 5.48685 28.2202 6.03906V7.39941C28.22 7.95145 27.7723 8.3993 27.2202 8.39941H15.7798C15.2277 8.3993 14.78 7.95145 14.7798 7.39941V6.03906C14.7798 5.48685 15.2276 5.03918 15.7798 5.03906H17.3003V4.35938C17.3003 3.80709 17.748 3.35938 18.3003 3.35938L24.6997 3.35938Z"
      fill="#040404"
    />
    <Rect
      x="13.9399"
      y="13.4414"
      width="8.4"
      height="1.68"
      rx="0.84"
      fill="#00CE72"
    />
    <Rect
      x="13.9399"
      y="18.4805"
      width="15.12"
      height="1.68"
      rx="0.84"
      fill="#00CE72"
    />
    <Rect
      x="13.9399"
      y="23.5195"
      width="15.12"
      height="1.68"
      rx="0.84"
      fill="#00CE72"
    />
    <Rect
      x="13.9399"
      y="28.5586"
      width="15.12"
      height="1.68"
      rx="0.84"
      fill="#00CE72"
    />
  </Svg>
);

export default TikiTakaDeco2;
