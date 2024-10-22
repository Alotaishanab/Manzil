import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FullScreenImageViewer from './FullScreenImageViewer'; // Import the new full-screen component

interface ImageGalleryProps {
  images: string[]; // Accept an array of image URLs
  onPlaceholderClick: (index: number) => void;
  expandedHeight: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onPlaceholderClick,
  expandedHeight,
}) => {
  const [isViewerVisible, setViewerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const modalOverlapHeight = screenHeight * 0.30; // Approximate height of the modal when expanded (30% of the screen height)

  const openFullScreenViewer = (index: number) => {
    setSelectedIndex(index);
    setViewerVisible(true);
  };

  const closeFullScreenViewer = () => {
    setViewerVisible(false);
  };

  return (
    <>
      <ScrollView
        style={styles.imageGallery}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: modalOverlapHeight - 5 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.galleryContainer}>
          {images.length === 1 ? (
            // Special case: Single image, place it in the second position
            <>
              <View style={styles.image} />
              <TouchableOpacity
                onPress={() => openFullScreenViewer(0)}
                style={styles.image}
              >
                <Image
                  source={{ uri: images[0] }}
                  style={styles.imageElement}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </>
          ) : (
            // General case: Multiple images with a structured layout
            images.map((imageUrl, index) => {
              if ((index + 1) % 4 === 3) {
                // Position for two half-images
                return (
                  <View key={index} style={styles.rowContainer}>
                    <TouchableOpacity
                      onPress={() => openFullScreenViewer(index)}
                      style={styles.halfImage}
                    >
                      <Image
                        source={{ uri: imageUrl }}
                        style={styles.imageElement}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                    {images[index + 1] && (
                      <TouchableOpacity
                        onPress={() => openFullScreenViewer(index + 1)}
                        style={styles.halfImage}
                      >
                        <Image
                          source={{ uri: images[index + 1] }}
                          style={styles.imageElement}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              } else if ((index + 1) % 4 !== 0) {
                // Position for full-width images
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openFullScreenViewer(index)}
                    style={styles.image}
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.imageElement}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                );
              }
              return null;
            })
          )}
        </View>
      </ScrollView>

      {isViewerVisible && (
        <FullScreenImageViewer
          images={images}
          initialIndex={selectedIndex}
          onClose={closeFullScreenViewer}
        />
      )}
    </>
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
  imageElement: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default ImageGallery;
