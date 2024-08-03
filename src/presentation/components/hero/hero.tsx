import { FaArrowRight } from "react-icons/fa";
import { Button } from "../button/button";
import { bg, icons } from "../../../utils/image-exporter";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Typewriter } from "react-simple-typewriter";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  const supportLabels = t("hero.stats.support.label", {
    returnObjects: true,
  });

  const supportLabelsArray = Array.isArray(supportLabels) ? supportLabels : [];

  const instructorLabels = t("hero.stats.instructors.label", {
    returnObjects: true,
  });

  const instructorLabelsArray = Array.isArray(instructorLabels)
    ? instructorLabels
    : [];


    const labsLabels = t("hero.stats.labs.label", { returnObjects: true });

const labsLabelsArray = Array.isArray(labsLabels) ? labsLabels : [];


  return (
    <>
      <img src={bg.bg_2} className="absolute -z-10" alt="" />

      <div className="container">
        <img src={bg.bg_hero_fundo} className="absolute opacity-[.5]" alt="" />
        <img
          src={bg.bg_hero_fundo}
          className="absolute animate-pulse-slow"
          alt=""
        />
        <div className="flex sm:h-[600px] h-auto relative 2xl:h-[800px]">
          <div className="z-10 grid items-center my-auto text-center lg:text-start lg:w-7/12">
            <div>
              <motion.h1
                viewport={{ once: true }}
                initial={{ opacity: 0, y: -90 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl font-bold text-white mt-[5rem] sm:text-8xl hacker"
              >
                <Typewriter
                  words={t("hero.title", { returnObjects: true })}
                  loop={1}
                  cursor
                  cursorStyle=""
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </motion.h1>
              <motion.p
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 90 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-2xl font-bold sm:text-4xl 2xl:text-5xl text-secondary"
              >
                <span className="text-primary hacker"> "</span>
                {t("hero.subtitle.part1")}
                <span className="text-primary hacker"> "</span>
              </motion.p>
              <motion.p
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 90 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 text-white sm:text-secondary hacker"
              >
                {t("hero.description")}
              </motion.p>
              <br />
              <div className="lg:grid flex sm:flex-row text-center justify-center 2xl:mt-[3rem] 2xl:mb-[2rem] mb-5 lg:grid-cols-3">
                <div className="flex flex-col justify-center gap-1 mx-auto my-2 text-white sm:justify-start sm:flex-row sm:mx-0">
                  <img
                    src={icons.notes}
                    className="h-[2em] mx-auto sm:mx-0 w-[2em]"
                    alt=""
                  />
                  <span className="my-auto text-2xl font-bold sm:text-3xl hacker">
                    {/*
                       {t("hero.stats.labs.count")}
  */}

                    <CountUp end={50} duration={5} />
                  </span>
                  <div>
                    <div className="flex flex-col gap-0 my-auto text-xs sm:text-sm sm:text-start sm:hacker">
                    {labsLabelsArray.map((label: string, index: number) => (
      <span key={index}>{label}</span>
    ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1 mx-auto my-2 text-white sm:justify-start sm:flex-row sm:mx-0">
                  <img
                    src={icons.user_tag}
                    className="h-[2em] mx-auto sm:mx-0 my-auto w-[2em]"
                    alt=""
                  />
                  <span className="my-auto text-2xl font-bold sm:text-3xl hacker">
                    {/*
                      {t("hero.stats.instructors.count")}
  */}
                    <CountUp end={10} duration={5} />
                  </span>
                  <div>
                    <div className="flex flex-col gap-0 my-auto text-xs sm:text-sm sm:text-start hacker">
                      {instructorLabelsArray.map(
                        (label: string, index: number) => (
                          <span key={index}>{label}</span>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-1 mx-auto my-2 text-white sm:justify-start sm:flex-row sm:mx-0">
                  <img
                    src={icons.taca}
                    className="h-[2em] mx-auto my-auto sm:mx-0 w-[2em]"
                    alt=""
                  />
                  <span className="my-auto text-2xl font-bold sm:text-3xl hacker">
                    {t("hero.stats.support.count")}
                  </span>
                  <div>
                    <div className="flex flex-col justify-start text-xs sm:text-sm sm:text-start hacker">
                      {supportLabelsArray.map(
                        (label: string, index: number) => (
                          <span key={index}>{label}</span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-10 sm:gap-6 lg:mt-1 lg:justify-start">
                <a href="/#trainings">
                  <Button
                    color={"primary"}
                    text={t("hero.buttons.explore")}
                    className="flex px-2"
                    rightIcon={FaArrowRight}
                  />
                </a>
                <a className="hidden sm:flex" href="/#about">
                  <Button
                    text={t("hero.buttons.learn_more")}
                    className="px-2"
                    rightIcon={FaArrowRight}
                  />
                </a>
              </div>
            </div>
          </div>

          <motion.img
            viewport={{ once: true }}
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src={bg.bg_hero}
            className="-z-10 opacity-[.1] absolute 2xl:top:0 2xl:bottom-auto sm:bottom-[-2rem] top-[5rem] sm:h-[25rem] h-[20rem] lg:h-[36rem] w-[30rem] -right-[8rem] lg:-right-[5rem] sm:-right-[19rem] xl:-right-[20rem] sm:w-[50rem] 2xl:w-[60rem] 2xl:h-[43rem] my-auto"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
