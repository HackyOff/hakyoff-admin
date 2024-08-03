import { motion } from "framer-motion";
import { TrainingsData } from "../../../domain/config/trainings-config";
import { CardComponent } from "../card/card";
import { useTranslation } from "react-i18next";

export function TrainingSection() {
  const { t } = useTranslation();

  return (
    <>
      <section
        id="trainings"
        className="container z-10 2xl:pt-[10rem] lg:pt-[5rem] pt-[8rem]"
      >
        <center>
          <h1
            className="text-4xl font-bold text-white lg:text-5xl glitch 2xl:text-6xl hacker"
            data-text={t("trainingSection.title")}
          >
            {t("trainingSection.title")}
          </h1>
        </center>
        <div className="grid static z-20 mt-[5rem] lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 sm:gap-[1.5rem] gap-[2.5rem]">
          {TrainingsData.map((train, index) => (
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={train.id}
            >
              <CardComponent datas={train} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
