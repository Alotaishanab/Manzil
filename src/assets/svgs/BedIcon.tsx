import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BedIcon = ({ width = 24, height = 24 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 48 48" // Adjusted viewBox to match the provided SVG dimensions
    fill="none"
  >
    <Path
      d="M43,22.264V13a7.008,7.008,0,0,0-7-7H12a7.008,7.008,0,0,0-7,7v9.264A6.991,6.991,0,0,0,2,28V40a2,2,0,0,0,2,2H8a2,2,0,0,0,2-2V37H38v3a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V28A6.991,6.991,0,0,0,43,22.264ZM7,13a5.006,5.006,0,0,1,5-5H36a5.006,5.006,0,0,1,5,5v8.3a6.956,6.956,0,0,0-2-.3V19a4,4,0,0,0-4-4H29a4,4,0,0,0-4,4v2H23V19a4,4,0,0,0-4-4H13a4,4,0,0,0-4,4v2a6.956,6.956,0,0,0-2,.3Zm30,8H27V19a2,2,0,0,1,2-2h6a2,2,0,0,1,2,2ZM21,21H11V19a2,2,0,0,1,2-2h6a2,2,0,0,1,2,2ZM4,28a5.006,5.006,0,0,1,5-5H39a5.006,5.006,0,0,1,5,5v1H4ZM8,40H4V37H8ZM4,35V31H44v4Zm40,5H40V37h4Z"
      fill="#000"
    />
  </Svg>
);

export default BedIcon;
