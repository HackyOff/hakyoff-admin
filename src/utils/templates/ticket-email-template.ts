import { DateUtils } from "../dateutils";

// Template de status do ticket em HTML
export const ticketEmailTemplate = (ticketCode: number, status: string, message: string) => `
  <div>
    <h1>Ticket Nº ${ticketCode} - ${status}</h1>
    <p>${message}</p>
    <p>Em caso de qualquer outra dúvida, contactar o <a href="mailto:support@hakyoff.com">support@hakyoff.com</a></p>
 
    <p>Data: ${DateUtils.formatDateTimeToPTT(new Date)}</p>

    </div>
`;

