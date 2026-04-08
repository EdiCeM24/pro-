import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from './env';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,   // THIS IS EMPTY FOR NOW.
    pass: EMAIL_PASS
  }
});

export default transporter;