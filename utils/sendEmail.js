import transporter from '../config/mailer.js';
import { EMAIL_USER } from '../config/env.js';


module.exports = async (to, subject, text) => {
  await transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    html // ✅ use HTML instead of text
  });
};