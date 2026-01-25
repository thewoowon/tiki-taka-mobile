import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const HistoryIcon = ({ width = 24, height = 24, color = '#00CE72' }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="2" width="20" height="20" rx="3" fill={color} />
    <Path
      d="M11.9997 19.6023C16.197 19.6023 19.5997 16.1997 19.5997 12.0023C19.5997 7.80498 16.197 4.40234 11.9997 4.40234C7.80229 4.40234 4.39966 7.80498 4.39966 12.0023C4.39966 16.1997 7.80229 19.6023 11.9997 19.6023Z"
      fill="#040404"
    />
    <Path
      d="M12.0011 17.6023C15.0939 17.6023 17.6011 15.0951 17.6011 12.0023C17.6011 8.90955 15.0939 6.40234 12.0011 6.40234C8.90833 6.40234 6.40112 8.90955 6.40112 12.0023C6.40112 15.0951 8.90833 17.6023 12.0011 17.6023Z"
      fill="white"
    />
    <Rect
      x="11.5981"
      y="9.60156"
      width="0.799851"
      height="2.79948"
      rx="0.399926"
      fill="#040404"
    />
    <Rect
      x="14.2507"
      y="13.0039"
      width="0.799851"
      height="2.63073"
      rx="0.399926"
      transform="rotate(122.146 14.2507 13.0039)"
      fill="#040404"
    />
    <Rect
      x="11.5981"
      y="7.20312"
      width="0.799331"
      height="1.59866"
      rx="0.399666"
      fill={color}
    />
    <Rect
      x="11.3992"
      y="11.3984"
      width="1.19916"
      height="1.19916"
      rx="0.599582"
      fill="#040404"
      stroke="#040404"
      stroke-width="0.5"
    />
    <Rect
      x="11.5981"
      y="15.2031"
      width="0.799331"
      height="1.59866"
      rx="0.399666"
      fill={color}
    />
    <Rect
      x="15.1995"
      y="12.4023"
      width="0.799331"
      height="1.59866"
      rx="0.399666"
      transform="rotate(-90 15.1995 12.4023)"
      fill={color}
    />
    <Rect
      x="7.19897"
      y="12.4023"
      width="0.799331"
      height="1.59866"
      rx="0.399666"
      transform="rotate(-90 7.19897 12.4023)"
      fill={color}
    />
  </Svg>
);

export default HistoryIcon;
