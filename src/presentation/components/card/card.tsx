/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaArrowRight } from "react-icons/fa";
import { ICard } from "../../../interfaces/card/card";
import { formatMoney } from "../../../utils/formatToMoney";
import { icons, svgs } from "../../../utils/image-exporter";
import { Button } from "../button/button";
import { abbreviateText } from "../../../utils/abreviate";
import { TeacherAvatarComponent } from "../teacher-avatar/teacher-avatar";
import { CourseDetailsTime } from "../course-detail-time/course-detail-tie";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import { ROUTE_TRAININGS } from "../../../utils/sidebar-utils";
import { LazyImage } from "../lazy-image/lazy-image";
//import CryptoJS from 'crypto-js';

export function CardComponent({ datas, dark, showDesc, showButtonSub }: ICard) {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate()

  function clickedFunc() {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 5000);
  }
  /*
    function handleOpenCourse() {
      if (!showButtonSub) {
          const encryptedId = CryptoJS.AES.encrypt(datas.id.toString(), 'hakyoff').toString();
          window.location.href =(`${ROUTE_TRAININGS}/${encryptedId}`);
      }
  }*/


  function handleOpenCourse() {
    if (!showButtonSub) {
      navigate(`${ROUTE_TRAININGS}/${datas.id}`);
    }
  }
  return (
    <>
      <div onClick={handleOpenCourse} title="Clique para abrir este curso" className="z-20 w-full cursor-pointer transition-all hover:scale-[1.005] ">
        <LazyImage
          src={datas.cover}
          alt="cover image"
          className="w-full h-[12em] rounded-lg"
          placeholder={svgs.bg_placeholder_svg}
        />
        <div className="flex mt-3 justify-between ">
          <div
            className={` rounded-lg ${datas.status == "Brevemente"
              ? "bg-primary/30 text-yellow-700 font-bold "
              : "bg-green-600/20 font-bold text-green-600"
              } flex gap-2 px-2 py-1`}
          >
            <img
              src={datas.status == "Brevemente" ? icons.secur : icons.energy}
              className="w-[1em] h-[1em] rounded-md xl:w-[1.5em] xl:h-[1.5em] my-auto"
              alt=""
            />
            <span className="my-auto  text-sm">{datas.status}</span>
          </div>
          <div className="px-2 py-1 font-bold text-yellow-700 rounded-lg bg-primary/30">
            <span className="my-auto text-sm">{formatMoney(datas.price)}</span>
          </div>
        </div>
        <div  >
          <h1 className={`text-xl dark:text-white font-bold ${!dark && 'text-white'} 2xl:text-2xl`}>
            {datas.title}
          </h1>
          {
            showDesc && <p className={` dark:text-white ${!dark && 'text-secondary'}`}>
              {abbreviateText(datas.description, 125)}
            </p>
          }
        </div>
        <div className="flex justify-between">
          <TeacherAvatarComponent
            name={datas.trainer.name}
            picture={datas.trainer.picture}
            role={datas.trainer.role}
          />

          <CourseDetailsTime
            className="text-black"
            hours={datas.hours}
            students={datas.students}
            studentsIcon={icons.people}
            timeIcon={icons.time}
          />
        </div>
        <br />

        {
          showButtonSub &&
          <>

            {!clicked ? (
              <Button
                onClick={clickedFunc}
                text="Inscrever-se"
                className={`justify-center mt-auto w-full ${dark && 'bg-black text-white'}`}
                rightIcon={FaArrowRight}
              />
            ) : (
              <center>


                <button
                  onClick={clickedFunc}
                  className={`px-4 border-2 border-white py-2 text-xl justify-center text-white transition-all gap-3 rounded-md flex  text-center font-bold    `}
                >
                  <h1
                    className={`w-full mx-10 font-bold ${dark && 'text-white'}  sm:mx-0 glitch hacker`}
                    data-text="Brevemente"
                  >
                    <Typewriter
                      words={["Brevemente"]}
                      loop={1}
                      cursor
                      cursorStyle="_"
                      typeSpeed={30}
                      deleteSpeed={30}
                      delaySpeed={1500}
                    />
                  </h1>
                </button>
              </center>
            )}</>
        }

      </div >
    </>
  );
}
