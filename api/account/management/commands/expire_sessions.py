from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from account.models import UserSession

class Command(BaseCommand):
    help = 'Expires sessions that have not received a heartbeat within the timeout period.'

    def handle(self, *args, **options):
        timeout_period = timedelta(minutes=1)  # Adjust the timeout period as needed
        cutoff_time = timezone.now() - timeout_period

        sessions_to_expire = UserSession.objects.filter(
            end_time__isnull=True,
            last_heartbeat__lt=cutoff_time
        )

        for session in sessions_to_expire:
            session.end_session()
            self.stdout.write(self.style.SUCCESS(
                f'Session {session.session_id} expired due to inactivity.'
            ))