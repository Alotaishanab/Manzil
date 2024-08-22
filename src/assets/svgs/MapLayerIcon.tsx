import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const MapLayerIcon = (props: {width: any; height: any}) => {
  const {width, height} = props;
  return (
    <Svg
      width={width || '64'}
      height={height || '64'}
      viewBox="0 0 64 64"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M56.88 32L48.45 27.38L32 36.4L15.55 27.38L7.12 32L32 45.63L56.88 32Z"
        fill="black"
      />
      <Path
        d="M48.45 40.04L32 49.05L15.55 40.04L7.12 44.66L32 58.29L56.88 44.66L48.45 40.04Z"
        fill="black"
      />
      <Path
        d="M56.88 19.34L32 5.71L7.12 19.34L32 32.98L56.88 19.34Z"
        fill="black"
      />
    </Svg>
  );
};
