import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  setShow: (show: boolean) => void;
  show: boolean;
  children: React.ReactNode;
  className?: string;
  bgDefault?: boolean;
  shadowDeault?: boolean;
}

export const HakyModalDefault: React.FC<ModalProps> = ({
  className,
  setShow,
  show,
  shadowDeault,
  bgDefault,
  children,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="modall">
          <div className="fixed top-0 grid w-screen h-screen place-content-center z-100">
            <motion.div
              onClick={() => setShow(false)}
              className="absolute top-0 bottom-0 left-0 right-0 bg-dark/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
              transition={{ duration: 0.4 }}
              className={`${className} relative rounded-md ${
                shadowDeault && "shadow shadow-primary"
              }   z-20 ${bgDefault && "bg-[#0D0F13]"}`}
            >
              <div
                title="Fechar"
                onClick={() => setShow(false)}
                className="absolute p-2 rounded-lg cursor-pointer z-100 bg-primary/30 click sm:right-6 right-4 top-4 sm:top-6"
              >
                <FaTimes className="text-primary" />
              </div>
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
