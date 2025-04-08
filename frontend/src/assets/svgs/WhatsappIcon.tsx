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
export const WhatsappIcon = (
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
      width={width || 63}
      height={height || 67}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 63} height={height || 67} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.0084 0 0 .00795 -.095 -.045)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={100}
          height={99}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
