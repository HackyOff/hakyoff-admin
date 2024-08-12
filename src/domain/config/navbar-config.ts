import { useTranslation } from "react-i18next";

export type NavProps = {
  id?: number;
  link: string;
  text: string;
};

export const RandomAlphanumeric = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

export const RANDOM_CODE = Math.floor(Math.random() * 1000000000 + 1);
export const RANDOM_CODE_10 = Math.floor(Math.random() * 10000000000 + 1);
export const RANDOM_CODE_6 = Math.floor(Math.random() * 1000000 + 1);

export const NavbarDatas = () => {
  const { t } = useTranslation();

  const data: NavProps[] = [
    { id: 2, link: "/#about", text: t("navBarContent.about") },
    { id: 3, link: "/#trainings", text: t("navBarContent.trainings") },
    { id: 4, link: "/#team", text: t("navBarContent.team") },
    { id: 5, link: "/#testimonials", text: t("navBarContent.testimonials") },
    { id: 6, link: "/#contacts", text: t("navBarContent.contacts") },
  ];

  return data;
};
