import React, { useEffect, useState, useContext, useRef } from 'react';
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

import { MessagingWebSocketManager } from '@services';
import { fetchChats } from '@services'; // your newly paginated fetch function

import sendIcon from '../../assets/images/send.png';
import closeIcon from '../../assets/images/close.png';
import { UserIcon } from '@svgs'; // fallback icon

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
      partnerId?: number;
      partnerName?: string;
      partnerPic?: string | null; 
      property?: Property;
    };
  },
  'ChatScreen'
>;

export const ChatScreen: React.FC = () => {
  // 1) Pull token & userId from AuthContext
  const { token, userId, userProfile } = useContext(AuthContext);
  const currentUserId = userId ? parseInt(userId, 10) : null;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // 2) Safely get route params
  const route = useRoute<ChatScreenRouteProp>();
  const { partnerId, partnerName, partnerPic, property } = route.params || {};

  // States
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  // Optional: store "my" profile picture
  const [myProfilePicture, setMyProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile?.profile_picture) {
      setMyProfilePicture(userProfile.profile_picture);
    }
  }, [userProfile]);

  // ------------------- Load page=1 messages for this partner ------------------- //
  useEffect(() => {
    // If you have a token, set it for the WS manager
    if (token) {
      MessagingWebSocketManager.setToken(token);
    }

    const loadMessages = async () => {
      try {
        if (token && partnerId) {
          // Fetch page=1 from your paginated endpoint
          const pagedData = await fetchChats(token, partnerId, undefined, 1);
          console.log('[ChatScreen] pagedData =>', pagedData); 


          // pagedData.results is an array of messages
          // Sort ascending by timestamp so older appear first
          const sorted = [...pagedData.results].sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          setMessages(sorted);
        } else {
          // No partner => new conversation
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
      // If the incoming msg belongs to this partner conversation, add it
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
            (x, y) => new Date(x.timestamp).getTime() - new Date(y.timestamp).getTime()
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

  // ------------------- Determine the actual receiver ID ------------------- //
  const receiverId = partnerId || property?.lister_id || 0;

  // ------------------- Sending a new message ------------------- //
  const sendMessage = () => {
    if (!inputText.trim()) return;
    if (!receiverId) return;

    setSending(true);

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: {
        user_id: currentUserId || 0,
        name: 'Me',
        email: '',
        phone_number: '',
        profile_picture: myProfilePicture,
      },
      receiver: { user_id: receiverId },
      body: inputText.trim(),
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

  // ------------------- Format date/time ------------------- //
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

  // ------------------- Render each message ------------------- //
  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const isMyMessage = item.sender.user_id === currentUserId;

    // Show a day header if the date changes
    let showDayHeader = false;
    if (index === 0) {
      showDayHeader = true;
    } else {
      const prevDay = new Date(messages[index - 1].timestamp).toDateString();
      const currDay = new Date(item.timestamp).toDateString();
      if (prevDay !== currDay) showDayHeader = true;
    }

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
      </>
    );
  };

  // Quick replies
  const quickReplies = ["I'm interested…", 'Price?', 'Viewing?'];
  const handleQuickReply = (txt: string) => {
    setInputText(txt);
    sendMessage();
  };

  // Partner name for header
  const finalPartnerName = partnerName || property?.lister_name || 'User';

  return (
   <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.light.primaryButton }]}>
      {/* Close Button */}
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top + 8 }]}
        onPress={() => navigation.goBack()}
      >
        <Image source={closeIcon} style={styles.closeIcon} />
      </TouchableOpacity>

      {/* Header */}
    <TouchableOpacity
      style={styles.headerContainer}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('Auth' as never, {
          screen: 'AgencyDetails',
        } as never)
      }
    >
      {partnerPic ? (
        <Image
          source={{ uri: partnerPic }}
          style={styles.headerAvatar} // define a style with proper width/height
        />
      ) : (
        <View style={styles.headerAvatarPlaceholder}>
          <UserIcon width={20} height={20} fill="#FFF" />
        </View>
      )}
      <Text style={styles.headerTitle}>{partnerName || property?.lister_name || 'User'}</Text>
    </TouchableOpacity>


      {/* Disclaimer */}
      <View style={styles.disclaimerContainer}>
        <Text style={styles.disclaimerText}>
          Manzil is not responsible for contacting outside of the platform.
        </Text>
      </View>

      {/* Messages List */}
      <View style={styles.chatContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
          />
        )}
      </View>

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
            style={[styles.iconImage, (sending || !inputText.trim()) && { opacity: 0.5 }]}
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
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    zIndex: 99,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    justifyContent: 'center',
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
    color: '#fff',
  },
  disclaimerContainer: {
    backgroundColor: '#ffe6e6',
    alignItems: 'center',
    paddingVertical: 4,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#ff0000',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8', // The main chat area background
  },
  messagesContainer: {
    paddingTop: 10,
    paddingHorizontal: 12,
    paddingBottom: 20,
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
    // small shadow
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  myBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirBubble: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
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
    color: '#666',
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
  bubbleAvatarPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickReplies: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 6,
  },
  quickReplyButton: {
    backgroundColor: Colors.light.primaryButton,
    borderRadius: 30,
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
    backgroundColor: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333',
    fontFamily: fonts.primary.regular,
  },
  iconButton: {
    marginLeft: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    // CHANGE: for a darker icon color
    tintColor: '#333',
  },
});
