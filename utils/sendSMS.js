import axios from 'axios';

export const sendSMS = async (to, message) => {
  try {
    await axios.post('https://api.termii.com/api/sms/send', {
      to,
      from: 'E-Shop',
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: process.env.TERMII_API_KEY
    });
  } catch (err) {
    console.error(err.message);
  }
};