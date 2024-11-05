from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from core import settings

verify  = None


if settings.TWILIO_ACCOUNT_SID and settings.TWILIO_AUTH_TOKEN:
    client = Client(settings.TWILIO_ACCOUNT_SID,
                    settings.TWILIO_AUTH_TOKEN)
    verify = client.verify.services(settings.TWILIO_VERIFY_SERVICE_SID)


def send_code(phone):
    verify.verifications.create(to=phone, channel='sms')


def check_code(phone, code):
    try:
        result = verify.verification_checks.create(to=phone, code=code)
    except TwilioRestException:
        print('no')
        return False
    return result.status == 'approved'
