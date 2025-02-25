import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import heartIcon from '../../../assets/images/heart.png';
import forbiddenIcon from '../../../assets/images/forbidden.png';
import sendIcon from '../../../assets/images/send.png';

interface TopIconsProps {
  topInset: number;
  onReportPress: () => void;  // Handler for the report modal
}

const TopIcons: React.FC<TopIconsProps> = ({ topInset, onReportPress }) => {
  return (
    <View style={[styles.topRightContainer, { top: topInset + 15 }]}>
      <View style={styles.iconGroupContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={heartIcon} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onReportPress}>
          <Image source={forbiddenIcon} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={sendIcon} style={styles.iconImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topRightContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 110,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconGroupContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    height: 40,
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default TopIcons;
