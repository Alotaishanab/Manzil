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

export const InfoIcon = (
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
      width={width || 123}
      height={height || 118}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={123} height={118} fill="url(#b)" rx={8} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.00538 0 0 .0056 0 -.021)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={186}
          height={186}
          href="data:image/jpeg;base64,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"
        />
      </Defs>
    </Svg>
  );
};
