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
export const ClockIcon = (
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
      //   xmlns="http://www.w3.org/2000/svg"
      width={width || 71}
      height={height || 74}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 71} height={height || 74} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.0158 0 0 .01515 -.005 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={64}
          height={66}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
