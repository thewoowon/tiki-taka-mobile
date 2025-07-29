import React from 'react';
import Svg, {Path} from 'react-native-svg';

const StarIcon = ({width = 20, height = 20, color = '#FFB51F'}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2L12.3982 6.69921L17.6085 7.52786L13.8803 11.2608L14.7023 16.4721L10 14.08L5.29772 16.4721L6.11969 11.2608L2.39155 7.52786L7.60184 6.69921L10 2Z"
      fill={color}
    />
  </Svg>
);

export default StarIcon;
