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
        # Decode the token using the secret key and algorithm
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('user_id')
        
        if not user_id:
            logger.warning("Token does not contain 'user_id'.")
            return AnonymousUser()
        
        # Try fetching the user from the database
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
    # You can add any logic you need here to handle guest users if applicable.
    # For simplicity, we'll assume all guest_ids are valid and return an AnonymousUser.
    logger.info(f"Authenticated as guest with guest_id: {guest_id}")
    return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope["query_string"].decode()
        params = parse_qs(query_string)
        token = params.get('token', [None])[0]
        guest_id = params.get('guest_id', [None])[0]

        if token:
            logger.info("Token found in query parameters.")
            user = await get_user(token)
            scope["user"] = user
        elif guest_id:
            logger.info("Guest ID found in query parameters.")
            user = await get_guest_user(guest_id)
            scope["user"] = user
        else:
            logger.warning("No token or guest ID provided in query parameters.")
            scope["user"] = AnonymousUser()

        return await super().__call__(scope, receive, send)
