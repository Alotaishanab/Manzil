import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Animated, PanResponder, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ModalHeader from './components/ModalHeader';
import ImageGallery from './components/ImageGallery';
import TopIcons from './components/TopIcons';
import ModalContent from './components/ModalContent';

const { height: screenHeight } = Dimensions.get('window');

export const PropertyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const collapsedHeight = screenHeight * 0.30;
  const expandedHeight = screenHeight * 0.80;
  const animatedHeight = useRef(new Animated.Value(collapsedHeight)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollOffsetY = useRef(0).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => gestureState.dy !== 0,
      onPanResponderMove: (e, gestureState) => {
        const newHeight = collapsedHeight - gestureState.dy;
        if (newHeight > 0 && newHeight < screenHeight) {
          animatedHeight.setValue(newHeight);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const toValue = gestureState.dy < -50 ? expandedHeight : collapsedHeight;
        Animated.spring(animatedHeight, {
          toValue,
          useNativeDriver: false,
          friction: 5,
        }).start(() => {
          setIsExpanded(toValue === expandedHeight);
        });
      },
    })
  ).current;

  const handlePlaceholderClick = (index: number) => {
    console.log(`Placeholder ${index + 1} clicked`);
  };

  const handleReport = () => {
    Alert.alert("Report", "Would you like to report this property?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("Reported") }
    ]);
  };

  const handleSave = () => {
    Alert.alert("Save", "Property has been saved.");
  };

  const handleShare = () => {
    Alert.alert("Share", "Share this property with others.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + 15 }]}
        onPress={() => navigation.goBack()} // Logic for X button to navigate back
      >
        <Image source={require('./assets/icons/close.png')} style={styles.closeIconImage} />
      </TouchableOpacity>

      <TopIcons 
        topInset={insets.top} 
        onReportPress={handleReport}  // Connect report button
        onSavePress={handleSave}      // Connect save button
        onSharePress={handleShare}    // Connect share button
      />

      <ImageGallery imagesCount={9} onPlaceholderClick={handlePlaceholderClick} expandedHeight={expandedHeight} />

      <Animated.View style={[styles.modalView, { height: animatedHeight }]}>
        <ModalHeader panHandlers={panResponder.panHandlers} />
        <ModalContent
          imagesCount={9}
          expandedHeight={expandedHeight}
          onPlaceholderClick={handlePlaceholderClick}
          scrollOffsetY={scrollOffsetY}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    zIndex: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingBottom: 110,
    zIndex: 100,
  },
});

export default PropertyScreen;
