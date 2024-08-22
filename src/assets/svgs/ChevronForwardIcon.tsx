import * as React from 'react';
import Svg, {G, Rect, Defs, Pattern, Use, Image} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const ChevronForwardIcon = props => {
  const {width, height} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 104}
      height={height || 87}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width} height={height} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01087 0 0 .013 0 -.007)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={92}
          height={78}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABOCAIAAAAik+afAAABxklEQVR4nO3csUpCARSH8c+2MPUhkiRfp7UGl8CgpQinhqClJ3D0rSzDRhFHNWnT5uBMEuf8D5zvBc7lN9x7znIb+8Oe6m8n0Q+gWKEYFYpRoRgVilGhGBWKUaEYFYpRoRgVilGhGPmiHFynHZ0fynKxur66m03nbhOPzglluVjd3jx+TOfDwUjfxQllu/ne7X6AzXqr7+KEcnF5Pp68tTstMrj4vVN6/W4WF9evTxYX7z0lhUvA8qbvErPRiruErfnKLpG3j6xL8EGo6RJ/JQu6xKOg5yKBgpiLCgpKLkIoyLhooaDhIoeCgIsiCtEuoiiEuuiiEOcijUKQizoKES4JUHB3yYGCr0saFBxdMqHg5ZIMxadkKLPpfDgYbdZboN1pjSdvvX7336dkQvERIRGKmwhZUDxFSIHiLII+ir8I4ighIiijRIkgixIogiZKrAiCKOEiqKEoiCCFIiKCDoqOCCIoUiIooKiJEI4iKEIsiqYIgSiyIkShKIsQgiIugj+KvgjOKClE8ETJIoIbyuf7VxYR3FBa7bNm85QMIkDD7UdVy8Xq6f7l+fVBXARPlETFH4SCFYpRoRgVilGhGBWKUaEY/QI5kfIzMXwuUwAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  );
};
