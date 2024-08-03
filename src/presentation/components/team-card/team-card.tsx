 
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { icons } from "../../../utils/image-exporter";
import { Overlay } from "../overlay/overlay";
import { motion, useAnimation } from "framer-motion";
import { Whisper } from "rsuite";
import DefaultPopover from "../default-popover/default-popover";
import { ITeam } from "../../../interfaces/team/team";
import { Typewriter } from "react-simple-typewriter";

interface TeamCardProps {
  datas: ITeam;
  isActive: boolean;
  onClick: () => void;
}

export function TeamCard({ datas, isActive, onClick }: TeamCardProps) {
  const cardControls = useAnimation();
  const cardControls2 = useAnimation();

  const handleExclamationClick = async () => {
    await cardControls.start({ rotateY: 0 });
    await cardControls2.start({ rotateY: 180 });
    onClick();
  };

  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: datas.id * 0.02 }}
      animate={isActive && cardControls}
      className="bg-dark relative z-10 border border-gray-100/10 rounded-lg text-center h-[19.5rem] py-[2rem] px-3"
    >
      <Whisper
        trigger="hover"
        placement="right"
        speaker={
          <DefaultPopover
            content={`Clique nas mídias para ver mais sobre ${
              datas.name.split(" ")[0]
            }`}
          />
        }
      >
        <motion.img
          src={icons.exclamation}
          title={`Clique para ver mais sobre ${datas.name.split(" ")[0]}`}
          className="w-[1.5em] absolute top-1.5 cursor-pointer right-1.5"
          alt=""
          onClick={handleExclamationClick}
          whileHover={{ scale: 1.1 }}
        />
      </Whisper>
      <div className="relative">
        <Overlay />
        <img src={datas.picture} alt="" className="mx-auto" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-white">{datas.name}</h2>
      <span className="text-md text-secondary">{datas.role}</span>
      <br /> <br />
      <div className="z-10 flex justify-center gap-3">
        {datas.midias?.facebook?.split("/").pop() !== "nome" && (
          <a
            target="__blank"
            className="text-white transition-all hover:text-primary"
            href={datas?.midias?.facebook}
          >
            <FaFacebook className="text-xl " />
          </a>
        )}
        {datas.midias?.linkedin?.split("/").pop() !== "nome" && (
          <a
            target="__blank"
            className="text-white transition-all hover:text-primary"
            href={datas?.midias?.linkedin}
          >
            <FaLinkedinIn className="text-xl " />
          </a>
        )}
        {datas.midias?.twitter?.split("/").pop() !== "nome" && (
          <a
            target="__blank"
            className="text-white transition-all hover:text-primary"
            href={datas?.midias?.twitter}
          >
            <FaTwitter className="text-xl " />
          </a>
        )}
        {datas.midias?.instagram?.split("/").pop() !== "nome" && (
          <a
            target="__blank"
            className="text-white transition-all hover:text-primary"
            href={datas?.midias?.instagram}
          >
            <FaInstagram className="text-xl " />
          </a>
        )}
      </div>
      {isActive && (
        <motion.div
          initial={{ opacity: .8, y: 10 }}
          animate={{ opacity: 1, y: 0, rotateY: 360 }}
          exit={{ opacity: 0, y: 10, rotateY: -360 }}
          transition={{ duration: 0.1 }}
          className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center p-4 font-mono text-left text-green-400 bg-dark bg-opacity-90"
        >
          <button
            onClick={handleExclamationClick}
            className="absolute text-xl text-red-500 top-2 right-2"
          >
            <span className="text-sm">Fechar</span> X
          </button>
          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold">Sobre {datas.name}:</h3>
            <p className="animate-hacker-text">
              <Typewriter
                words={[datas.description]}
                cursor
                cursorStyle="_"
                typeSpeed={20}
              />
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
