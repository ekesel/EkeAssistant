# """
# ASGI config for ekeassistant project.

# It exposes the ASGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
# """

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ekeassistant.settings')

# application = get_asgi_application()

import os
import django
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ekeassistant.settings')
django.setup()
application = get_asgi_application()

from django.urls import path
from api.consumers import *
from api.middleware import TokenAuthMiddleware

ws_patterns = [
    path('ws/devices/<udn>/',DeviceConsumer.as_asgi()),
    path('ws/status/<id>/',StatusConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket': AllowedHostsOriginValidator(
        TokenAuthMiddleware(
            URLRouter(ws_patterns)
        )
    )
})