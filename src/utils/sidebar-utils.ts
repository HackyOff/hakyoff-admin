// Definindo as rotas como constantes exportadas
export const ROUTE_DASHBOARD = "/dashboard";
export const ROUTE_VIRTUAL_LABS = "/dashboard/virtual-labs";
export const ROUTE_CTFS = "/dashboard/ctfs";
export const ROUTE_TRAININGS = "/dashboard/trainings";
export const ROUTE_MY_CERTIFICATES = "/dashboard/my-certficates";
export const ROUTE_MY_TRAININGS = "/dashboard/my-trainings";
export const ROUTE_NEWS = "/dashboard/news";
export const ROUTE_TICKETS = "/dashboard/tickets";
export const ROUTE_HACKING = "/dashboard/hacking";
export const ROUTE_SETTINGS = "/dashboard/settings";
export const ROUTE_PROFILE = "/dashboard/profile";
export const ROUTE_RESET_PASS = "/reset-password";
export const ROUTE_LOGIN = "/";
export const ROUTE_MINI_DASHBOARD = "/admin-trans";
export const ROUTE_ADD_COURSE = "/add-course";
export const ROUTE_RESET_PASS_CONFIRM = "/reset-password-confirm";



// Importando os ícones
import { IconType } from "react-icons";
import { FaFlagCheckered, FaHome } from "react-icons/fa";
import { FaTrophy, FaUser } from "react-icons/fa6";
import { IoNewspaperOutline, IoTicketSharp } from "react-icons/io5";
import { MdOutlinePlayLesson } from "react-icons/md";
import { SiHackaday, SiVirtualbox } from "react-icons/si";

// Interface do SideBar
export interface ISideBar {
  link: string;
  text: string;
  icon: IconType;
}

// Usando as constantes nas configurações do SideBarUtils
export const SideBarUtils: ISideBar[] = [
  {
    link: ROUTE_DASHBOARD,
    text: "Inicial",
    icon: FaHome,
  },
  /*
  {
    link: ROUTE_VIRTUAL_LABS,
    text: "Lab. Virtual",
    icon: SiVirtualbox,
  },
  {
    link: ROUTE_CTFS,
    text: "CTF",
    icon: FaFlagCheckered,
  },
  {
    link: ROUTE_MY_CERTIFICATES,
    text: "Meus Certificados",
    icon: FaTrophy,
  },*/
  {
    link: ROUTE_TRAININGS,
    text: "Treinamentos",
    icon: MdOutlinePlayLesson,
  },
  /*
  {
    link: ROUTE_MY_TRAININGS,
    text: "Meus Treinamentos",
    icon: MdOutlinePlayLesson,
  },*/
  {
    link: ROUTE_NEWS,
    text: "Notícias",
    icon: IoNewspaperOutline,
  },
  {
    link: ROUTE_TICKETS,
    text: "Tickets",
    icon: IoTicketSharp,
  },
  {
    link: ROUTE_HACKING,
    text: "Alunos",
    icon: FaUser,
  },
  /*
  {
    link: ROUTE_SETTINGS,
    text: "Configurações",
    icon: FaCog,
  },*/
];
