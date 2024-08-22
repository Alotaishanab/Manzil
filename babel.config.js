module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@fonts': './src/assets/fonts/index',
          '@assets': './src/assets/index',
          '@context': './src/context/index',
          '@navigation': './src/navigation/index',
          '@components': './src/components/index',
          '@screens': './src/screens/index',
          '@svgs': './src/assets/svgs/index',
          '@colors': './src/constants/index',
          '@services': './src/services/index',
          '@validations': './src/validations/useValidations.ts',
          '@useValidations': './src/validations/useValidations.ts',
          '@globalStyles': './src/styles/globalStyles.ts',
          '@helpers': './src/helpers/index',
          '@useDimension': './src/hooks/useDimension.ts',
          // '@assets': './assets/index',

          // '@hooks': './src/hooks/index',
        },
      },
    ],
    [
      'formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        ast: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
