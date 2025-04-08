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
export const BackIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'children'
      | 'fill'
      | 'style'
      | 'title'
      | 'clipPath'
      | 'marker'
      | 'mask'
      | 'width'
      | 'height'
      | 'viewBox'
      | 'color'
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
      | 'markerStart'
      | 'markerMid'
      | 'markerEnd'
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
      xmlns="http://www.w3.org/2000/svg"
      width={width || 94}
      height={height || 84}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 94} height={height || 84} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01191 0 0 .01333 0 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={width || 84}
          height={height || 75}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
