import EventEmitter from 'eventemitter3';
import {getLogInteractionsWebSocketUrl} from '../utils/urls';
import NetInfo from '@react-native-community/netinfo';
import {InteractionEvent} from './logging';

class LoggingWebSocketManager extends EventEmitter {
  private static instance: LoggingWebSocketManager;
  private socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private messageQueue: InteractionEvent[] = [];
  private reconnectInterval: number = 5000;
  private wsUrl: string;
  private isManuallyClosed: boolean = false;
  private maxQueueSize: number = 1000;
  private token: string | null = null;
  private guestId: string | null = null;

  private constructor() {
    super();
    this.wsUrl = getLogInteractionsWebSocketUrl();

    // Listen for network changes and reconnect when online
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.isConnected) {
        console.log(
          'Network is back online. Attempting to reconnect Log Interactions WebSocket...',
        );
        this.connect();
      }
    });
  }

  public static getInstance(): LoggingWebSocketManager {
    if (!LoggingWebSocketManager.instance) {
      LoggingWebSocketManager.instance = new LoggingWebSocketManager();
    }
    return LoggingWebSocketManager.instance;
  }

  // Set the token and handle connection attempts
  public setToken(token: string | null): void {
    this.token = token;
    if (this.token) {
      this.connect();
    } else {
      this.close(); // Close connection if no token
    }
  }

  // Update authentication state and reconnect if necessary
  public updateAuthState(token: string | null, guestId: string | null) {
    console.log('Updating WebSocket auth state:', {
      token: token ? 'present' : 'null',
      guestId,
    });

    // Only close and reconnect if token or guestId has changed
    if (this.token !== token || this.guestId !== guestId) {
      if (this.socket) {
        this.close();
      }
    }

    this.token = token;
    this.guestId = guestId;

    // Try to connect again with the updated state
    this.connect();
  }

  // Connect to the WebSocket server
  public async connect(): Promise<void> {
    // Check if token or guestId is set, but not both
    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    ) {
      console.log(
        'Log Interactions WebSocket is already connected or connecting.',
      );
      return;
    }

    // If neither token nor guestId is available, don't attempt to connect
    if (!this.token && !this.guestId) {
      console.log(
        'No token or guestId available. Log Interactions WebSocket will not connect.',
      );
      return;
    }

    // If both token and guestId are available, you can either prioritize token or guestId.
    // In this case, prioritize the token if available, otherwise use guestId.
    let finalWsUrl = this.wsUrl;
    const params = new URLSearchParams();

    if (this.token) {
      // Use token if it's available
      params.append('token', this.token);
      console.log('Using token for WebSocket connection.');
    } else if (this.guestId) {
      // Use guestId if no token is present
      params.append('guest_id', this.guestId);
      console.log('Using guest_id for WebSocket connection.');
    }

    finalWsUrl += `?${params.toString()}`;
    console.log(`Connecting to Log Interactions WebSocket URL: ${finalWsUrl}`);

    this.isManuallyClosed = false;
    this.socket = new WebSocket(finalWsUrl);

    this.socket.onopen = () => {
      console.log('Log Interactions WebSocket connected');
      this.isConnected = true;
      this.flushQueue();
      this.emit('open');
    };

    this.socket.onmessage = event => {
      console.log('Log Interactions WebSocket message received:', event.data);
      this.emit('message', event.data);
    };

    this.socket.onclose = event => {
      console.log(`Log Interactions WebSocket closed: ${event.reason}`);
      this.isConnected = false;
      this.emit('close', event.reason);

      if (!this.isManuallyClosed) {
        console.log(
          `Reconnecting Log Interactions WebSocket in ${
            this.reconnectInterval / 1000
          } seconds...`,
        );
        setTimeout(() => {
          console.log('Attempting to reconnect Log Interactions WebSocket...');
          this.connect();
        }, this.reconnectInterval);
      }
    };

    this.socket.onerror = error => {
      console.error('Log Interactions WebSocket error:', error);
    };
  }

  // Close the WebSocket connection manually
  public close(): void {
    this.isManuallyClosed = true;
    if (this.socket) {
      this.socket.close();
    }
  }

  // Flush the message queue when the WebSocket is connected
  private flushQueue(): void {
    while (
      this.messageQueue.length > 0 &&
      this.isConnected &&
      this.socket &&
      this.socket.readyState === WebSocket.OPEN
    ) {
      const message = this.messageQueue.shift();
      if (message) {
        try {
          this.socket.send(JSON.stringify(message));
        } catch (error) {
          console.error('Error sending message:', error);
          this.messageQueue.unshift(message); // Requeue the message in case of error
          break;
        }
      }
    }
  }
}

export default LoggingWebSocketManager.getInstance();
