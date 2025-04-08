import React from 'react';
import Svg, { Path, Circle, Line } from 'react-native-svg';

export const PinIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}>
      <Svg
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 90 90"
        {...props}>
        {/* Vertical line */}
        <Line
          x1="45"
          y1="0"
          x2="45"
          y2="66.036"
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Pin base */}
        <Path
          d="M45 90c-.558 0-1.011-.452-1.011-1.011V41.062c0-.558.453-1.011 1.011-1.011s1.011.453 1.011 1.011v47.927C46.011 89.548 45.558 90 45 90z"
          fill="#66676B"
        />
        
        {/* Main pin circle */}
        <Circle
          cx="45"
          cy="20.531"
          r="20.531"
          fill="#F23F38"
        />
        
        {/* Highlight circle */}
        <Circle
          cx="52.076"
          cy="13.456"
          r="5.056"
          fill="#FF9E9A"
        />
      </Svg>
    </Svg>
  );
};