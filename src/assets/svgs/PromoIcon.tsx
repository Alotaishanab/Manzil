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
export const PromoIcon = (
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
      width={width || 60}
      height={height || 58}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 60} height={height || 58} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01859 0 0 .01923 -.002 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={54}
          height={52}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
