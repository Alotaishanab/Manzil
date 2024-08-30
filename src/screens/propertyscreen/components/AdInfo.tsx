import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useIntl } from '@context'; // Assuming you're still using useIntl for other purposes
import LinearGradient from 'react-native-linear-gradient'; // Use for gradient backgrounds if supported

const { width } = Dimensions.get('window');

// Reusable component for title and value rows with interactive feedback
const TitleValueRow = ({ title, value }) => (
  <TouchableOpacity style={styles.rowContainer} activeOpacity={0.7}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </TouchableOpacity>
);

// Reusable component for heading with an icon to the right
const TitleArrowIconWrap = ({ headingTitle, textStyle }) => (
  <View style={styles.titleContainer}>
    <Text style={[styles.headingTextStyle, textStyle]}>{headingTitle}</Text>
    <Image source={require('../../../assets/images/authorityIcon.png')} style={styles.headingIcon} />
  </View>
);

const AdInfo = () => {
  const intl = useIntl(); // If you still need to use intl for other purposes

  return (
    <LinearGradient // Use LinearGradient for a modern background
      colors={['#ffffff', '#e0f7fa']} // Gradient starts from white to blue
      style={styles.gradientContainer}
    >
      <TitleArrowIconWrap
        headingTitle="Real Estate Authority Info"
        textStyle={styles.headingTextStyle}
      />

      {/* Row Items with interactive feedback */}
      <TitleValueRow title="Advertising License Number" value="321" />
      <TitleValueRow title="Unified Number Establishment" value="25" />
      <TitleValueRow title="FAL License No" value="7" />
      <TitleValueRow title="Date Registration" value="2024/06/29" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width: width - 40,
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden', // Ensures the gradient and shadow don't bleed out of rounded corners
    alignSelf: 'center', // Centers the container horizontally
  },
  headingTextStyle: {
    fontSize: 20,
    fontFamily: 'fonts.primary.bold',
    color: '#333',
    textAlign: 'left',
    flex: 1, // Ensures the text takes the maximum space available
  },
  headingIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain', // Maintain aspect ratio of the icon
    marginLeft: 10, // Add spacing between text and icon
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%', // Make sure row container takes full width
  },
  titleContainer: {
    flexDirection: 'row', // To align text and icon horizontally
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'fonts.primary.regular',
    flex: 1, // Allow text to take up available space
  },
  valueText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'fonts.primary.bold',
    textAlign: 'right',
  },
});

export default AdInfo;
