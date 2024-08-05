import { motion } from "framer-motion";
import { useState } from "react";
import { bg } from "../../../utils/image-exporter";
import { Overlay } from "../overlay/overlay";
import { InputHakyOff } from "../input/input"; 
import { Button } from "../button/button";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { handleSendNewsLetterEmail } from "@/infra/services";

export function NewsLetter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showError, setShowError] = useState(false);

  async function handleSubmit() {
    try {
      const response = await handleSendNewsLetterEmail({
        setLoading: setLoading,
        email: email,
        nome: nome,
        setSent: setSent,
      });
      console.log(response);
      setEmail("");
      setNome("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.section
      className="my-14 lg::px-[6%] container md:my-16 lg:my-24"
      initial={{ y: 70 }}
      transition={{ duration: 0.6 }}
      whileInView={{ y: 0 }}
    >
      <br />
      <div className="flex-col md:flex-row flex gap-5 lg:gap-[6rem] mx-auto">
        <div className="relative">
          <Overlay />
          <img
            src={bg.bg_newsletter}
            className="sm:w-[26em] w-[18em] mx-2 sm:mx-0"
            alt=""
          />
        </div>
        <div className="w-full gap-4 px-2 py-2">
          <div className="flex flex-col justify-center gap-6 md:gap-4 md:flex-row lg:gap-6">
            <InputHakyOff
              placeholder={t("newsletter.name_placeholder")}
              className="w-full"
              divClass={`w-full ${
                showError && nome === "" ? " border-red-500" : ""
              }`}
              value={nome}
              onChange={(e) => {
                setShowError(false);
                setNome(e.target.value);
              }}
            />
            <InputHakyOff
              placeholder={t("newsletter.email_placeholder")}
              className="w-full"
              divClass={`w-full ${
                showError && email === "" ? " border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => {
                setShowError(false);
                setEmail(e.target.value);
              }}
            />
          </div>

          <span className="text-red-300">
            {showError && t("newsletter.error_message")}
          </span>
          <Button
            isLoading={loading}
            text={t("newsletter.button_text")}
            color="primary"
            onClick={() => {
              email !== "" ? handleSubmit() : setShowError(true);
            }}
            disabled={loading}
            className="flex mt-8 click"
            rightIcon={FaArrowRight}
          />
        </div>
      </div>
      <br />
      <motion.div
        initial={{ opacity: 0, y: 90 }}
        transition={{ duration: 0.1, delay: 0.4 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {sent && (
          <div className="relative py-4 mx-auto text-sm rounded-lg bg-primary/10 px-7 text-primary md:text-xl md:w-7/12 2xl:text-2xl">
            <span
              onClick={() => setSent(false)}
              className="absolute top-0 text-2xl cursor-pointer right-5"
            >
              &times;
            </span>
            {t("newsletter.success_message")}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}
