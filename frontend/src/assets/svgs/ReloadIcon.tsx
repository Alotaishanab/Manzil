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
export const ReloadIcon = (
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
      width={width || 184}
      height={height || 186}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect
          width={width || 184}
          height={height || 186}
          fill="url(#b)"
          rx={0}
        />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01266 0 0 .01252 0 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={79}
          height={80}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
