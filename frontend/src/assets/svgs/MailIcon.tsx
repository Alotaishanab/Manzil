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
export const MailIcon = (
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
      width={width || 52}
      height={height || 43}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={52} height={43} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.02176 0 0 .02632 0 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={20}
          height={20}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
