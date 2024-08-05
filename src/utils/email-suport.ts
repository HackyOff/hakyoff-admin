import { env_haky } from '@/domain/config/env';
import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  host: env_haky.HOST,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: env_haky.SUPPORT_EMAIL,
    pass: env_haky.SUPPORT_PASSWORD,
  },
});

export const sendEmailNoReply = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: env_haky.FROM_SUPPORT,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};