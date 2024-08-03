
import { sendEmailNoReply2, sendEmailSupport } from './email-noreply';
import { newDeviceTemplate } from './templates/alert-login-template';
import { trainingBuyTemplate } from './templates/pending-buy-template';

// Template de boas-vindas em HTML
const welcomeTemplate = (name: string) => `
  <html>
    <body>
      <h1>Welcome to HakyOff, ${name}!</h1>
      <p>Thank you for joining us HakyOffers.</p>
    </body>
  </html>
`;


const trainingApprovalTemplate = (name: string, courseTitle: string) => `
  <html>
    <body>
      <h1>Pagamento de Treinamento Aprovado</h1>
      <p>Olá ${name},</p>
      <p>Seu pagamento para o Treinamento <b>${courseTitle}</b> foi aprovado.</p>
      <p>Você já pode começar com os treinamentos.</p>
      <center><a href='mailto:support@hakyoff.com'>support@hakyoff.com</a></center>
    </body>
  </html>
`;



// Função para enviar email de boas-vindas
export const sendWelcomeEmail = async (to: string, name: string) => {
  const html = welcomeTemplate(name);
  await sendEmailNoReply2(to, 'Welcome to HakyOff!', html);
};

// Função para enviar email de novo dispositivo
export const sendNewDeviceEmail = async (to: string, name: string, device: string, time: string, ip: string) => {
  const html = newDeviceTemplate(name, device, time, ip);
  await sendEmailNoReply2(to, 'New Device Login Alert', html);
};



export const sendTrainingPurchaseConfirmationEmail = async (to: string, name: string, courseTitle: string, price: number) => {
  const html = trainingBuyTemplate(name, courseTitle, price);

  try {
    await sendEmailSupport(to, 'Compra de Treinamento Pendente', html);
    console.log('Email de confirmação enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar email de confirmação:', error);
    throw new Error('Erro ao enviar email de confirmação. Por favor, tente novamente mais tarde.');
  }
};

export const sendTrainingApprovalEmail = async (to: string, name: string, courseTitle: string) => {
  const html = trainingApprovalTemplate(name, courseTitle);

  try {
    await sendEmailSupport(to, 'Pagamento de Treinamento Aprovado', html);
    console.log('Email de aprovação enviado com sucesso.');
  } catch (error: any) {
    console.error('Erro ao enviar email de aprovação: ', error);
    throw new Error('Erro ao enviar email de aprovação. Por favor, tente novamente mais tarde.');
  }
};
