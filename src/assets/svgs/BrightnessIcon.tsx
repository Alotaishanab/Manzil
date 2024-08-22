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
export const BrightnessIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'x'
      | 'y'
      | 'width'
      | 'height'
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
      | 'viewBox'
      | 'color'
      | 'title'
      | 'children'
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
      width={width || 59}
      height={height || 65}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 59} height={height || 65} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.019 0 0 .01724 -.003 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={53}
          height={58}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
