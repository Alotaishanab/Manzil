import * as React from 'react';
import { Image } from 'react-native';

// Assuming send.png is in the same directory
const sendIcon = require('../images/send.png');

export const ShareIcon = (props) => {
  const { width, height } = props;
  return (
    <Image
      source={sendIcon} // Use the PNG image
      style={{
        width: width || 24, // Set a default width if not provided
        height: height || 24, // Set a default height if not provided
        resizeMode: 'contain', // Ensures the image maintains aspect ratio
      }}
      {...props} // Pass any additional props
    />
  );
};
