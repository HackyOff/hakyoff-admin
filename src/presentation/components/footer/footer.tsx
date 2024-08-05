import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapPin,
  FaPhone,
  FaYoutube,
} from "react-icons/fa";
import { logos } from "../../../utils/image-exporter";
import { LanguageSwitcher } from "../lang-switcher/languageSwitcher";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="contacts" className="pt-12 pb-6 text-white bg-gray-900">
      <div className="container flex flex-col items-center justify-center gap-12 sm:grid sm:grid-cols-1 md:grid-cols-4">
        <div className="text-start ">
          <img src={logos.logo_2} className="sm:w-[10em] mx-auto sm:mx-0 w-[6em]" alt="" />
          <LanguageSwitcher />
        </div>
        <div className="text-center sm:text-xs sm:text-start">
          <h3 className="mb-4 text-lg font-bold text-primary">
            {t("footer.about.title")}
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://hakyoff.com/#about"
                className="text-white transition-all cursor-pointer hover:text-primary hover:underline"
              >
                {t("footer.about.who_we_are")}
              </a>
            </li>
            <li>
              <a
                href="https://hakyoff.com/"
                className="text-white transition-all cursor-pointer hover:text-primary hover:underline"
              >
                {t("footer.about.terms_and_policy")}
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center sm:text-xs sm:text-start">
          <h3 className="mb-4 text-lg font-bold text-primary">
            {t("footer.contacts.title")}
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <FaMapPin className="mr-2" />
              {t("footer.contacts.address")}
            </li>
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              {t("footer.contacts.tel")}
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              {t("footer.contacts.email")}
            </li>
          </ul>
        </div>
        <div className="text-center sm:text-xs sm:text-start">
          <h3 className="mb-4 text-lg font-bold text-primary">
            {t("footer.social.title")}
          </h3>
          <ul className="hidden space-y-2 sm:block">
            <li>
              <a
                href="#"
                target="__blank"
                className="flex items-center footer-link"
              >
                <FaYoutube className="mr-2" />
                {t("footer.social.youtube")}
              </a>
            </li>
            <li>
              <a
                href="#"
                target="__blank"
                className="flex items-center footer-link"
              >
                <FaFacebook className="mr-2" />
                {t("footer.social.facebook")}
              </a>
            </li>
            <li>
              <a
                href="#"
                target="__blank"
                className="flex items-center footer-link"
              >
                <FaInstagram className="mr-2" />
                {t("footer.social.instagram")}
              </a>
            </li>
            <li>
              <a
                href="#"
                target="__blank"
                className="flex items-center footer-link"
              >
                <FaLinkedin className="mr-2" />
                {t("footer.social.linkedin")}
              </a>
            </li>
          </ul>
          <div className="flex justify-center sm:hidden">
            <a href="#" target="__blank" className="mr-4 footer-link">
              <FaYoutube />
            </a>
            <a href="#" target="__blank" className="mr-4 footer-link">
              <FaFacebook />
            </a>
            <a href="#" target="__blank" className="mr-4 footer-link">
              <FaInstagram />
            </a>
            <a href="#" target="__blank" className="footer-link">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={handleScrollTop}
          className="fixed p-3 text-black transition duration-300 rounded-lg shadow-lg bottom-4 right-4 bg-primary hover:bg-primary-dark"
        >
          <FaArrowUp />
        </button>
      )}

      <div className="mt-10 text-xs text-center text-secondary">
        &copy; {t("footer.copyright")}
      </div>
    </footer>
  );
}
