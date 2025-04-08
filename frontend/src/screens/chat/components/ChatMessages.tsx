// components/ChatMessages.tsx
import React, { useRef, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Image } from 'react-native';
import { formatDate, formatTime } from '@helpers';
import { UserIcon } from '@svgs';
import { fonts } from '@fonts';

/* -------------------- Type Definitions -------------------- */
interface UserMinimal {
  user_id: number;
  email: string;
  name: string;
  phone_number: string;
  profile_picture?: string | null;
}

interface Message {
  id: string;
  sender: UserMinimal;
  receiver: UserMinimal | number;
  body: string;
  timestamp: string; // ISO string
  status: string;
  property?: any; // Optional, adjust as needed
}

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: number | null;
}

/* -------------------- ChatMessages Component -------------------- */
const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUserId }) => {
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    // Auto-scroll to end when messages change
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const isMyMessage = item.sender.user_id === currentUserId;
    let showDayHeader = false;
    if (index === 0) {
      showDayHeader = true;
    } else {
      const prevDay = new Date(messages[index - 1].timestamp).toDateString();
      const currDay = new Date(item.timestamp).toDateString();
      if (prevDay !== currDay) showDayHeader = true;
    }

    return (
      <View key={item.id}>
        {showDayHeader && (
          <View style={styles.dayHeader}>
            <Text style={styles.dayHeaderText}>{formatDate(item.timestamp)}</Text>
          </View>
        )}
        <View
          style={[
            styles.messageRow,
            isMyMessage ? styles.myMessageRow : styles.theirMessageRow,
          ]}
        >
          <View style={[styles.messageBubble, isMyMessage ? styles.myBubble : styles.theirBubble]}>
            <Text style={styles.messageText}>{item.body}</Text>
            <View style={styles.bubbleFooter}>
              <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
              {item.sender.profile_picture ? (
                <Image
                  source={{ uri: item.sender.profile_picture }}
                  style={styles.bubbleAvatar}
                />
              ) : (
                <View style={styles.bubbleAvatarPlaceholder}>
                  <UserIcon width={14} height={14} fill="#FFF" />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.messagesContainer}
    />
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  messagesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  dayHeader: {
    alignSelf: 'center',
    backgroundColor: '#ECECEC', // light grey background for day header
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 6,
  },
  dayHeaderText: {
    fontSize: 12,
    color: '#555', // darker grey text for clarity
    fontFamily: fonts.primary.medium,
  },
  messageRow: {
    marginBottom: 8,
  },
  myMessageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  // WhatsApp-inspired outgoing bubble (light green)
  myBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  // WhatsApp-inspired incoming bubble (white)
  theirBubble: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 15,
    color: '#000', // black text for readability on white and green backgrounds
    fontFamily: fonts.primary.regular,
    marginBottom: 4,
  },
  bubbleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: 10,
    color: '#777',
    fontFamily: fonts.primary.regular,
    marginRight: 6,
  },
  bubbleAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  // Use a brown color (palm tree inspired) for the placeholder avatar
  bubbleAvatarPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8B4513', // saddle brown
    alignItems: 'center',
    justifyContent: 'center',
  },
});
