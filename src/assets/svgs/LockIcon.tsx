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
export const LockIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'children'
      | 'style'
      | 'title'
      | 'clipPath'
      | 'marker'
      | 'mask'
      | 'hitSlop'
      | 'id'
      | 'needsOffscreenAlphaCompositing'
      | 'onLayout'
      | 'pointerEvents'
      | 'removeClippedSubviews'
      | 'testID'
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
      | 'accessible'
      | 'accessibilityActions'
      | 'accessibilityLabel'
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
      | 'fill'
      | 'disabled'
      | 'fontFamily'
      | 'fontSize'
      | 'color'
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onLongPress'
      | 'width'
      | 'height'
      | 'viewBox'
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
      | 'delayPressIn'
      | 'delayPressOut'
      | 'delayLongPress'
      | 'markerStart'
      | 'markerMid'
      | 'markerEnd'
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
    > & {readonly preserveAspectRatio?: string | undefined} & {},
) => {
  const {width, height} = props;
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={width || 53}
      height={height || 59}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 53} height={height || 59} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.02128 0 0 .01911 0 -.006)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={35}
          height={40}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
