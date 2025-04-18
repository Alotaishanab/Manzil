import React from 'react';
import {Path, Svg} from 'react-native-svg';

export const FullScreenIcon = (props: {width: any; height: any}) => {
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
        d="M4 9L4 6C4 4.89543 4.89543 4 6 4L9 4"
        stroke="#292929"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <Path
        d="M20 15V18C20 19.1046 19.1046 20 18 20H15"
        stroke="#292929"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <Path
        d="M15 4L18 4C19.1046 4 20 4.89543 20 6L20 9"
        stroke="#292929"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <Path
        d="M9 20L6 20C4.89543 20 4 19.1046 4 18L4 15"
        stroke="#292929"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </Svg>
  );
};
