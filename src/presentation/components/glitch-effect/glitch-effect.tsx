import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = ({ text, className }: GlitchTextProps) => {
  <motion.p className={className}>{text}</motion.p>;
};
