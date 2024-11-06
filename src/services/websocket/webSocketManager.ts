// src/services/websocket/WebSocketManager.ts

import EventEmitter from 'eventemitter3';
import AsyncHelper from '../../helpers/asyncHelper'; // Ensure the correct import path
import { getWebSocketUrl } from '../utils/urls';
import NetInfo from '@react-native-community/netinfo';
import { InteractionType } from '../logging';

// Define the structure of interaction events
export interface InteractionEvent {
  interaction_type: InteractionType;
  property_id?: number | string;
  timestamp: string;
  extra_data?: Record<string, any>;
  guest_id?: string;
}

class WebSocketManager extends EventEmitter {
  private static instance: WebSocketManager;
  private socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private messageQueue: InteractionEvent[] = [];
  private reconnectInterval: number = 5000; // in milliseconds
  private wsUrl: string;
  private isManuallyClosed: boolean = false;
  private maxQueueSize: number = 1000; // Prevent memory issues

  private constructor() {
    super();
    this.wsUrl = getWebSocketUrl();

    // Monitor network status using NetInfo
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.isConnected) {
        console.log('Network is back online. Attempting to reconnect WebSocket...');
        this.connect();
      }
    });

    // Initial connection
    this.connect();
  }

  // Singleton instance getter
  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  // Establish WebSocket connection
  public async connect(): Promise<void> {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.log('WebSocket is already connected or connecting.');
      return;
    }

    try {
      const guestId = await this.getGuestId(); // Retrieve guest ID
      const token = await this.getToken(); // Retrieve token if available

      // Determine connection URL
      const finalWsUrl = token 
        ? `${this.wsUrl}?token=${encodeURIComponent(token)}` 
        : `${this.wsUrl}?guest_id=${encodeURIComponent(guestId || '')}`;

      console.log(`Connecting to WebSocket URL: ${finalWsUrl}`); // Debugging

      this.socket = new WebSocket(finalWsUrl);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.flushQueue();
        this.emit('open');
      };

      this.socket.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        // Handle incoming messages if necessary
        this.emit('message', event.data);
      };

      this.socket.onclose = (event) => {
        console.log(`WebSocket closed: ${event.reason}`);
        this.isConnected = false;
        this.emit('close', event.reason);

        if (!this.isManuallyClosed) {
          console.log(`Reconnecting in ${this.reconnectInterval / 1000} seconds...`);
          setTimeout(() => {
            console.log('Attempting to reconnect WebSocket...');
            this.connect();
          }, this.reconnectInterval);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error.message);
        // Errors are also handled by onclose, so no need to close here explicitly
      };
    } catch (error) {
      console.error('Error establishing WebSocket connection:', error);
      // Retry connection after some time
      setTimeout(() => {
        console.log('Retrying WebSocket connection...');
        this.connect();
      }, this.reconnectInterval);
    }
  }

  // Send a message through WebSocket or queue it if not connected
  public async send(event: InteractionEvent): Promise<void> {
    if (this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(event));
      } catch (error) {
        console.error('Error sending WebSocket message:', error);
        this.queueMessage(event);
      }
    } else {
      console.log('WebSocket not connected. Queueing message.');
      this.queueMessage(event);
    }
  }

  // Queue a message with size check
  private queueMessage(event: InteractionEvent): void {
    if (this.messageQueue.length < this.maxQueueSize) {
      this.messageQueue.push(event);
    } else {
      console.warn('Message queue is full. Dropping message:', event);
    }
  }

  // Flush the message queue by sending all queued messages
  private flushQueue(): void {
    while (this.messageQueue.length > 0 && this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN) {
      const event = this.messageQueue.shift();
      if (event) {
        try {
          this.socket.send(JSON.stringify(event));
        } catch (error) {
          console.error('Error flushing WebSocket queue:', error);
          // Re-queue the message if sending fails
          this.messageQueue.unshift(event);
          break; // Exit the loop to prevent infinite attempts
        }
      }
    }
  }

  // Close the WebSocket connection manually
  public close(): void {
    this.isManuallyClosed = true;
    if (this.socket) {
      this.socket.close();
    }
  }

  // Retrieve guest ID (Assuming it's stored in AsyncHelper)
  public async getGuestId(): Promise<string | undefined> {
    try {
      const guestId = await AsyncHelper.getGuestId();
      return guestId;
    } catch (error) {
      console.error('Error retrieving guest ID:', error);
      return undefined;
    }
  }

  // Retrieve token (Assuming it's stored in AsyncHelper)
  public async getToken(): Promise<string | undefined> {
    try {
      const token = await AsyncHelper.getToken();
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return undefined;
    }
  }
}

export default WebSocketManager.getInstance();
