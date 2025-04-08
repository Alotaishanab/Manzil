// SatelliteIcon.tsx

import React from 'react';
import Svg, { Path, Line, Rect } from 'react-native-svg';

interface SatelliteIconProps {
  size?: number;
  color?: string;
}

export const SatelliteIcon: React.FC<SatelliteIconProps> = ({ size = 32, color = '#000' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M21.5,20.5c-2.1,2.1-2.1,5.4,0,7.5l7.5-7.5C26.9,18.5,23.6,18.5,21.5,20.5z"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="28"
      y1="27"
      x2="25.3"
      y2="24.3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x="10.2"
      y="3.5"
      width="5.7"
      height="17"
      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.6777 12.7071)"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="17.5"
      y1="12.5"
      x2="20"
      y2="10"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="11"
      y1="19"
      x2="13.5"
      y2="16.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x="4.5"
      y="17.1"
      width="7.1"
      height="9.9"
      transform="matrix(0.7071 -0.7071 0.7071 0.7071 -13.2132 12.1005)"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x="19.5"
      y="2.1"
      width="7.1"
      height="9.9"
      transform="matrix(0.7071 -0.7071 0.7071 0.7071 1.7868 18.3137)"
      stroke={color}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="5"
      y1="19"
      x2="11"
      y2="25"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line
      x1="20"
      y1="4"
      x2="26"
      y2="10"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SatelliteIcon;
