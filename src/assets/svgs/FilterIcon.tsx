import * as React from 'react';
import Svg, {G, Rect, Defs, Pattern, Use, Image} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const FilterIcon = props => {
  const {width, height} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 62}
      height={height || 63}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={23} height={23} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01818 0 0 .0179 0 -.001)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={55}
          height={56}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
