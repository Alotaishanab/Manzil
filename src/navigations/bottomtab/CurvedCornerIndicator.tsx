// CurvedCornerIndicator.js
import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@colors';

const { width: screenWidth } = Dimensions.get('window');

const CurvedCornerIndicator = ({ position, tabWidth }) => {
  // Adjust the path for left and right indicators
  const height = 20; // Adjust height as needed
  const width = tabWidth;

  let path;

  if (position === 'left') {
    // SVG path for the left corner
    path = `
      M ${width},0
      L 0,0
      Q ${width * 0.5},${height} ${width},0
      Z
    `;
  } else if (position === 'right') {
    // SVG path for the right corner
    path = `
      M 0,0
      L ${width},0
      Q ${width * 0.5},${height} 0,0
      Z
    `;
  }

  return (
    <Svg
      width={width}
      height={height}
      style={{
        position: 'absolute',
        bottom: 0,
        left: position === 'left' ? 0 : undefined,
        right: position === 'right' ? 0 : undefined,
      }}
    >
      <Path d={path} fill={Colors.light.primaryBtn} />
    </Svg>
  );
};

export default CurvedCornerIndicator;
