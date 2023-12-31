const twilio = require('twilio');

const accountSid = 'your-twilio-account-sid';
const authToken = 'your-twilio-auth-token';
const twilioPhoneNumber = 'your-twilio-phone-number';
const client = twilio(accountSid, authToken);
async function sendOtpToUser(phone, otp) {
    try {
      const message = await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: twilioPhoneNumber,
        to: phone,
      });
      console.log(`OTP sent to ${phone} with SID: ${message.sid}`);
    } catch (error) {
      console.error(`Error sending OTP to ${phone}:`, error.message);
      throw error;
    }
  }
  
  module.exports = { sendOtpToUser };