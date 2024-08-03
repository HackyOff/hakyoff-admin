import { motion } from "framer-motion";
import { IBenefits } from "../../../interfaces/benefits/benefits";

interface BLProps {
  datas: IBenefits;
}

export function BenefitsListComponent({ datas }: BLProps) {
  return (
    <motion.li
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: datas.id * 0.05 }}
      className="flex gap-2 my-2"
    >
      <img
        src={datas.icon}
        className="sm:w-[2em] w-[3em] h-[3rem] sm:h-[2rem]"
        alt=""
      />
      <span className="my-auto">{datas.content}</span>
    </motion.li>
  );
}
