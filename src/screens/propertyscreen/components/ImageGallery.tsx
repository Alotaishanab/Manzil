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
  const { height: screenHeight } = Dimensions.get('window');
  const modalOverlapHeight = screenHeight * 0.30; // Approximate height of the modal when expanded (30% of the screen height)
  const slipHeight = 40; // Adjusted slip height to match the updated slip section
  const placeholderHeight = 200; // The height of each image placeholder

  // Adjust the content height calculation to align the last image with the slip section and reduce gaps
  const contentHeight = placeholderHeight * imagesCount + slipHeight - modalOverlapHeight - 15;

  return (
    <ScrollView
      style={styles.imageGallery}
      contentContainerStyle={[
        styles.scrollViewContent,
        { paddingBottom: modalOverlapHeight - 5 }, // Ensure scrolling stops where the last placeholder aligns with the slip
      ]}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: imagesCount }).map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPlaceholderClick(index)}
          style={[styles.image, { backgroundColor: '#ccc', marginBottom: 5 }]} // Reduced gap between placeholders
        >
          <Text style={styles.placeholderText}>Placeholder {index + 1}</Text>
        </TouchableOpacity>
      ))}
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
  image: {
    width: '100%',
    height: 200,
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
