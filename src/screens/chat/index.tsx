import React, { useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '@context';
import { Colors } from '@colors';
import { fonts } from '@fonts';

import { MessagingWebSocketManager, fetchChats } from '@services';
import sendIcon from '../../assets/images/send.png';
import closeIcon from '../../assets/images/close.png';
import { launchScreen } from '@assets';
import { UserIcon } from '@svgs'; // Fallback icon for no profile pic

// --------------------- Types ---------------------
interface Property {
  lister_id: number;
  lister_name: string;
  address: string;
}

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
  property?: Property;
}

type ChatScreenRouteProp = RouteProp<
  {
    ChatScreen: {
      message: Message; // The initial message object
      property?: Property;
    };
  },
  'ChatScreen'
>;

export const ChatScreen: React.FC = () => {
  const { token, user } = useContext(AuthContext);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute<ChatScreenRouteProp>();

  // Derive current user ID from AuthContext (check both id and user_id)
  const currentUserId = user?.user_id || user?.id;

  // Destructure the params
  const { message, property } = route.params;

  // We'll store ALL messages we fetch
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Input field state
  const [inputText, setInputText] = useState('');

  // 1) On mount, set the WebSocket token & fetch all messages
  useEffect(() => {
    if (token) {
      MessagingWebSocketManager.setToken(token);
    }

    const loadMessages = async () => {
      try {
        const chatHistory = await fetchChats(token);
        console.log('[ChatScreen] Fetched chat history:', chatHistory);

        // Sort ascending by timestamp so older messages appear first
        chatHistory.sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        setMessages(chatHistory);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Listen for new incoming messages
    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => {
        const updated = [...prev, msg];
        updated.sort(
          (x, y) => new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime()
        );
        return updated;
      });
    };

    MessagingWebSocketManager.on('new_message', handleNewMessage);

    return () => {
      MessagingWebSocketManager.off('new_message', handleNewMessage);
    };
  }, [token]);

  // 2) Send a new message
  const sendMessage = async () => {
    if (!inputText.trim()) return; // Ensure there's a valid message

    setSending(true);

    // Determine receiver using currentUserId for the proper comparison
    const receiverId =
      message.sender.user_id === currentUserId
        ? (message.receiver as UserMinimal).user_id
        : message.sender.user_id;

    // Create a local "Message" object for UI using currentUserId
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: {
        user_id: currentUserId || 0,
        name: user?.name || 'Me',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        profile_picture: user?.profile_picture || null,
      },
      receiver: { user_id: receiverId },
      body: inputText.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      property: property,
    };

    try {
      // The WebSocket consumer expects only { message, receiver_id }
      const wsPayload = {
        message: newMsg.body,
        receiver_id: receiverId,
      };

      MessagingWebSocketManager.send(wsPayload);

      // Immediately update UI
      setMessages((prev) => {
        const updated = [...prev, newMsg];
        updated.sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        return updated;
      });

      setInputText('');
    } catch (error) {
      console.error('Error sending message via WebSocket:', error);
    } finally {
      setSending(false);
    }
  };

  // 3) Formatting day/time
  const formatDate = (str: string) => {
    const d = new Date(str);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (str: string) => {
    const d = new Date(str);
    return d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // 4) Render each message
  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const isMyMessage = item.sender.user_id === currentUserId;

    // Show a day header if day changes
    let showDayHeader = false;
    if (index === 0) {
      showDayHeader = true;
    } else {
      const prevDay = new Date(messages[index - 1].timestamp).toDateString();
      const currDay = new Date(item.timestamp).toDateString();
      if (prevDay !== currDay) {
        showDayHeader = true;
      }
    }

    const senderPic = isMyMessage ? user?.profile_picture : item.sender.profile_picture;
    const avatarContent = senderPic ? (
      <Image source={{ uri: senderPic }} style={styles.chatAvatar} />
    ) : (
      <View style={styles.chatAvatarPlaceholder}>
        <UserIcon width={16} height={16} fill="#FFF" />
      </View>
    );

    return (
      <>
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
          {avatarContent}
          <View
            style={[
              styles.messageBubble,
              isMyMessage ? styles.myBubble : styles.theirBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.body}</Text>
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
          </View>
        </View>
      </>
    );
  };

  // 5) Quick replies
  const quickReplies = ["I'm interested…", 'Price?', 'Viewing?'];
  const handleQuickReply = (txt: string) => {
    setInputText(txt);
    sendMessage();
  };

  // 6) Determine the conversation partner
  // If the logged-in user is the sender, then the partner is message.receiver; otherwise, the partner is message.sender.
  const partnerFromMessage =
    message.sender.user_id === currentUserId ? message.receiver : message.sender;
  const partnerObj =
    typeof partnerFromMessage === 'number'
      ? {
          user_id: partnerFromMessage,
          name: 'User',
          email: '',
          phone_number: '',
          profile_picture: null,
        }
      : partnerFromMessage;
  const partnerName = partnerObj.name || 'User';
  const partnerPic = partnerObj.profile_picture || null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background image */}

      {/* Close Button */}
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + 15 }]}
        onPress={() => navigation.goBack()}
      >
        <Image source={closeIcon} style={styles.closeIcon} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        {partnerPic ? (
          <Image source={{ uri: partnerPic }} style={styles.headerAvatar} />
        ) : (
          <View style={styles.headerAvatarPlaceholder}>
            <UserIcon width={20} height={20} fill="#FFF" />
          </View>
        )}
        <Text style={styles.headerTitle}>{partnerName}</Text>
        {property?.address ? (
          <Text style={styles.subHeader}>{property.address}</Text>
        ) : null}
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerText}>
          Manzil is not responsible for contacting outside of the platform.
        </Text>
      </View>

      {/* Messages List */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Quick Replies */}
      <View style={styles.quickReplies}>
        {quickReplies.map((txt, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.quickReplyButton}
            onPress={() => handleQuickReply(txt)}
            disabled={sending}
          >
            <Text style={styles.quickReplyButtonText}>{txt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input Field */}
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={sendMessage}
          disabled={sending || !inputText.trim()}
        >
          <Image
            source={sendIcon}
            style={[
              styles.iconImage,
              (sending || !inputText.trim()) && { opacity: 0.5 },
            ]}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ------------------- STYLES -------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    zIndex: 999,
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 4,
  },
  headerAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: '#333',
  },
  subHeader: {
    fontSize: 14,
    fontFamily: fonts.primary.regular,
    color: '#666',
    marginTop: 2,
  },
  disclaimerContainer: {
    paddingVertical: 6,
    backgroundColor: '#ffe6e6',
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#ff0000',
    textAlign: 'center',
  },
  messagesContainer: {
    paddingHorizontal: 12,
    flexGrow: 1,
    paddingBottom: 16,
  },
  dayHeader: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginVertical: 6,
  },
  dayHeaderText: {
    fontSize: 12,
    color: '#333',
    fontFamily: fonts.primary.medium,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-end',
  },
  myMessageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  chatAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 6,
  },
  chatAvatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 6,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myBubble: {
    backgroundColor: '#DCF8C6', // green
  },
  theirBubble: {
    backgroundColor: '#FFF',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
    fontFamily: fonts.primary.regular,
  },
  timestamp: {
    fontSize: 10,
    color: '#555',
    marginTop: 3,
    alignSelf: 'flex-end',
    fontFamily: fonts.primary.regular,
  },
  quickReplies: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  quickReplyButton: {
    backgroundColor: '#86b757',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  quickReplyButtonText: {
    fontSize: 13,
    color: '#fff',
    fontFamily: fonts.primary.bold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.primary.regular,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
