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
export const SearchIcon = (
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
      | 'disabled'
      | 'fontFamily'
      | 'fontSize'
      | 'color'
      | 'pointerEvents'
      | 'id'
      | 'onLayout'
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onLongPress'
      | 'testID'
      | 'nativeID'
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
      | 'hitSlop'
      | 'needsOffscreenAlphaCompositing'
      | 'removeClippedSubviews'
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
    > & {readonly preserveAspectRatio?: string | undefined} & {},
) => {
  const {width, height, fill = 'none'} = props;
  return (
    <Svg
      //   xmlns="http://www.w3.org/2000/svg"
      width={width || 56}
      height={height || 56}
      fill={'none'}
      {...props}>
      <G opacity="100%">
        <Rect width={width || 56} height={height || 56} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="scale(.02)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={50}
          height={50}
          href="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
};
