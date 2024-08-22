import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const EmailIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={76}
      height={67}
      fill="none"
      {...props}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={67}
        height={67}
        x={4.5}
        fill="#030303"
        opacity="100%"
        viewBox="0 0 24 24"
        {...props}>
        <Path fill="none" d="M0 0h24v24H0z" />
        <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
      </Svg>
    </Svg>
  );
};
