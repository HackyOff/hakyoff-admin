import { bg, icons } from "../../../utils/image-exporter";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import {
//  BenefitsData,
  getTranslatedBenefitsData,
} from "../../../domain/config/benefits-config";
import { BenefitsListComponent } from "../benefits-list/benefits-list";
import { HakyOffSquare } from "../hakyoff-square/hakyoff-square";
import { useState } from "react";
import { YouTubeEmbed } from "../youtube-embed/youtube-embed";
import { useTranslation } from "react-i18next";
import { IBenefits } from "../../../interfaces/benefits/benefits";

export function AboutUs() {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);

  const handlePlayClick = () => {
    setShowVideo(true);
    setPlaying(true);
  };

  const handlePauseClick = () => {
    setPlaying(false);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const objectivesItems = t("aboutUs.objectives.items", {
    returnObjects: true,
  });

  const objectivesItemsArray = Array.isArray(objectivesItems)
    ? objectivesItems
    : [];

  const visionItems = t("aboutUs.vision.items", { returnObjects: true });

  const visionItemsArray = Array.isArray(visionItems) ? visionItems : [];

  const translatedBenefitsData = getTranslatedBenefitsData(); // Chame a função para obter os benefícios traduzidos

  return (
    <>
      <section
        id="about"
        className="text-center lg:pt-[6rem] pt-[2rem] 2xl:mt-[12rem] container"
      >
        <h1
          className="mx-10 text-4xl font-bold text-white sm:mx-0 sm:text-5xl glitch 2xl:text-6xl hacker"
          data-text={t("aboutUs.title")}
        >
          {t("aboutUs.title")}
        </h1>

        <br />
        <br />
        <br />
        <div className="flex flex-col justify-center lg:flex-row md:gap-10">
          <div className="z-10 lg:w-7/12 text-start">
            <h2 className="text-4xl font-bold text-center text-white sm:text-start sm:text-5xl 2xl:text-6xl">
              HakyOff
            </h2>
            <p className="mt-4 text-justify text-secondary">
              {t("aboutUs.description")}
            </p>
            <br />
            <button className="flex mt-[3rem] mb-[1rem] sm:mb-[0rem] sm:mt-[1rem] gap-2 px-3 py-2 text-xs font-semibold rounded-md cursor-default sm:text-md bg-primary">
              <img
                src={icons.pin_btn}
                alt="pin"
                className="w-[1.5em] my-auto"
              />
              <span className="my-auto">{t("aboutUs.button")}</span>
            </button>
            <br />
            <ul className="text-white">
              {translatedBenefitsData.map((benefit: IBenefits) => (
                <BenefitsListComponent key={benefit.id} datas={benefit} />
              ))}

              {/*
{BenefitsData.map((benefit) => (
                <BenefitsListComponent key={benefit.id} datas={benefit} />
              ))}
  */}
            </ul>
          </div>
          <div className="lg:w-5/12">
            <div className="flex flex-col gap-[2rem] sm:gap-4 sm:flex-row">
              <div className="z-10 w-full">
                <div className="border sm:h-[12rem] text-start p-3 rounded-md">
                  <HakyOffSquare />
                  <b className="text-white">{t("aboutUs.objectives.title")}</b>
                  <ol className="text-sm text-white">
                    {objectivesItemsArray.map((item: string, index: number) => (
                      <li key={index} className="my-2">
                        {index + 1}. {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="z-10 w-full">
                <div className="border sm:h-[12rem] text-start p-3 rounded-md">
                  <HakyOffSquare />
                  <b className="text-white">{t("aboutUs.vision.title")}</b>
                  <ol className="text-sm text-white">
                    {visionItemsArray.map((item: string, index: number) => (
                      <li key={index} className="my-2">
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <br />
            <div className="relative video">
              <div
                className="relative videos"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {showVideo ? (
                  <YouTubeEmbed playing={playing} />
                ) : (
                  <img src={bg.bg_video} className="w-full" alt="Background" />
                )}
                <div className="absolute top-0 bottom-0 left-0 right-0"></div>
              </div>
              <div className="play-btns">
                {!showVideo && (
                  <div
                    onClick={handlePlayClick}
                    className="play cursor-pointer items-center place-content-center z-10 h-[5rem] bg-primary w-[5rem] absolute top-[40%] left-[40%] rounded-full grid"
                  >
                    <BsPlayCircle className="text-3xl hover:scale-[1.5] transition-all" />
                  </div>
                )}
                {showVideo && !playing && (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handlePlayClick}
                    className="play cursor-pointer items-center place-content-center z-10 h-[5rem] bg-primary w-[5rem] absolute top-[40%] left-[40%] rounded-full grid"
                  >
                    <BsPlayCircle className="text-3xl hover:scale-[1.5] transition-all" />
                  </div>
                )}
                {!showVideo && (
                  <div className="play items-center place-content-center hover:animate-none animate-ping h-[4rem] bg-primary w-[4rem] absolute top-[42%] left-[41.5%] rounded-full grid"></div>
                )}
                {showVideo && playing && (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handlePauseClick}
                    className={`pause cursor-pointer items-center place-content-center z-10 h-[5rem] bg-primary w-[5rem] absolute top-[40%] left-[40%] rounded-full grid transition-opacity ${
                      hover ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <BsPauseCircle className="text-3xl hover:scale-[1.5] transition-all" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
