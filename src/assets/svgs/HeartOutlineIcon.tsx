import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HeartOutlineIconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export const HeartOutlineIcon = ({
  width = 64,
  height = 64,
  stroke = "#000",
}: HeartOutlineIconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
  >
    <Path
      d="M1,21c0,20,31,38,31,38s31-18,31-38c0-8.285-6-16-15-16c-8.285,0-16,5.715-16,14c0-8.285-7.715-14-16-14C7,5,1,12.715,1,21z"
      stroke={stroke}
      strokeWidth="2"
      strokeMiterlimit="10"
      fill="none"
    />
  </Svg>
);

export default HeartOutlineIcon;
