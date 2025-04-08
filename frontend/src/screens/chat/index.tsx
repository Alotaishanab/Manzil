// ChatScreen.tsx
import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '@context';
import { MessagingWebSocketManager, fetchChats } from '@services';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { Colors } from '@colors';

/* ======================== TYPES ======================== */
type Property = {
  lister_id: number;
  lister_name: string;
  address: string;
};

type UserMinimal = {
  user_id: number;
  email: string;
  name: string;
  phone_number: string;
  profile_picture?: string | null;
};

type Message = {
  id: string;
  sender: UserMinimal;
  receiver: UserMinimal | number;
  body: string;
  timestamp: string; // ISO string
  status: string;
  property?: Property;
};

/* ======================== ROUTE TYPE ======================== */
type ChatScreenRouteProp = RouteProp<
  {
    ChatScreen: {
      partnerId?: number;
      partnerName?: string;
      partnerPic?: string | null;
      property?: Property;
    };
  },
  'ChatScreen'
>;

/* ======================== MAIN COMPONENT ======================== */
export const ChatScreen: React.FC = () => {
  // Pull token, userId, and profile from AuthContext
  const { token, userId, userProfile } = useContext(AuthContext);
  const currentUserId = userId ? parseInt(userId, 10) : null;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Get route parameters
  const route = useRoute<ChatScreenRouteProp>();
  const { partnerId, partnerName, partnerPic, property } = route.params || {};

  // Local states
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [myProfilePicture, setMyProfilePicture] = useState<string | null>(null);

  // Set local profile picture if available
  useEffect(() => {
    if (userProfile?.profile_picture) {
      setMyProfilePicture(userProfile.profile_picture);
    }
  }, [userProfile]);

  // Load page=1 messages for this partner
  useEffect(() => {
    if (token) {
      MessagingWebSocketManager.setToken(token);
    }

    const loadMessages = async () => {
      try {
        if (token && partnerId) {
          const pagedData = await fetchChats(token, partnerId, undefined, 1);
          // Sort messages by timestamp ascending
          const sorted = [...pagedData.results].sort(
            (a: Message, b: Message) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          setMessages(sorted);
        } else {
          // New conversation
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Listen for new incoming messages
    const handleNewMessage = (msg: Message) => {
      if (
        (msg.sender.user_id === partnerId &&
          typeof msg.receiver !== 'number' &&
          msg.receiver.user_id === currentUserId) ||
        (typeof msg.receiver !== 'number' &&
          msg.receiver.user_id === partnerId &&
          msg.sender.user_id === currentUserId)
      ) {
        setMessages((prev) => {
          const updated = [...prev, msg];
          updated.sort(
            (x, y) =>
              new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime()
          );
          return updated;
        });
      }
    };

    MessagingWebSocketManager.on('new_message', handleNewMessage);
    return () => {
      MessagingWebSocketManager.off('new_message', handleNewMessage);
    };
  }, [token, partnerId, currentUserId]);

  // Determine receiver ID (for a new conversation, fallback to property lister)
  const receiverId = partnerId || property?.lister_id || 0;

  // Function to send a message
  const sendMessage = (text: string, clearInput: () => void) => {
    if (!text.trim() || !receiverId) return;
    setSending(true);

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: {
        user_id: currentUserId || 0,
        name: 'Me',
        email: '',
        phone_number: '',
        profile_picture: myProfilePicture,
      } as UserMinimal,
      receiver: { user_id: receiverId },
      body: text.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      property,
    };

    try {
      // Send via WebSocket
      MessagingWebSocketManager.send({
        message: newMsg.body,
        receiver_id: receiverId,
      });
      // Update UI immediately
      setMessages((prev) => {
        const updated = [...prev, newMsg];
        updated.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        return updated;
      });
      clearInput();
    } catch (error) {
      console.error('Error sending message via WebSocket:', error);
    } finally {
      setSending(false);
    }
  };

  // Close screen handler
  const handleClose = () => navigation.goBack();

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ChatHeader
        partnerName={partnerName || property?.lister_name || 'User'}
        partnerPic={partnerPic}
        onClose={handleClose}
      />
      <View style={styles.chatContent}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.accent}
            style={{ marginTop: 20 }}
          />
        ) : (
          <ChatMessages messages={messages} currentUserId={currentUserId} />
        )}
      </View>
      <ChatInput sending={sending} onSend={sendMessage} />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for a modern feel
  },
  chatContent: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
});
