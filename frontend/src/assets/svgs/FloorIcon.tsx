import React from 'react';
import { Svg, Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

export const FloorIcon: React.FC<Props> = ({ width = 24, height = 24, color = '#010002' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32">
      <Path fill={color} d="M9,29h5.833L9,23h5V9H9l5.833-6H9V0h14v3h-5.833L23,9h-5v14h5l-5.833,6H23v3H9V29z"/>
    </Svg>
  );
};

export default FloorIcon;
