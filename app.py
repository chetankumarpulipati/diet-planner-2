from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from otp_utils import generate_otp, send_otp_email

app = Flask(__name__)
mail = Mail(app)

@app.route('/send-otp', methods=['POST'])
def send_otp():
    email = request.json['email']
    otp = generate_otp()
    send_otp_email(email, otp)
    return jsonify({'message': 'OTP sent successfully'})