// src/components/Ads.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../assets/fonts';
import { PlayIcon } from '@svgs'; // Ensure PlayIcon is correctly exported

interface Ad {
  id: string;
  image: any; // Image source: require('path') or { uri: 'https://...' }
  title?: string;
  description?: string;
  onPress?: () => void;
}

interface AdsProps {
  ads: Ad[];
  isVisible: boolean; // Controls auto-scroll
}

const { width: screenWidth } = Dimensions.get('window');
const SPACING = 10; // Define consistent spacing between ads
const ITEM_WIDTH = screenWidth - SPACING; // Each ad's width
const SNAP_TO_INTERVAL = ITEM_WIDTH + SPACING; // Total space per ad including spacing

export const Ads: React.FC<AdsProps> = ({ ads, isVisible }) => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(false);

  // Start or stop auto-scroll based on visibility and ads length
  useEffect(() => {
    if (isVisible && ads.length > 1 && !isAutoScroll) {
      startAutoScroll();
    }

    if (!isVisible) {
      stopAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, ads]);

  // Function to start auto-scrolling
  const startAutoScroll = () => {
    if (intervalRef.current) return; // Prevent multiple intervals

    intervalRef.current = setInterval(() => {
      let nextIndex = currentIndex.current + 1;
      if (nextIndex >= ads.length) {
        nextIndex = 0;
      }
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * SNAP_TO_INTERVAL,
        animated: true,
      });
      currentIndex.current = nextIndex;
    }, 3000); // every 3 seconds
    setIsAutoScroll(true);
  };

  // Function to stop auto-scrolling
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoScroll(false);
  };

  // Handle user interaction: stop auto-scroll on scroll begin
  const handleScrollBeginDrag = () => {
    stopAutoScroll();
  };

  // Optionally, restart auto-scroll after user stops interacting
  const handleScrollEndDrag = () => {
    // Restart auto-scroll after a delay
    setTimeout(() => {
      if (isVisible && ads.length > 1) {
        startAutoScroll();
      }
    }, 3000); // delay before auto-scroll restarts
  };

  // Update currentIndex on momentum scroll end
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SNAP_TO_INTERVAL);
    currentIndex.current = index;
  };

  // Render each ad
  const renderAd = ({ item }: { item: Ad }) => (
    <TouchableOpacity
      style={styles.adCard}
      onPress={item.onPress}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.adImage} />
      {item.title && <Text style={styles.adTitle}>{item.title}</Text>}
      {item.description && (
        <Text style={styles.adDescription}>{item.description}</Text>
      )}
      {/* Optional Play Button Overlay */}
      {/* Uncomment below if you want a Play button overlay */}
      {/* 
      <TouchableOpacity style={styles.playButton} onPress={item.onPress}>
        <PlayIcon width={50} height={50} />
      </TouchableOpacity> 
      */}
    </TouchableOpacity>
  );

  // Optimize FlatList performance by defining item layout
  const getItemLayout = (data: Ad[] | null | undefined, index: number) => ({
    length: SNAP_TO_INTERVAL,
    offset: SNAP_TO_INTERVAL * index,
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ads}
        renderItem={renderAd}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_TO_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={styles.flatListContent}
        // Disable pagingEnabled since we're using snapToInterval
        pagingEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  flatListContent: {
    paddingLeft: SPACING / 2, // Left padding for the first item
    paddingRight: SPACING / 2, // Right padding for the last item
  },
  adCard: {
    width: ITEM_WIDTH,
    marginRight: SPACING,
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.25, // iOS shadow
    shadowRadius: 3.84, // iOS shadow
  },
  adImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.headingTitle,
    marginTop: 10,
    marginHorizontal: 10,
    fontFamily: fonts.primary.bold,
  },
  adDescription: {
    fontSize: 14,
    color: Colors.light.headingTitle,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: fonts.primary.regular,
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 10,
  },
});

export default Ads;
