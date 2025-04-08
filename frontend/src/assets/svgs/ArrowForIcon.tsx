import React from 'react';
import {Path, Svg} from 'react-native-svg';

export const ArrowForIcon = props => {
  const {width, height} = props;
  return (
    <Svg
      width={width || '800px'}
      height={height || '800px'}
      viewBox="0 0 24 24"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M13 6L19 12M19 12L13 18M19 12H5"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
