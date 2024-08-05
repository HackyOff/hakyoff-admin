import { ActionCodeSettings } from "firebase/auth";

const BELL_EMAIL = 'no-reply@hakyoff.com',
    BELL_PASSWORD = 'H4ky0ff@2024!',
    SUPPORT_EMAIL = 'support@hakyoff.com',
    SUPPORT_PASSWORD = 'Supp0rt1@h4ky00f!',
    HOST = 'smtp.zoho.com',
    FROM_SUPPORT = 'support@hakyoff.com',
    NAME_NOREPLY = "HakyOff - Service Noitification",
    NAME_SUPPORT = "HakyOff Support",
    FROM_NO_REPLY = 'no-reply@hakyoff.com'


export const env_haky = {
    BELL_EMAIL,
    BELL_PASSWORD,
    HOST,
    FROM_NO_REPLY,
    FROM_SUPPORT,
    SUPPORT_EMAIL,
    NAME_NOREPLY,
    NAME_SUPPORT,
    SUPPORT_PASSWORD
} as const



// Defina a URL da sua página de verificação de e-mail
export const actionCodeSettings: ActionCodeSettings = {
    url: 'http://localhost/verify-email', // Altere para a URL da sua página de verificação
    handleCodeInApp: true, // Isso garante que o código de verificação será tratado dentro do aplicativo
};
