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
export const MoreIcon = (
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
      width={width || 64}
      height={height || 65}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 64} height={height || 65} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01754 0 0 .01727 0 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={57}
          height={58}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
