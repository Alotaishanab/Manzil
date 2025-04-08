// src/services/websocket/MessagingWebSocketManager.tsx
import EventEmitter from 'eventemitter3';
import { getMessagesWebSocketUrl } from '../utils/urls';
import NetInfo from '@react-native-community/netinfo';
import { Message } from '@services'; // Ensure this interface matches backend response

class MessagingWebSocketManager extends EventEmitter {
  private static instance: MessagingWebSocketManager;
  private socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private messageQueue: Message[] = [];
  private reconnectInterval: number = 5000; // in milliseconds
  private wsUrl: string;
  private isManuallyClosed: boolean = false;
  private maxQueueSize: number = 1000; // Prevent memory issues
  private token: string | null = null; // Add token property
  private reconnectTimer: any = null;

  private constructor() {
    super();
    this.wsUrl = getMessagesWebSocketUrl();

    // Monitor network status using NetInfo
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.isConnected) {
        console.log('Network is back online. Attempting to reconnect Messaging WebSocket...');
        this.connect();
      }
    });

    // Start a reconnect interval to ensure the socket is connected as long as a token exists
    this.startReconnectLoop();
  }

  public static getInstance(): MessagingWebSocketManager {
    if (!MessagingWebSocketManager.instance) {
      MessagingWebSocketManager.instance = new MessagingWebSocketManager();
    }
    return MessagingWebSocketManager.instance;
  }

  // Use a recurring reconnect loop
  private startReconnectLoop() {
    if (this.reconnectTimer) return; // Avoid creating multiple timers
    this.reconnectTimer = setInterval(() => {
      if (this.token && (!this.socket || this.socket.readyState !== WebSocket.OPEN)) {
        console.log('Reconnect loop: attempting to connect Messaging WebSocket...');
        this.connect();
      }
    }, this.reconnectInterval);
  }

  // Clear the reconnect loop if needed
  private stopReconnectLoop() {
    if (this.reconnectTimer) {
      clearInterval(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  // Set token method
  public setToken(token: string | null): void {
    this.token = token;
    if (this.token) {
      this.isManuallyClosed = false;
      this.connect();
    } else {
      this.close(); // Close connection if token is removed
    }
  }

  // Establish WebSocket connection
  public connect(): void {
    // Prevent multiple connections if already open or connecting
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.log('Messaging WebSocket is already connected or connecting.');
      return;
    }

    if (!this.token) {
      console.log('No token available. Messaging WebSocket will not connect.');
      return;
    }

    try {
      const finalWsUrl = `${this.wsUrl}?token=${encodeURIComponent(this.token)}`;
      console.log(`Connecting to Messaging WebSocket URL: ${finalWsUrl}`);
      this.socket = new WebSocket(finalWsUrl);

      this.socket.onopen = () => {
        console.log('Messaging WebSocket connected');
        this.isConnected = true;
        this.flushQueue();
        this.emit('open');
      };

      this.socket.onmessage = (event) => {
        console.log('Messaging WebSocket message received:', event.data);
        const data = JSON.parse(event.data);
        if (data.message) {
          this.emit('new_message', data.message as Message);
        }
        this.emit('message', data);
      };

      this.socket.onclose = (event) => {
        console.log(`Messaging WebSocket closed: ${event.reason}`);
        this.isConnected = false;
        this.emit('close', event.reason);
        // If not manually closed and token exists, the reconnect loop (setInterval) will call connect()
      };

      this.socket.onerror = (error) => {
        console.error('Messaging WebSocket error:', error.message);
      };
    } catch (error) {
      console.error('Error establishing Messaging WebSocket connection:', error);
      // The reconnect loop will try again after the interval
    }
  }

  public async send(message: Message): Promise<void> {
    if (this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending Messaging WebSocket message:', error);
        this.queueMessage(message);
      }
    } else {
      console.log('Messaging WebSocket not connected. Queueing message.');
      this.queueMessage(message);
    }
  }

  private queueMessage(message: Message): void {
    if (this.messageQueue.length < this.maxQueueSize) {
      this.messageQueue.push(message);
    } else {
      console.warn('Messaging queue is full. Dropping message:', message);
    }
  }

  private flushQueue(): void {
    while (this.messageQueue.length > 0 && this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
      const message = this.messageQueue.shift();
      if (message) {
        try {
          this.socket.send(JSON.stringify(message));
        } catch (error) {
          console.error('Error flushing Messaging WebSocket queue:', error);
          this.messageQueue.unshift(message);
          break;
        }
      }
    }
  }

  public close(): void {
    this.isManuallyClosed = true;
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default MessagingWebSocketManager.getInstance();
