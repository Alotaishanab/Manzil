// src/components/Ads.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { fonts } from '../../assets/fonts';

interface Ad {
  id: string;
  image: any; // Image source: require('path') or { uri: 'https://...' }
  title?: string;
  description?: string;
  onPress?: () => void;
}

interface AdsProps {
  ads: Ad[];
}

const { width } = Dimensions.get('window');

export const Ads: React.FC<AdsProps> = ({ ads }) => {
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        renderItem={renderAd}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  flatListContent: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  adCard: {
    width: width * 0.8,
    marginRight: 15,
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
});

export default Ads;
