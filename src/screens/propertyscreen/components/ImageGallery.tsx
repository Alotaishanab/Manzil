// src/screens/components/ImageGallery.tsx
import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import FullScreenMediaViewer from './FullScreenMediaViewer';

interface ImageGalleryProps {
  images: string[]; // Array of media URLs (images and videos)
  onPlaceholderClick: (index: number) => void;
  expandedHeight: number;
}

// Helper: if a URL ends with ".mp4" (or ".mov"), we consider it a video.
const isVideo = (url: string): boolean => {
  const lower = url.toLowerCase();
  return lower.endsWith('.mp4') || lower.endsWith('.mov');
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onPlaceholderClick,
  expandedHeight,
}) => {
  const [isViewerVisible, setViewerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { height: screenHeight } = Dimensions.get('window');
  const modalOverlapHeight = screenHeight * 0.30;

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
            // Special case: Single media item – leave an empty view on top then the media.
            <>
              <View style={styles.image} />
              <TouchableOpacity
                onPress={() => openFullScreenViewer(0)}
                style={styles.image}
              >
                {isVideo(images[0]) ? (
                  <Video
                    source={{ uri: images[0] }}
                    style={styles.imageElement}
                    controls
                    paused={false} // auto-play
                    repeat // loops video
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={{ uri: images[0] }}
                    style={styles.imageElement}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>
            </>
          ) : (
            // General case: Render each media item using your original modulo logic.
            images.map((mediaUrl, index) => {
              // If ((index+1) % 4 === 3), render a row container with two half-width items.
              // However, if there's no second item in that row, render the current item as full width.
              if ((index + 1) % 4 === 3) {
                if (!images[index + 1]) {
                  // Last row with one item only—render full width.
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => openFullScreenViewer(index)}
                      style={styles.image}
                    >
                      {isVideo(mediaUrl) ? (
                        <Video
                          source={{ uri: mediaUrl }}
                          style={styles.imageElement}
                          controls
                          paused={false} // auto-play
                          repeat
                          resizeMode="cover"
                        />
                      ) : (
                        <Image
                          source={{ uri: mediaUrl }}
                          style={styles.imageElement}
                          resizeMode="cover"
                        />
                      )}
                    </TouchableOpacity>
                  );
                } else {
                  // Render two half-width items in a row.
                  return (
                    <View key={index} style={styles.rowContainer}>
                      <TouchableOpacity
                        onPress={() => openFullScreenViewer(index)}
                        style={styles.halfImage}
                      >
                        {isVideo(mediaUrl) ? (
                          <Video
                            source={{ uri: mediaUrl }}
                            style={styles.imageElement}
                            controls
                            paused={false} // auto-play
                            repeat
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            source={{ uri: mediaUrl }}
                            style={styles.imageElement}
                            resizeMode="cover"
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openFullScreenViewer(index + 1)}
                        style={styles.halfImage}
                      >
                        {isVideo(images[index + 1]) ? (
                          <Video
                            source={{ uri: images[index + 1] }}
                            style={styles.imageElement}
                            controls
                            paused={false} // auto-play
                            repeat
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            source={{ uri: images[index + 1] }}
                            style={styles.imageElement}
                            resizeMode="cover"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }
              } else if ((index + 1) % 4 !== 0) {
                // Render full-width media for other items.
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openFullScreenViewer(index)}
                    style={styles.image}
                  >
                    {isVideo(mediaUrl) ? (
                      <Video
                        source={{ uri: mediaUrl }}
                        style={styles.imageElement}
                        controls
                        paused={false} // auto-play
                        repeat
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={{ uri: mediaUrl }}
                        style={styles.imageElement}
                        resizeMode="cover"
                      />
                    )}
                  </TouchableOpacity>
                );
              }
              return null;
            })
          )}
        </View>
      </ScrollView>

      {isViewerVisible && (
        <FullScreenMediaViewer
          media={images}
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
    marginTop: -60,
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
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  halfImage: {
    width: Dimensions.get('window').width / 2,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  imageElement: {
    width: '100%',
    height: '100%',
  },
});

export default ImageGallery;
