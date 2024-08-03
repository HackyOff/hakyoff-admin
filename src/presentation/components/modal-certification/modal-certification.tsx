import { useState } from "react";
import {
  FaArrowRight,
  FaSpinner,
  FaDownload,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { icons, logos } from "../../../utils/image-exporter";
import { HakyModalDefault } from "../haky-modal-default/hacky-modal-default";
import { HakyOffSquare } from "../hakyoff-square/hakyoff-square";
import { ModalCertProps } from "../navbar/navbar";
import { Button } from "..";
import { useTranslation } from "react-i18next"; // Importing translation hook

export function ModalCertiication({
  setShowConsult,
  showConsult,
}: ModalCertProps) {
  const { t } = useTranslation(); // Translation hook

  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [found, setFound] = useState(false);
  const [ref, setRef] = useState("");

  const [showError, setShowError] = useState(false);

  function Searchcertificate() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowMessage(true);
      if (ref !== "001HAK-Y2024") {
        setFound(false);
      } else {
        setFound(true);
      }
    }, 6000);
  }

  return (
    <>
      <HakyModalDefault
        bgDefault={true}
        className="lg:w-[60rem] p-5 sm:p-10 sm:w-[45rem] lg:h-[36rem] h-screen sm:h-[40rem]"
        shadowDeault={true}
        setShow={setShowConsult}
        show={showConsult}
      >
        <div className="">
          <HakyOffSquare />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white hacker ">
          {t("modal.title")}
        </h2>
        <p className="text-secondary"> {t("modal.description")}</p>
        <br />
        <b className="text-white"> {t("modal.insert_reference")}</b>
        <div className="flex flex-col gap-3 sm:flex-row lg:gap-6">
          <div
            className={`border-2 my-auto sm:w-[100%]    lg:w-[180%] py-1 mt-4 rounded-md px-3 flex gap-3 ${
              showError ? "border-red-500 bg-red-500/5" : "border-white"
            } `}
          >
            <img src={icons.notes} className="w-[2em] h-[2em] my-auto" alt="" />
            <input
              type="text"
              readOnly={found}
              placeholder={t("modal.placeholder")}
              onChange={(e) => {
                setShowError(false);
                setRef(e.target.value);
              }}
              className="w-full py-2 text-white bg-transparent border-none outline-none hacker"
            />
          </div>
          <div className="sm:w-[7.9rem] my-auto  lg:w-[17rem]">
            <Button
              text={t("modal.consult_button")}
              color="primary"
              disabled={found}
              onClick={() => {
                ref !== "" ? Searchcertificate() : setShowError(true);
              }}
              className="mt-[.5rem] w-full text-lg lg:hidden sm:py-4 py-2 text-center justify-center click sm:text-sm"
            />
            <Button
              text={t("modal.consult_button")}
              color="primary"
              disabled={found}
              onClick={() => {
                ref !== "" ? Searchcertificate() : setShowError(true);
              }}
              className="mt-[1rem] lg:flex hidden py-4 click text-sm"
              rightIcon={FaArrowRight}
            />
          </div>
        </div>
        <br />
        {loading && (
          <center className="mt-[3rem]">
            <FaSpinner className="text-3xl text-white animate-spin" />
            <span className="text-sm text-white">
            {t("modal.searching")}
              <Typewriter
                words={["...", "..."]}
                loop={15}
                cursor
                cursorStyle="."
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={700}
              />
            </span>
          </center>
        )}

        {showMessage && !loading && ref !== "" && (
          <>
            {found ? (
              <>
                <div className="relative">
                  <span
                    onClick={() => {
                      setShowMessage(false);
                      setFound(false);
                    }}
                    className="absolute top-0 z-10 grid items-center px-2 text-2xl rounded-md cursor-pointer sm:bg-transparent bg-primary/30 text-primary right-5"
                  >
                    &times;
                  </span>
                  <div className="relative flex">
                    <div className="w-full">
                      <h1 className="flex gap-3">
                        <FaCheckCircle className="text-green 400 " />
                        <span className="text-lg font-semibold text-white sm:text-2xl">
                          {t("modal.certificate_found.title")}
                        </span>
                      </h1>
                      <h2 className="text-primary font-bold text-lg mt-[1rem]">
                        {t("modal.certificate_found.reference")}
                        <span className="underline"> {ref}</span>{" "}
                      </h2>{" "}
                      <h3 className="mt-2 mb-2 text-lg font-semibold text-white">
                        {t("modal.certificate_found.student_info")}
                      </h3>
                      <h3 className="flex justify-between gap-3 sm:justify-start">
                        <span className="text-secondary hacker">
                          {" "}
                          {t("modal.certificate_found.student_name")}
                        </span>
                        <span className="font-bold text-white sm:text-start text-end hacker">
                          João Afonso Katombela
                        </span>
                      </h3>
                      <h3 className="flex justify-between gap-3 sm:justify-start">
                        <span className="text-secondary hacker">
                          {" "}
                          {t("modal.certificate_found.training")}
                        </span>
                        <span className="font-bold text-white sm:text-start text-end hacker">
                          Pentest Intermediate level
                        </span>
                      </h3>
                      <h3 className="flex justify-between gap-3 sm:justify-start">
                        <span className="text-secondary hacker">
                          {" "}
                          {t("modal.certificate_found.issued_on")}
                        </span>
                        <span className="font-bold text-white sm:text-start text-end hacker">
                          25 de May, 2024
                        </span>
                      </h3>
                      <br />
                      <Button
                        rightIcon={FaDownload}
                        color="primary"
                        className="text-sm"
                        text={t("modal.certificate_found.download_certificate")}
                      />
                    </div>
                    <img
                      src={logos.logo_2}
                      className="w-[40em] absolute top-[20%] right-[0%] my-auto -z-10 opacity-[.07]"
                      alt=""
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="relative mt-[2rem]  text-center font-semibold border border-orange-200/20 bg-orange-400/10 px-7 py-4 mx-auto text-xs text-orange-700 rounded-lg md:text-sm md:w-7/12 2xl:text-xl">
                <span
                  onClick={() => setShowMessage(false)}
                  className="absolute top-0 text-2xl cursor-pointer right-5"
                >
                  &times;
                </span>
                <FaExclamationTriangle className="mx-auto mb-3 text-xl" />
                {t("modal.no_certificate_found")}{" "}
                <b className="text-orange-800">{ref}</b>, {t("modal.try_again")}
              </div>
            )}
          </>
        )}
      </HakyModalDefault>
    </>
  );
}
