// src/services/websocket/WebSocketManager.ts

import EventEmitter from 'eventemitter3';
import AsyncHelper from '../../helpers/asyncHelper'; // Correct import path
import { getWebSocketUrl } from '../utils/urls';
import NetInfo from '@react-native-community/netinfo';

// Define the structure of interaction events
interface InteractionEvent {
  interaction_type: string;
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
  public async connect() {
    try {
      const guestId = await AsyncHelper.getGuestId(); // Retrieve guest ID
      const token = await AsyncHelper.getToken(); // Retrieve token if available

      // Determine connection URL
      const finalWsUrl = token 
        ? `${this.wsUrl}?token=${token}` 
        : `${this.wsUrl}?guest_id=${guestId}`;

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
        this.socket?.close();
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
  public async send(event: InteractionEvent) {
    if (this.isConnected && this.socket) {
      this.socket.send(JSON.stringify(event));
    } else {
      console.log('WebSocket not connected. Queueing message.');
      this.messageQueue.push(event);
    }
  }

  // Flush the message queue by sending all queued messages
  private flushQueue() {
    while (this.messageQueue.length > 0 && this.isConnected && this.socket) {
      const event = this.messageQueue.shift();
      if (event) {
        this.socket.send(JSON.stringify(event));
      }
    }
  }

  // Close the WebSocket connection manually
  public close() {
    this.isManuallyClosed = true;
    this.socket?.close();
  }
}

export default WebSocketManager.getInstance();
