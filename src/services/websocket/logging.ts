// src/services/logging.ts

import WebSocketManager from './webSocketManager';

// Define interaction types
export type InteractionType =
  | 'view'
  | 'end_view'
  | 'click'
  | 'like'
  | 'save'
  | 'share'
  | 'search'
  | 'scroll';

// Define the structure of log event options
interface LogEventOptions {
  interactionType: InteractionType;
  propertyId?: number | string;
  extraData?: Record<string, any>;
}

// Define the structure of interaction events (optional if reused)
interface InteractionEvent {
  interaction_type: InteractionType;
  property_id?: number | string;
  timestamp: string;
  extra_data?: Record<string, any>;
  guest_id?: string;
}

// Logging function
export const logEvent = async ({
  interactionType,
  propertyId,
  extraData = {},
}: LogEventOptions) => {
  const event: InteractionEvent = {
    interaction_type: interactionType,
    property_id: propertyId,
    timestamp: new Date().toISOString(),
    extra_data: extraData,
    // guest_id is handled via WebSocket URL query parameter
  };
  await WebSocketManager.send(event);
};
