import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const ShopIcon = props => {
  const {width, height} = props;
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={width || 195}
      height={height || 143}
      fill="none"
      {...props}>
      <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width={143}
        height={143}
        x={26}
        fill="#000"
        opacity="100%"
        viewBox="0 0 24 24"
        {...props}>
        <Path fill="none" d="M0 0h24v24H0z" />
        <Path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
      </Svg>
    </Svg>
  );
};
