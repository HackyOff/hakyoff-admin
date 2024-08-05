import { useState } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { HackerEffectText } from "@nekzus/react-hacker-effect";
import { icons, logos } from "../../../utils/image-exporter";
import { NavBarContentProps } from "../navbar/navbar";
import { useTranslation } from "react-i18next";
import { NavbarDatas } from "../../../domain/config/navbar-config";

export function NavBarContent({
  activeLink,
  onLinkClick,
  setShowConsult,
}: NavBarContentProps) {
  const { t } = useTranslation();
  const navData = NavbarDatas();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [academy, setShowAcademy] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container px-3 pb-1 mx-auto lg:p-1">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="flex justify-between w-full lg:w-auto">
          <div className="logo">
            <img src={logos.logo_2} className="w-[10em] my-auto" alt="Logo" />
          </div>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="my-auto text-2xl text-white"
            >
              {isMenuOpen ? (
                <FaTimes className="mt-[1rem]" />
              ) : (
                <img src={icons.burger} className="w-[2em] my-auto" alt="Menu" />
              )}
            </button>
          </div>
        </div>
        <div className={`hidden lg:flex my-auto gap-5 ${isMenuOpen ? "flex" : "hidden"} lg:flex`}>
          {navData.map((nav, index) => (
            <a
              className={`nav-link ${activeLink === nav.link ? "active-nav" : ""}`}
              href={nav.link}
              key={index}
              onClick={() => onLinkClick(nav.link)}
            >
              <HackerEffectText initialValue={nav.text}>
                <span>{nav.text}</span>
              </HackerEffectText>
            </a>
          ))}
        </div>
        <div className={`flex-col lg:flex-row lg:flex w-full lg:w-auto gap-4 flex`}>
          <div className={`flex-col w-full pt-6 px-2 justify-start lg:hidden my-auto gap-5 ${isMenuOpen ? "flex" : "hidden"} lg:flex`}>
            {navData.map((nav, index) => (
              <a
                className={`nav-link ${activeLink === nav.link ? "active-nav" : ""}`}
                href={nav.link}
                key={index}
                onClick={() => onLinkClick(nav.link)}
              >
                <HackerEffectText initialValue={nav.text}>
                  <span>{nav.text}</span>
                </HackerEffectText>
              </a>
            ))}
          </div>
          <div className={`flex-col px-2 lg:px-0 lg:flex-row lg:flex gap-4 ${isMenuOpen ? "flex" : "hidden"} lg:flex`}>
            <button
              onClick={() => setShowConsult(true)}
              className="flex justify-center gap-3 px-4 py-2 my-auto text-sm font-medium transition-all bg-white rounded-md hover:bg-white/90"
            >
              {t("navBarContent.consultCertification")} <FaArrowRight className="my-auto" />
            </button>
            <button
              onClick={() => setShowAcademy(!academy)}
              className={`flex justify-center gap-3 px-4 py-2 my-auto font-medium transition-all rounded-md ${academy ? "text-lg" : "bg-primary text-sm"} hover:bg-primary/90`}
            >
              {academy ? (
                <h1 className="mx-10 font-bold text-white sm:mx-0 glitch hacker" data-text={t("navBarContent.comingSoon")}>
                  {t("navBarContent.comingSoon")}
                </h1>
              ) : (
                <>
                  {t("navBarContent.academy")} <FaArrowRight className="my-auto" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
