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
export const HornseyIcon = (
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'children'
      | 'fill'
      | 'disabled'
      | 'style'
      | 'title'
      | 'clipPath'
      | 'marker'
      | 'mask'
      | 'fontFamily'
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
      | 'fontSize'
      | 'color'
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onLongPress'
      | 'delayLongPress'
      | 'delayPressIn'
      | 'delayPressOut'
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
      //   xmlns="http://www.w3.org/2000/svg"
      width={width || 70}
      height={height || 56}
      fill="none"
      {...props}>
      <G filter="url(#a)" opacity="100%">
        <Rect width={width || 70} height={height || 56} fill="url(#b)" rx={0} />
        <Defs>
          <Pattern
            id="b"
            width={1}
            height={1}
            patternContentUnits="objectBoundingBox">
            <Use href="#c" transform="matrix(.01613 0 0 .02016 0 -.004)" />
          </Pattern>
        </Defs>
      </G>
      <Defs>
        <Image
          id="c"
          width={62}
          height={50}
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAyCAIAAACLYf9oAAADt0lEQVR4nO2ZfWwTZRzHn7vrtdfrc22dvEzAwdBEIeILwewPs0jkJSoJDDIgbMFBoHNh3YaBzYwF5iSMTGDAWrK1YwsFwpYMCEEMWWSJixEMGjEaJYgG1KWOaGDrXV+vvcc/ivtD5bneS7ks6efvb+/7SXp5+nt+JSQkgckJabSAenLqRpBTN4JJrG7KJCRe/4b3dEXPX0TJlEyUJNmVb8P6WvOiV3Sww0Jkfq6nRoLhzh6h96R0f0w2zCwu5hrqLEte12SHRYF6GhSJRU71815f8qefZcPmhS9x9XXWkhWA1P/NVKz+8GMIxQaH+A5fbOgz2TD97FxuRw1bvh5YaBVdj3TQOAgkf7wldHSF+wZQLI5Pmmbkw5oqm6uC4KCWxgm0qqeR/rof7j4h+HpTf9zDJ0mnA1Ztge5KcuqTGkv1UX9IXIyevcB7uhI3vpNptTK2inLuvWpqztOq23RV/4fE59d4jy/68WUg4R5OmCh27Wq4s5Z+YZ6Klqyop0nd/U3w+sOBM1KIxyoQzJtL7fV15teKFD2fkJA0YpmqydEIZsX/nMSDQE7dCHLqRkBISAJyv+HqQKIY7g6EPjoiPRjDJ+l5zzn27WEUjZmMJSvnOoFQ5NzF0J594i938EnTjHz77vfZijJAKf7+M7pqKCIx/MX4rpb41zfwMdLOcTtrYU0VwTLqivRUF3+4Od60N3b5U3yMMNOwcjPXuIOckqelTh/11Egw1NIWPt2PH1oAQbBrSxwfNlGFs7WXalVHYyH+wFH+mB9FY/gks7jYsf8DeuGLGhsn0KAeTwidPaG2dtmrKr1gvrO12bL8DfVd/4cadQKhSP+58ebW5K+/45NUwSxHcyNbVpqNu6li9fiV4fGmlsS33+Nj5BNOe8N2uG0rYCxq3WTIDb1GkFM3gpy6ESieHBNXr/OHPNFPBgFCmBhp52zvbIDbtlLPFGozfCQqh97kzdt8uzfSP4ASIi5Hkta3lsFqVzZWvprmdSk4Knh8wvGAzKYFAHr+87DaxZatUz3i/hcdrhooxAv+QPiYLxkcxSfJPCfcvBFWbSELZmosBXpuv+JipG+Ab/eKt27LVFIUs2oF565Uuu7693P0veARCEUvDfIHO+JffiUbNr+8ALrfZdetBhazmq4s7RwzPIgAANS0KdC1yebaRD41XVFFFtelIH0QHfZG+uQOIgAI2sSWltjclZn/f5Zd9TRScFTw+oXuE7IHEQDAUvQqdLusa1YCE4VPPg71LDGJB4GcuhH8DcMTfPo1p8DUAAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  );
};
