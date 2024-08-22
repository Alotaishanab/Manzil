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
export const BedIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'title'
      | 'color'
      | 'fontFamily'
      | 'fontSize'
      | 'pointerEvents'
      | 'children'
      | 'style'
      | 'clipPath'
      | 'marker'
      | 'mask'
      | 'width'
      | 'height'
      | 'hitSlop'
      | 'id'
      | 'needsOffscreenAlphaCompositing'
      | 'onLayout'
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
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onLongPress'
      | 'disabled'
      | 'delayLongPress'
      | 'delayPressIn'
      | 'delayPressOut'
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
      width={width || 62}
      height={height || 54}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 32} height={height || 24} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01818 0 0 .02088 0 -.001)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={55}
          height={48}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAwCAIAAAA6vHWpAAACt0lEQVR4nGP89/8fw6AHTAPtAKLAkHXlixdv6e8O/ADdldGxNVKyHtGxNQPiGlyAES33sHKY//37j5mZ6fePkwPlJkyAHpZ///6Dk4MHDNncMwjBqCupB0ZdST0wNFzJgktCXskHmcvFySEvL2lrYxgV5amoIImp/vSZ66tW7Tp56srz529+/f5NkiN4ebilpETsbI1CQlw01OUxFaDXPUyspvhNZGZmSk4M6OzI4+fnhojcvfc0O6dj1+4TJLkMK2BkZIyO8uztLhAVFaTIlRCgria/c/tUOTnxg4fOBwYXf/jwmXInwoG8vOSWTRO0tZQIu/Lhva3I4h8/fb508fb8hZv37jsFEVFTlZs3t97DK/fLl28MDAzMzExRkR6hwc6qagpcnBwkOevzl6/Xr91fsmzbxk0HISIyMmKnji+SkBCGqvj3/x8yYmAxhiA0cThaumw7B48lRA0zuymEIS3vefL0VVxaiEc7dh7jF7aHmOkfVIRwFamu/Pf/37LlO+DKGFiMufisL125TbkTIWjvvlNMbFDPHz95GSJITkkUEeHm4mwG5xYVROtoK5NhDlbg6GgSE+0JYS9fvgPCILO8TErwh7MTE/3xqCQDJMIM37f/NIRBpiv1DdQgDD4+bqzFJyXAQB9q+OMnLyEMMl3Jw80FZfBwUe4sNAAviT9+/AJhDPEacuq01Xi0vX//CcL4+vU7fpVUAWTWPXQD/36fZhjyMZ6ZHkJPd6CB6TPXIHNxxjgkqAcKoDljaMT4qCupB0ZdST0w6krqAZylOp+gPT3dgR/gdCWkzzVIwBCP8U/vD9HTHWiAT9AOmYvTlTw8nLR3DLFgaMT40HQlMzMTnBxAgOYMjFmpKE84OYAgLNSVgYEhNMQFwkVvBTMwMLx//1lQkJfe7sIAL168hY9mYXHlIAQA9vuw43HdwHcAAAAASUVORK5CYII="
        />
      </Defs>
    </Svg>
  );
};
