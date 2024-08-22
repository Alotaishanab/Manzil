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
export const DriverIcon = (
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
      width={width || 150}
      height={height || 164}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect
          width={width || 150}
          height={height || 164}
          fill="url(#b)"
          rx={0}
        />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.00547 0 0 .005 -.047 0)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={200}
          height={200}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
