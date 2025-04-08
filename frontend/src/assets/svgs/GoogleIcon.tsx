import React from 'react';
import {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Svg,
} from 'react-native-svg';

export const GoogleIcon = (props: {width: any; height: any; fill: any}) => {
  const {width, height} = props;
  return (
    <Svg
      width={width || '25'}
      height={height || '24'}
      viewBox="0 0 25 24"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
    >
      <G clip-path="url(#clip0_150_2984)">
        <Path
          d="M24.266 12.2764C24.266 11.4606 24.1999 10.6405 24.0588 9.83801H12.74V14.459H19.2217C18.9528 15.9493 18.0885 17.2677 16.823 18.1055V21.1039H20.69C22.9608 19.0138 24.266 15.9273 24.266 12.2764Z"
          fill="url(#paint0_linear_150_2984)"
        />
        <Path
          d="M12.7399 24.0008C15.9763 24.0008 18.7057 22.9382 20.6943 21.1039L16.8273 18.1055C15.7514 18.8375 14.3625 19.252 12.7443 19.252C9.61364 19.252 6.95922 17.1399 6.0068 14.3003H2.01636V17.3912C4.05347 21.4434 8.20265 24.0008 12.7399 24.0008Z"
          fill="#34A853"
        />
        <Path
          d="M6.00253 14.3003C5.49987 12.81 5.49987 11.1962 6.00253 9.70581V6.61487H2.01649C0.31449 10.0056 0.31449 14.0005 2.01649 17.3913L6.00253 14.3003Z"
          fill="#FBBC04"
        />
        <Path
          d="M12.7399 4.74966C14.4507 4.7232 16.1042 5.36697 17.3432 6.54867L20.7693 3.12262C18.5999 1.0855 15.7206 -0.034466 12.7399 0.000808666C8.20265 0.000808666 4.05347 2.55822 2.01636 6.61481L6.00239 9.70575C6.9504 6.86173 9.60923 4.74966 12.7399 4.74966Z"
          fill="#EA4335"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_150_2984"
          x1="18.503"
          y1="9.83801"
          x2="18.503"
          y2="21.1039"
          gradientUnits="userSpaceOnUse">
          <Stop stop-color="#14E0F3" />
          <Stop offset="1" stop-color="#0FB8C9" />
        </LinearGradient>
        <ClipPath id="clip0_150_2984">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
