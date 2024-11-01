import random
import string
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def generate_otp(length=6):
    letters_digits = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters_digits) for i in range(length))
    return result_str

def send_otp_email(to_email, otp):
    msg = MIMEMultipart()
    msg['From'] = 'Your Name <your_email@gmail.com>'
    msg['To'] = to_email
    msg['Subject'] = 'Your OTP for Verification'

    message = f"Your OTP is: {otp}"
    msg.attach(MIMEText(message, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.starttls()
        smtp.login('websterw116@gmail.com', 'chetankumar@3470')
        smtp.sendmail('websterw116@gmail.com', to_email, msg.as_string())