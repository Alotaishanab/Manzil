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
export const SavedIcon = (
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
      width={width || 64}
      height={height || 67}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 64} height={height || 67} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01754 0 0 .01676 0 -.003)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={45}
          height={45}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
