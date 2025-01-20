# core/middleware.py

import jwt
import logging
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.conf import settings
from django.contrib.auth import get_user_model
from urllib.parse import parse_qs

logger = logging.getLogger('websocket')
User = get_user_model()

@database_sync_to_async
def get_user(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('user_id')
        if not user_id:
            logger.warning("Token does not contain 'user_id'.")
            return AnonymousUser()
        user = User.objects.get(user_id=user_id)
        logger.info(f"Authenticated user: {user.email}")
        return user
    except jwt.ExpiredSignatureError:
        logger.warning("Token expired.")
        return AnonymousUser()
    except jwt.DecodeError as e:
        logger.warning(f"Token decode error: {str(e)}")
        return AnonymousUser()
    except User.DoesNotExist:
        logger.warning(f"User with user_id {user_id} does not exist.")
        return AnonymousUser()

@database_sync_to_async
def get_guest_user(guest_id):
    # In a real-world scenario, you might validate the guest_id format
    # or perform additional logic. Here we just log and return AnonymousUser.
    logger.info(f"Authenticated as guest with guest_id: {guest_id}")
    return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Make a shallow copy so we don't lose channel_layer
        new_scope = dict(scope)

        query_string = scope["query_string"].decode()
        params = parse_qs(query_string)
        token = params.get('token', [None])[0]
        guest_id = params.get('guest_id', [None])[0]

        if token:
            user = await get_user(token)
            new_scope["user"] = user
            new_scope["auth_type"] = "user"
        elif guest_id:
            new_scope["user"] = AnonymousUser()
            new_scope["guest_id"] = guest_id
            new_scope["auth_type"] = "guest"
        else:
            new_scope["user"] = AnonymousUser()

        # If the original scope had a channel_layer, keep it
        if "channel_layer" not in new_scope:
            new_scope["channel_layer"] = scope.get("channel_layer")

        return await super().__call__(new_scope, receive, send)
