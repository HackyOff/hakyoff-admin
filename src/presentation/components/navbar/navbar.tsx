import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavBarContent } from "../navbar-content/navbar-content";
import { ModalCertiication } from "../modal-certification/modal-certification";

export type NavBarContentProps = {
  activeLink: string;
  onLinkClick: (link: string) => void;
  setShowConsult: (state: boolean) => void;
  showConsult: boolean;
};

export type ModalCertProps = {
  setShowConsult: (state: boolean) => void;
  showConsult: boolean;
};

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConsult, setshowConsult] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <>
      <AnimatePresence>
        {isScrolled ? (
          <motion.div
            key="scrolled-navbar"
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className={`${
              isScrolled && "shadow-md"
            } fixed top-0 bg-dark z-50 left-0 right-0 border-b-[2px] py-3 border-sky-600`}
          >
            <NavBarContent
              showConsult={showConsult}
              setShowConsult={setshowConsult}
              activeLink={activeLink}
              onLinkClick={handleClick}
            />
          </motion.div>
        ) : (
          <div
            key="default-navbar"
            className="relative border-b-[2px] py-3 border-sky-600"
          >
            <NavBarContent
              showConsult={showConsult}
              setShowConsult={setshowConsult}
              activeLink={activeLink}
              onLinkClick={handleClick}
            />
          </div>
        )}
      </AnimatePresence>

      <ModalCertiication
        setShowConsult={setshowConsult}
        showConsult={showConsult}
      />
    </>
  );
}
