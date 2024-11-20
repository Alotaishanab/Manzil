# analytics/consumers.py

import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
from django.db import transaction
from django.db.models import F
from properties.models import (
    PropertyView, PropertyClick, PropertyShare, Property, SavedProperties, PropertyInquiry,
    SearchLog, ScrollLog
)
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
import jwt

# Configure logging
logger = logging.getLogger('websocket')

class InteractionLoggingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if user.is_authenticated:
            await self.accept()
            logger.info(f"WebSocket connection established for user: {user.email}")
        else:
            await self.close()
            logger.warning("WebSocket connection rejected due to invalid authentication.")

    async def disconnect(self, close_code):
        user = self.scope.get('user', None)
        if user and user.is_authenticated:
            logger.info(f"WebSocket disconnected for user: {user.email} with code {close_code}")
        else:
            logger.info(f"WebSocket disconnected for anonymous user with code {close_code}")

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
        handler_method = {
            'view': self.handle_view,
            'end_view': self.handle_end_view,
            'click': self.handle_click,
            'save': self.handle_save,
            'share': self.handle_share,
            'search': self.handle_search,
            'scroll': self.handle_scroll,
        }.get(interaction_type, None)

        if handler_method:
            try:
                if interaction_type in ['search', 'scroll']:
                    await handler_method(data, user, guest_id, timestamp)
                elif interaction_type in ['end_view', 'share']:
                    await handler_method(property_id, user, guest_id, timestamp, extra_data)
                elif interaction_type in ['view', 'click']:
                    await handler_method(property_id, user, guest_id, timestamp, extra_data)
                elif interaction_type == 'save':
                    await handler_method(property_id, user, guest_id, timestamp)
                else:
                    # Adjust as needed for other interactions
                    await handler_method(property_id, user, guest_id, timestamp, extra_data)
            except Exception as e:
                logger.error(f"Error handling {interaction_type} interaction: {e}")
                await self.send(text_data=json.dumps({"error": f"Failed to process {interaction_type} interaction"}))
        else:
            await self.send(text_data=json.dumps({"error": "Unknown interaction type"}))
            logger.warning(f"Unknown interaction type: {interaction_type}")

    @database_sync_to_async
    def handle_view(self, property_id, user, guest_id, timestamp, extra_data):
        try:
            logger.info(f"Logging view for property_id: {property_id}, user: {user}, guest_id: {guest_id}, timestamp: {timestamp}")
            with transaction.atomic():
                PropertyView.objects.create(
                    property_id=property_id,
                    user=user,
                    guest_id=guest_id,
                    view_date=timestamp
                )
                # Increment view count atomically
                Property.objects.filter(property_id=property_id).update(view_count=F('view_count') + 1)
        except Exception as e:
            logger.error(f"Error in handle_view: {e}")

    @database_sync_to_async
    def handle_end_view(self, property_id, user, guest_id, timestamp, extra_data):
        try:
            duration = extra_data.get('duration_seconds')
            if not duration:
                logger.error("Missing duration for end_view interaction")
                return

            logger.info(f"Logging end view for property_id: {property_id}, duration: {duration}, user: {user}, guest_id: {guest_id}")
            with transaction.atomic():
                PropertyView.objects.create(
                    property_id=property_id,
                    user=user,
                    guest_id=guest_id,
                    duration_seconds=duration,
                    view_date=timestamp
                )
                Property.objects.filter(property_id=property_id).update(
                    view_count=F('view_count') + 1,
                    total_view_duration=F('total_view_duration') + duration
                )
        except Exception as e:
            logger.error(f"Error in handle_end_view: {e}")

    @database_sync_to_async
    def handle_click(self, property_id, user, guest_id, timestamp, extra_data):
        try:
            click_type = extra_data.get('click_type', 'general')
            logger.info(f"Logging click for property_id: {property_id}, click_type: {click_type}, user: {user}, guest_id: {guest_id}")
            PropertyClick.objects.create(
                property_id=property_id,
                user=user,
                guest_id=guest_id,
                click_type=click_type,
                click_date=timestamp
            )
        except Exception as e:
            logger.error(f"Error in handle_click: {e}")

    @database_sync_to_async
    def handle_save(self, property_id, user, guest_id, timestamp):
        try:
            logger.info(f"Logging save for property_id: {property_id}, user: {user}, guest_id: {guest_id}, timestamp: {timestamp}")
            SavedProperties.objects.create(
                property_id=property_id,
                user=user,
                guest_id=guest_id,
                save_date=timestamp
            )
        except Exception as e:
            logger.error(f"Error in handle_save: {e}")

    @database_sync_to_async
    def handle_share(self, property_id, user, guest_id, timestamp, extra_data):
        try:
            platform = extra_data.get('platform', 'unknown')
            logger.info(f"Logging share for property_id: {property_id}, platform: {platform}, user: {user}, guest_id: {guest_id}")
            PropertyShare.objects.create(
                property_id=property_id,
                user=user,
                guest_id=guest_id,
                share_date=timestamp,
                platform=platform
            )
        except Exception as e:
            logger.error(f"Error in handle_share: {e}")

    @database_sync_to_async
    def handle_search(self, data, user, guest_id, timestamp):
        try:
            search_query = data.get('search_query', '')
            filters = data.get('filters', {})
            logger.info(f"Logging search query: {search_query}, filters: {filters}, user: {user}, guest_id: {guest_id}")
            SearchLog.objects.create(
                user=user,
                guest_id=guest_id,
                search_query=search_query,
                filters=filters,
                search_date=timestamp
            )
        except Exception as e:
            logger.error(f"Error in handle_search: {e}")

    @database_sync_to_async
    def handle_scroll(self, data, user, guest_id, timestamp):
        try:
            time_diff = data.get('time_diff', 0)
            logger.info(f"Logging scroll, time spent: {time_diff}, user: {user}, guest_id: {guest_id}")
            ScrollLog.objects.create(
                user=user,
                guest_id=guest_id,
                time_diff=time_diff,
                scroll_date=timestamp
            )
        except Exception as e:
            logger.error(f"Error in handle_scroll: {e}")
