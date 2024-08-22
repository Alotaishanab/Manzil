import * as React from 'react';
import Svg, {G, Rect, Defs, Pattern, Use, Image} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const BathroomIcon = props => {
  const {width, height} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 59}
      height={height || 60}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 39} height={height || 40} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01919 0 0 .01887 -.008 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={39}
          height={39}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
