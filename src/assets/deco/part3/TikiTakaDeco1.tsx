import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const TikiTakaDeco1 = ({ width = 42, height = 42, color = 'black' }) => (
  <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
    <Rect width="42" height="42" rx="5" fill="#00CE72" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.0239 5.87891H17.9759V13.6983L12.4467 8.16916L8.17014 12.4457L13.6993 17.9749H5.87988V24.0229H13.6993L8.17014 29.552L12.4467 33.8287L17.9759 28.2994V36.1189H24.0239V28.2994L29.5531 33.8287L33.8297 29.5521L28.3004 24.0229H36.1199V17.9749H28.3004L33.8297 12.4457L29.5531 8.16915L24.0239 13.6983V5.87891Z"
      fill="#040404"
    />
  </Svg>
);

export default TikiTakaDeco1;
