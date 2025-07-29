import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const BakeryMarkerIcon = ({width = 28, height = 28, color = '#FFB51F'}) => (
  <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
    <Circle cx="13.8462" cy="13.8462" r="13.8462" fill="white" />
    <Circle cx="13.8466" cy="13.8456" r="12.6923" fill={color} />
    <Path
      d="M18.4482 11.5923C20.6405 11.6367 22.0356 12.7983 22.784 14.0299C23.467 15.1553 22.6509 16.4107 21.4304 16.7566C19.4183 17.3266 17.4472 17.6555 14.4288 17.6662C11.4906 17.6761 8.72397 17.3808 6.31428 16.853C4.99657 16.5648 4.35503 15.042 5.17023 13.9445C6.0689 12.7337 7.25082 11.629 8.47787 11.6246C8.78306 11.9362 9.34558 12.7634 9.54695 13.8943M18.4482 11.5923C16.7158 8.84432 14.1668 9.53224 13.1851 10.4716M18.4482 11.5923C18.8187 12.1804 19.1526 12.9259 19.4252 13.86M8.47738 11.6251C9.89208 9.34619 13.5154 8.57776 15.0625 13.8769"
      stroke="white"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BakeryMarkerIcon;
