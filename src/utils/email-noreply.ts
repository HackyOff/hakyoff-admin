
import { env_haky } from "@/domain/config/env";
import axios from "axios";

/*
const transporter = nodemailer.createTransport(
  smtpTransport({
    host: env_haky.HOST,
    port: 465,
    secure: true,
    auth: {
      user: env_haky.BELL_EMAIL,
      pass: env_haky.BELL_PASSWORD,
    },
  })
);

export const sendEmailNoReply = async (
  to: string,
  subject: string,
  html: string
) => {
  const mailOptions = {
    from: env_haky.FROM_NO_REPLY,
    to,
    subject,
    html,
  };

  try {
    await new Promise<void>((resolve, reject) => {
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log(`Email sent to ${to}`);
          resolve();
        }
      });
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
*/


export const sendEmailSupport = async (
  to: string,
  subject: string,
  html: string
) => {

  await axios.post('https://api.reputacao360.online/api/enviar-email',

    {
      "to": to,
      "subject": subject,
      "body": html,
      "nameRemetent": env_haky.NAME_SUPPORT,
      "smtp": {
        "host": env_haky.HOST,
        "port": 465
      },
      "email": env_haky.SUPPORT_EMAIL,
      "password": env_haky.SUPPORT_PASSWORD,
      "emailFrom": env_haky.FROM_SUPPORT,
      "key": "Angola2020*"
    }

  )

 // console.log(da)


} 



export const sendEmailNoReply2 = async (
  to: string,
  subject: string,
  html: string
) => {

  await axios.post('https://api.reputacao360.online/api/enviar-email',

    {
      "to": to,
      "subject": subject,
      "body": html,
      "nameRemetent": env_haky.NAME_NOREPLY,
      "smtp": {
        "host": env_haky.HOST,
        "port": 465
      },
      "email": env_haky.BELL_EMAIL,
      "password": env_haky.BELL_PASSWORD,
      "emailFrom": env_haky.FROM_NO_REPLY,
      "key": "Angola2020*"
    }

  )

 // console.log(da)


} 