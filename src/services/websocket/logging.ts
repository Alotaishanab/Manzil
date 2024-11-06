// src/services/logging.ts

import WebSocketManager from './webSocketManager';

// Define interaction types (added 'search' and 'scroll')
export type InteractionType =
  | 'view'
  | 'end_view'
  | 'click'
  | 'save'
  | 'share'
  | 'search'
  | 'scroll';

// Define the structure of log event options
export interface LogEventOptions {
  interactionType: InteractionType;
  propertyId?: number | string;
  extraData?: Record<string, any>;
}

// Define the structure of interaction events
export interface InteractionEvent {
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
}: LogEventOptions): Promise<void> => {
  const event: InteractionEvent = {
    interaction_type: interactionType,
    property_id: propertyId,
    timestamp: new Date().toISOString(),
    extra_data: extraData,
    guest_id: await WebSocketManager.getGuestId(), // Ensure guest_id is included
  };
  await WebSocketManager.send(event);
};
