import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface ModalHeaderProps {
  panHandlers: any;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ panHandlers }) => {
  return (
    <>
      <View style={styles.headerSection} {...panHandlers}>
        <View style={styles.dragIcon}></View>
        <View style={styles.slipSection}>
          <Text style={styles.leftText}>House</Text>
          <Text style={styles.rightText}>For Sale</Text>
        </View>
      </View>

      <View style={styles.contactButtonContainer}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    paddingTop: 20,
    position: 'relative',
    backgroundColor: 'white',
  },
  dragIcon: {
    width: 40,
    height: 5,
    backgroundColor: '#aaa',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  slipSection: {
    height: 40,
    backgroundColor: 'green',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    top: -40,
    left: (screenWidth - (screenWidth - 40)) / 2 - 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: screenWidth - 40,
  },
  leftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Jost',
  },
  rightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Jost',
  },
  contactButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 102,
  },
  contactButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Jost',
  },
});

export default ModalHeader;
