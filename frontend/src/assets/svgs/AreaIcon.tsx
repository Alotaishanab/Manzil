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
export const AreaIcon = (
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
  const {width, height} = props;
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width={width || 63}
      height={height || 64}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 33} height={width || 34} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01786 0 0 .01758 0 -.001)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={43}
          height={47}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA5CAIAAADsuH/sAAADGUlEQVR4nGP89/8fw1AATAPtAGLBqEOpDYaMQ1mwiv7792/16r3LVuw4c/baq1fv/v6lbYZjZmYSExMyMdaKivAIDXVmYsISfIyYuf7+g+ehYWXnzt+gqeNwASNDjdWruhQVJNHE0R16/8FzC6v416/f09Ft6EBUVPDEsYXobv33/x8c/fn7x8g0moHFmIHFmJPXqrF51u27j3//+YOs5t//f1++foerQZMiD/3+8+f23ceNzbM4ea0gJhuZRv/5i2IvikOXr9gJd8HR4xdxmUt1h8LR0eMX4W5dvmInshRKsl22YgeEUVGWYGmhiytqGBkZaRDhDAwMDJYWuuWl8WiOgQAUh545ew3CiIrypJFTCILoaC80x0AAikNfvXoHYSjIo2c6ugG41XDHQACKQ+HlJTPzgFUEcKvRCu8hUzONOpTaYNSh1AajDqU2GHUotcGwdigHB6uYmBADA4OCvBS13YMTYO8z4QeMjIw7tk3ZuPFARIQ7QcU3bj58/uw1GbagW4rcFWFiNYUw/v0+TbnRDAwMK1fujoypIls7sjNom0bPX6BaD5GcqCceFBZEP3v+5hmJUb9vP5b4pG3UkwewOmNYF08DAkYdSm0w6lBqA+zlqK5+OIXmMjIympvpTJ9WycLCTKFRUAOxlqPUAju2TnZzsyBVF73LUTExIT09VWqZhj3qL19cSaG5jIyMCvJSXFzsFJoDB9gdqq2lRC0LqAWGTK4fdSi1wahDyQW4xmhROPz8PBDG+/ef6eMsTPDg4XMIA9LRhQMUh6qqyEEYO3cep4+zMMHSpdsgDBNjLWRxFIcG+DtAGJU1U9CG0OkDjp+43Nm9EMKOivBAkUOey3n3/pOQmCNkmkde2WfZ8h1v332k7kwSngmxhqaZeCbE0KcYd+487uNfgGeWVliYf/mSNhcXMzTxt28/unlkn79wk/JwxTrFiJ7r3d0tt2ycICzMj8uUt28/Lli0GVN8//4zVHGlkaEGlolQrLPLDAwMHz58mTZ99YaNB27fefTx4xdkKVqEKJnT4IMTDLoCHxcYdSi1AQCt/X61p5m5wwAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  );
};
