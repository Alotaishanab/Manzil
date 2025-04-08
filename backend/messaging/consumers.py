# messaging/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Message
from .serializers import MessageSerializer

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if user.is_anonymous:
            print("Unauthenticated user attempted to connect via WebSocket.")
            await self.close()
        else:
            self.user = user
            self.group_name = f"user_{self.user.user_id}"

            # Join user's group
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )

            await self.accept()
            print(f"WebSocket connected: {self.channel_name} to group {self.group_name}")

    async def disconnect(self, close_code):
        if hasattr(self, 'group_name'):
            # Leave user's group
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )
            print(f"WebSocket disconnected: {self.channel_name} from group {self.group_name}")
        else:
            print("WebSocket disconnected without a group name.")

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message_body = data.get('message')
        receiver_id = data.get('receiver_id')

        # Validate input
        if not message_body or not receiver_id:
            await self.send(text_data=json.dumps({'error': 'Invalid message data.'}))
            return

        # Prevent self chats (FIXED BUG HERE)
        if receiver_id == str(self.user.user_id):  # Compare as strings
            await self.send(text_data=json.dumps({'error': 'Self chats are not allowed.'}))
            return

        # Save the message to the database
        message = await self.create_message(self.user.user_id, receiver_id, message_body)
        
        # Serialize the message
        serialized_message = MessageSerializer(message).data

        # Send message to receiver's group
        receiver_group = f"user_{receiver_id}"
        await self.channel_layer.group_send(
            receiver_group,
            {
                'type': 'chat_message',
                'message': serialized_message
            }
        )


    # Receive message from receiver's group
    async def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        await self.send(text_data=json.dumps(message))

    @database_sync_to_async
    def create_message(self, sender_id, receiver_id, body):
        sender = User.objects.get(user_id=sender_id)
        receiver = User.objects.get(user_id=receiver_id)
        return Message.objects.create(sender=sender, receiver=receiver, body=body)
