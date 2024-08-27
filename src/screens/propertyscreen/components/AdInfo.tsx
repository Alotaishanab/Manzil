import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useIntl } from '@context';

const { width } = Dimensions.get('window');

// Simulating the TitleValueRow and TitleArrowIconWrap components inline
const TitleValueRow = ({ title, value }) => (
  <View style={styles.rowContainer}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </View>
);

const TitleArrowIconWrap = ({ headingTitle, textStyle }) => (
  <View style={styles.titleContainer}>
    <Text style={[styles.headingTextStyle, textStyle]}>{headingTitle}</Text>
  </View>
);

const AdInfo = () => {
  const { intl } = useIntl();
  const [showAuthorityInfo, setShowAuthorityInfo] = useState(true);

  return (
    <View style={styles.container}>
      <TitleArrowIconWrap
        headingTitle={intl.formatMessage({
          id: 'agencyScreen.real-estate-authority-info',
        })}
        textStyle={styles.headingTextStyle}
      />

      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.advertising-license-number',
        })}
        value={'321'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.unified-number-establishment',
        })}
        value={'25'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.fal-license-no',
        })}
        value={'7'}
      />
      <TitleValueRow
        title={intl.formatMessage({
          id: 'agencyScreen.date-registration',
        })}
        value={'2024/06/29'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 30,
    backgroundColor: '#fff', // White background for a clean look
    borderRadius: 16, // More rounded corners for a modern feel
    padding: 25,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6, // For Android shadow
    // Adding gradient background
    backgroundImage: 'linear-gradient(to bottom right, #f8f9fa, #e9ecef)',
  },
  headingTextStyle: {
    fontSize: 22, // Increased font size for main heading
    fontFamily: 'fonts.primary.bold', // Bold font for headings
    color: '#222', // Darker color for readability
    marginBottom: 20, // More spacing below the heading
    textAlign: 'left', // Align heading to the left for consistency
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12, // More space between rows for clarity
    paddingVertical: 12, // Padding inside each row for better touch targets
    backgroundColor: '#fafafa', // Slight background color for contrast
    borderRadius: 10, // Rounded corners for each row
    shadowColor: '#000', // Subtle shadow for each row
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  titleContainer: {
    marginBottom: 20, // Space after the title for separation
    paddingBottom: 10, // Increased padding inside the title section
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  titleText: {
    fontSize: 18, // Larger text size for all labels
    color: '#555', // Slightly lighter color for label text
    fontFamily: 'fonts.primary.regular', // Regular weight for labels
    flex: 1, // Allow text to occupy more space
  },
  valueText: {
    fontSize: 18, // Larger text size for values
    color: '#000', // Darker color for value text to emphasize importance
    fontFamily: 'fonts.primary.bold', // Bold weight for value text
    textAlign: 'right', // Align value text to the right
    flex: 1, // Flex value to accommodate varying lengths
  },
});

export default AdInfo;
