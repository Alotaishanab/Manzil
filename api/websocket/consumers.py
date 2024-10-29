# websocket/consumers.py

import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
from properties.models import PropertyView, PropertyClick, PropertyShare, Property, SavedProperties
from account.models import User

# Configure logging
logger = logging.getLogger('websocket')

class InteractionLoggingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        logger.info("WebSocket connection established.")

    async def disconnect(self, close_code):
        logger.info(f"WebSocket disconnected with code {close_code}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            logger.info(f"Received data: {data}")
        except json.JSONDecodeError:
            await self.send(text_data=json.dumps({"error": "Invalid JSON"}))
            logger.error("Invalid JSON received")
            return

        interaction_type = data.get('interaction_type')
        property_id = data.get('property_id')
        timestamp = data.get('timestamp', timezone.now().isoformat())
        extra_data = data.get('extra_data', {})
        guest_id = data.get('guest_id')

        user = self.scope['user'] if self.scope['user'].is_authenticated else None

        # Dispatch based on interaction type
        if interaction_type == 'view':
            logger.debug(f"Handling view interaction for property_id: {property_id}")
            await self.handle_view(property_id, user, guest_id, timestamp, extra_data)
        elif interaction_type == 'end_view':
            logger.debug(f"Handling end view interaction for property_id: {property_id}")
            await self.handle_end_view(property_id, user, guest_id, timestamp, extra_data)
        elif interaction_type == 'click':
            logger.debug(f"Handling click interaction for property_id: {property_id}")
            await self.handle_click(property_id, user, guest_id, timestamp, extra_data)
        elif interaction_type == 'like':
            logger.debug(f"Handling like interaction for property_id: {property_id}")
            await self.handle_like(property_id, user, guest_id, timestamp)
        elif interaction_type == 'save':
            logger.debug(f"Handling save interaction for property_id: {property_id}")
            await self.handle_save(property_id, user, guest_id, timestamp)
        elif interaction_type == 'share':
            logger.debug(f"Handling share interaction for property_id: {property_id}")
            await self.handle_share(property_id, user, guest_id, timestamp, extra_data)
        elif interaction_type == 'search':
            logger.debug("Handling search interaction")
            await self.handle_search(data, user, guest_id, timestamp)
        elif interaction_type == 'scroll':
            logger.debug("Handling scroll interaction")
            await self.handle_scroll(data, user, guest_id, timestamp)
        else:
            await self.send(text_data=json.dumps({"error": "Unknown interaction type"}))
            logger.warning(f"Unknown interaction type: {interaction_type}")

    @database_sync_to_async
    def handle_view(self, property_id, user, guest_id, timestamp, extra_data):
        logger.info(f"Logging view for property_id: {property_id}, user: {user}, guest_id: {guest_id}, timestamp: {timestamp}")
        PropertyView.objects.create(
            property_id=property_id,
            user=user,
            guest_id=guest_id,
            view_date=timestamp
        )
        # Optionally, increment view count
        property_obj = Property.objects.get(property_id=property_id)
        property_obj.increment_view_count()

    @database_sync_to_async
    def handle_end_view(self, property_id, user, guest_id, timestamp, extra_data):
        duration = extra_data.get('duration_seconds')
        if not duration:
            logger.error("Missing duration for end_view interaction")
            return

        logger.info(f"Logging end view for property_id: {property_id}, duration: {duration}, user: {user}, guest_id: {guest_id}")
        PropertyView.objects.create(
            property_id=property_id,
            user=user,
            guest_id=guest_id,
            duration_seconds=duration,
            view_date=timestamp
        )
        property_obj = Property.objects.get(property_id=property_id)
        property_obj.increment_view_count()
        property_obj.add_to_total_duration(duration)

    @database_sync_to_async
    def handle_click(self, property_id, user, guest_id, timestamp, extra_data):
        click_type = extra_data.get('click_type', 'general')
        logger.info(f"Logging click for property_id: {property_id}, click_type: {click_type}, user: {user}, guest_id: {guest_id}")
        PropertyClick.objects.create(
            property_id=property_id,
            user=user,
            guest_id=guest_id,
            click_type=click_type,
            click_date=timestamp
        )

    @database_sync_to_async
    def handle_like(self, property_id, user, guest_id, timestamp):
        logger.info(f"Logging like for property_id: {property_id}, user: {user}, guest_id: {guest_id}, timestamp: {timestamp}")
        # Implement like tracking logic
        pass  # Example: PropertyLike.objects.create(...)

    @database_sync_to_async
    def handle_save(self, property_id, user, guest_id, timestamp):
        logger.info(f"Logging save for property_id: {property_id}, user: {user}, guest_id: {guest_id}, timestamp: {timestamp}")
        SavedProperties.objects.create(
            property_id=property_id,
            user=user,
            guest_id=guest_id,
            save_date=timestamp
        )

    @database_sync_to_async
    def handle_share(self, property_id, user, guest_id, timestamp, extra_data):
        platform = extra_data.get('platform', 'unknown')
        logger.info(f"Logging share for property_id: {property_id}, platform: {platform}, user: {user}, guest_id: {guest_id}")
        PropertyShare.objects.create(
            property_id=property_id,
            user=user,
            guest_id=guest_id,
            share_date=timestamp,
            platform=platform
        )

    @database_sync_to_async
    def handle_search(self, data, user, guest_id, timestamp):
        search_query = data.get('search_query', '')
        filters = data.get('filters', {})
        logger.info(f"Logging search query: {search_query}, filters: {filters}, user: {user}, guest_id: {guest_id}")
        # Implement search tracking logic
        pass  # Example: SearchLog.objects.create(...)

    @database_sync_to_async
    def handle_scroll(self, data, user, guest_id, timestamp):
        time_diff = data.get('time_diff', 0)
        logger.info(f"Logging scroll, time spent: {time_diff}, user: {user}, guest_id: {guest_id}")
        # Implement scroll tracking logic
        pass  # Example: ScrollLog.objects.create(...)
