from django.db import models
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class MyUser(AbstractUser):
    username = models.CharField(max_length=30, unique=False)
    email = models.EmailField(max_length=255, unique=True)
    # devices = models.ManyToManyField(Devices,blank=True,related_name="user_devices")
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


stat = (
    ('online','online'),
    ('offline','offline'),
)

class Devices(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    serialid = models.CharField(max_length=80, default="NULL")
    udn = models.CharField(max_length=50,default="NULL")
    status = models.CharField(choices=stat,max_length=100,default='offline')

    def save(self, *args, **kwargs):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'status_%s' % self.user.id, {
                'type': 'send_status',
                'value': "Go"
            }
        )
        super(Devices, self).save(*args, **kwargs)



