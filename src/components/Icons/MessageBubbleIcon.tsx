import React from 'react';
import Svg, {Path, Rect, Text} from 'react-native-svg';

const MessageBubbleIcon = ({
  width = 129,
  height = 42,
  color = '#212121',
  text = '마감벨',
}) => (
  <Svg width={width} height={height} viewBox="0 0 129 42" fill="none">
    <Rect width="129" height="32" rx="6" fill={color} />
    <Text
      x="64.5"
      y="16"
      fontSize="14"
      fill="white"
      textAnchor="middle"
      alignmentBaseline="middle">
      {text}
    </Text>
    <Path
      d="M66.1022 39.8556C65.3023 40.9262 63.6977 40.9262 62.8978 39.8556L57.3625 32.4471C56.377 31.1282 57.3182 29.25 58.9646 29.25L70.0354 29.25C71.6818 29.25 72.623 31.1282 71.6375 32.4471L66.1022 39.8556Z"
      fill={color}
    />
  </Svg>
);

export default MessageBubbleIcon;
