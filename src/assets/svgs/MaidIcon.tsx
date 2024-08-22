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
/* SVGR has dropped some elements not supported by react-native-svg: filter
 */
export const MaidIcon = (
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
    > & {readonly preserveAspectRatio?: string} & {},
) => {
  const {width, height} = props;
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={width || 141}
      height={height || 175}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect
          width={width || 141}
          height={height || 175}
          fill="url(#b)"
          rx={0}
        />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.0097 0 0 .00781 -.12 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={128}
          height={128}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
