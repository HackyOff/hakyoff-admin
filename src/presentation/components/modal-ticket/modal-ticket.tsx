// Modal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    isOpen: boolean;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

const modalVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: "0" },
    exit: { opacity: 0, y: "-100vh" }
};

export const Modal: React.FC<ModalProps> = ({ onClose, children, isOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed max-h-screen overflow-y-auto top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        className="w-full max-w-xl p-8 dark:bg-slate-800 dark:border border-white/50 dark:text-white bg-white rounded-lg shadow-lg"
                        variants={modalVariants}
                    >
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-1 dark:text-red-300 font-semibold text-red-700 rounded-md bg-red-300/30 click hover:text-gray-700"
                                onClick={onClose}
                            >
                                Fechar
                            </button>
                        </div>
                        <div className="mt-4">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
