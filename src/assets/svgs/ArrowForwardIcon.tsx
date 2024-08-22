import * as React from 'react';
import Svg, {
  G,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  SvgProps,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const ArrowForwardIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'color'
      | 'fontSize'
      | 'fontFamily'
      | 'pointerEvents'
      | 'width'
      | 'height'
      | 'fill'
      | 'viewBox'
      | 'title'
      | 'children'
      | 'opacity'
      | 'fillOpacity'
      | 'fillRule'
      | 'stroke'
      | 'strokeWidth'
      | 'strokeOpacity'
      | 'strokeDasharray'
      | 'strokeDashoffset'
      | 'strokeLinecap'
      | 'strokeLinejoin'
      | 'strokeMiterlimit'
      | 'vectorEffect'
      | 'clipRule'
      | 'clipPath'
      | 'translate'
      | 'translateX'
      | 'translateY'
      | 'origin'
      | 'originX'
      | 'originY'
      | 'scale'
      | 'scaleX'
      | 'scaleY'
      | 'skew'
      | 'skewX'
      | 'skewY'
      | 'rotation'
      | 'x'
      | 'y'
      | 'transform'
      | 'onStartShouldSetResponder'
      | 'onMoveShouldSetResponder'
      | 'onResponderEnd'
      | 'onResponderGrant'
      | 'onResponderReject'
      | 'onResponderMove'
      | 'onResponderRelease'
      | 'onResponderStart'
      | 'onResponderTerminationRequest'
      | 'onResponderTerminate'
      | 'onStartShouldSetResponderCapture'
      | 'onMoveShouldSetResponderCapture'
      | 'disabled'
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onLongPress'
      | 'delayPressIn'
      | 'delayPressOut'
      | 'delayLongPress'
      | 'id'
      | 'marker'
      | 'markerStart'
      | 'markerMid'
      | 'markerEnd'
      | 'mask'
      | 'onLayout'
      | 'accessibilityLabel'
      | 'accessible'
      | 'testID'
      | 'font'
      | 'fontStyle'
      | 'fontVariant'
      | 'fontWeight'
      | 'fontStretch'
      | 'textAnchor'
      | 'textDecoration'
      | 'letterSpacing'
      | 'wordSpacing'
      | 'kerning'
      | 'fontFeatureSettings'
      | 'fontVariantLigatures'
      | 'fontVariationSettings'
      | 'hitSlop'
      | 'needsOffscreenAlphaCompositing'
      | 'removeClippedSubviews'
      | 'style'
      | 'nativeID'
      | 'collapsable'
      | 'renderToHardwareTextureAndroid'
      | 'focusable'
      | 'tabIndex'
      | 'shouldRasterizeIOS'
      | 'isTVSelectable'
      | 'hasTVPreferredFocus'
      | 'tvParallaxProperties'
      | 'tvParallaxShiftDistanceX'
      | 'tvParallaxShiftDistanceY'
      | 'tvParallaxTiltAngle'
      | 'tvParallaxMagnification'
      | 'onTouchStart'
      | 'onTouchMove'
      | 'onTouchEnd'
      | 'onTouchCancel'
      | 'onTouchEndCapture'
      | 'onPointerEnter'
      | 'onPointerEnterCapture'
      | 'onPointerLeave'
      | 'onPointerLeaveCapture'
      | 'onPointerMove'
      | 'onPointerMoveCapture'
      | 'onPointerCancel'
      | 'onPointerCancelCapture'
      | 'onPointerDown'
      | 'onPointerDownCapture'
      | 'onPointerUp'
      | 'onPointerUpCapture'
      | 'accessibilityActions'
      | 'aria-label'
      | 'accessibilityRole'
      | 'accessibilityState'
      | 'aria-busy'
      | 'aria-checked'
      | 'aria-disabled'
      | 'aria-expanded'
      | 'aria-selected'
      | 'accessibilityHint'
      | 'accessibilityValue'
      | 'aria-valuemax'
      | 'aria-valuemin'
      | 'aria-valuenow'
      | 'aria-valuetext'
      | 'onAccessibilityAction'
      | 'importantForAccessibility'
      | 'aria-hidden'
      | 'aria-modal'
      | 'role'
      | 'accessibilityLabelledBy'
      | 'aria-labelledby'
      | 'accessibilityLiveRegion'
      | 'aria-live'
      | 'accessibilityElementsHidden'
      | 'accessibilityViewIsModal'
      | 'onAccessibilityEscape'
      | 'onAccessibilityTap'
      | 'onMagicTap'
      | 'accessibilityIgnoresInvertColors'
      | 'accessibilityLanguage'
    > & {readonly preserveAspectRatio?: string | undefined} & {},
) => {
  const {width, height} = props;
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={width || 82}
      height={height || 74}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={40} height={40} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.0137 0 0 .01518 0 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={35}
          height={35}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABCCAIAAACU1mxIAAACJ0lEQVR4nO3azysEYRgH8O9o/wNrtX5d/ciNs1KSlQMXcuHG0YocVrESpYgrN04oUbalJC7+Ajm4WmzWurH2NOMw0cZu7cy8zzzPq/02h/epad73U+/MvM07hmmZ+Kep4h4AYSo2PVOx6ZmKTc+w2c4TV8cHSdIuAqRXL5XzxNXC3JplmQCGRvqJejH8X5dcX9zMTS2bpgnAMBCLR4l4DHOyrb25rr7WblsWVuNbJ4dnFB0x2ELh4M7eRkNj2C4tCyuLmxQ8nmeJPzy256QPPM73GzWP+d1NyuNfl9Dx+G0g44mwgYYnxQYCniAbVPNk2aCUJ84GdTyJNijiCbXhm9fYVGeXLnhybQBC4eD27rprnmgbvPGk2+CBp4ENbnl62OCKp40Nznk62eCQp5kNTniBSNeov2NTk89c/qdt8wAMDkcKzwm8Zt78HhdBivL0m5PlJ1ATquYeg5t85vLv7x8/pWFgfmn615xk2A/wnkw6Ozk+m3p4tsuiMHDt43hJJp2dGJt5TKXtshQM2t1v5cOgl80RDBrZnMKgi80FDFrY3MEg3+YaBuE2LzBItnmEQazNOwwybUpgEGhTBYM0m0IYRNnUwiDHphwGITYKGCTYiGBgt9HBwGsjhYHRRg0Dl+0vLBaPqoWBxVYURvHrK4Pt7vb++enFbpP+0wvTMv0/kqeXna29HS09R/sJul54vk/2DXQDyOfyyu+xwmj5XbnM8K9L6PIFdEOeDF0hP/gAAAAASUVORK5CYII="
        />
      </Defs>
    </Svg>
  );
};
