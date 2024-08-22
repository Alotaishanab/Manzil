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
export const SearchOutlineIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'width'
      | 'height'
      | 'viewBox'
      | 'color'
      | 'title'
      | 'children'
      | 'opacity'
      | 'fill'
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
      | 'pointerEvents'
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
      | 'fontSize'
      | 'fontFamily'
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
      width={width || 72}
      height={height || 71}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 72} height={height || 71} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01563 0 0 .01585 0 -.007)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={64}
          height={64}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
