import axios from 'axios';
import { TERMII_API_KEY, BAES_URL } from '../config/env';

export const sendSMS = async (to, message) => {
  try {
    await axios.post('https://v3.api.termii.com/api/sms/send', {
      to,
      from: 'E-Shop',
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: TERMII_API_KEY
    });
  } catch (err) {
    console.error(err.message);
  }
};