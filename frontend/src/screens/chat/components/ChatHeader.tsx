// components/ChatHeader.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { UserIcon } from '@svgs';
import { fonts } from '@fonts';

interface ChatHeaderProps {
  partnerName: string;
  partnerPic?: string | null;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ partnerName, partnerPic, onClose }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Image source={require('../../../assets/images/close.png')} style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        {partnerPic ? (
          <Image source={{ uri: partnerPic }} style={styles.headerAvatar} />
        ) : (
          <View style={styles.headerAvatarPlaceholder}>
            <UserIcon width={20} height={20} fill="#FFF" />
          </View>
        )}
        <Text style={styles.headerTitle}>{partnerName}</Text>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  closeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#aaa',
    marginRight: 8,
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: '#FFF',
  },
});
