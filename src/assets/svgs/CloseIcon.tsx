import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CloseIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'pointerEvents'
      | 'color'
      | 'fontFamily'
      | 'fontSize'
      | 'children'
      | 'style'
      | 'title'
      | 'clipPath'
      | 'marker'
      | 'mask'
      | 'removeClippedSubviews'
      | 'hitSlop'
      | 'id'
      | 'needsOffscreenAlphaCompositing'
      | 'onLayout'
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
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onLongPress'
      | 'disabled'
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
  const {width, height, color, fill} = props;
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={width || 800}
      height={height || 800}
      fill="none"
      viewBox="0 0 24 24"
      {...props}>
      <Path fill={color || '#fff'} d="M0 0h24v24H0z" />
      <Path
        stroke={fill || '#000'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7 17 9.9-9.9M7 7l9.9 9.9"
      />
    </Svg>
  );
};
