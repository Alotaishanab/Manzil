import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface ImageGalleryProps {
  imagesCount: number;
  onPlaceholderClick: (index: number) => void;
  expandedHeight: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imagesCount,
  onPlaceholderClick,
  expandedHeight,
}) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const modalOverlapHeight = screenHeight * 0.30; // Approximate height of the modal when expanded (30% of the screen height)
  const placeholderHeight = 200; // The height of each standard image placeholder
  const halfWidth = (screenWidth / 2) - 15; // Calculate half of the screen width with padding

  // Calculate total content height to help align with modal
  const contentHeight = placeholderHeight * imagesCount - modalOverlapHeight;

  return (
    <ScrollView
      style={styles.imageGallery}
      contentContainerStyle={[
        styles.scrollViewContent,
        { paddingBottom: modalOverlapHeight - 5 }, // Ensure scrolling stops where the last placeholder aligns with the slip
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.galleryContainer}>
        {Array.from({ length: imagesCount }).map((_, index) => {
          // Every 3rd placeholder split into two smaller ones
          if ((index + 1) % 3 === 0) {
            return (
              <View key={index} style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() => onPlaceholderClick(index)}
                  style={[styles.halfImage, { backgroundColor: '#ccc' }]}
                >
                  <Text style={styles.placeholderText}>Placeholder {index + 1}a</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onPlaceholderClick(index + 1)}
                  style={[styles.halfImage, { backgroundColor: '#ccc' }]}
                >
                  <Text style={styles.placeholderText}>Placeholder {index + 1}b</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onPlaceholderClick(index)}
                style={[styles.image, { backgroundColor: '#ccc', marginBottom: 5 }]}
              >
                <Text style={styles.placeholderText}>Placeholder {index + 1}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageGallery: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: -60, // Adjust this to ensure the first image starts correctly
  },
  scrollViewContent: {
    paddingBottom: 0,
  },
  galleryContainer: {
    flexDirection: 'column',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  halfImage: {
    width: (Dimensions.get('window').width / 2) - 3, // Adjust for spacing
    height: 170, // Make it square by setting height equal to half of the width
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Jost',
  },
});

export default ImageGallery;
