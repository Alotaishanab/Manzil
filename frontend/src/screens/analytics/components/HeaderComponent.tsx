// components/HeaderComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

interface HeaderComponentProps {
  daysRange: number;
  showModal: () => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ daysRange, showModal }) => (
  <>
    <View style={styles.centeredButtonContainer}>
      <TouchableOpacity onPress={showModal} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[styles.LastText, { color: 'black', fontWeight: 'bold', fontSize: 18 }]}>Last </Text>
        <Text style={[styles.clickableText, { color: 'green', fontWeight: 'bold', fontSize: 18 }]}>{daysRange} Days ▼</Text>
      </TouchableOpacity>
    </View>
    
  </>
);

export default HeaderComponent;
