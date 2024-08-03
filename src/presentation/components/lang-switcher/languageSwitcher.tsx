import { useEffect, useState } from "react";

export function LanguageSwitcher() {
  const [lang, setLang] = useState<string | null>(null); // Adicionando o tipo de união string | null
  const changeLanguage = (lng: string) => {
    localStorage.setItem("lang", lng);
    window.location.reload();
  };

  useEffect(() => {
    const lng = localStorage.getItem("lang");
    setLang(lng);
  }, []);

  return (
    <div className="w-[9rem] justify-center  py-2 flex sm:justify-start   mt-6   rounded-full  text-xl font-bold md:bg-transparent  ">
      <button
        className={` ${
          lang == "pt" ? " bg-primary/20   rounded-sm text-white" : ""
        } px-2`}
        onClick={() => changeLanguage("pt")}
      >
        <img
          className="w-[1em] sm:w-[1.5em]"
          src="https://img.icons8.com/?size=100&id=20384&format=png&color=000000"
          alt=""
        />
      </button>
      <button
        className={` ${
          lang == "en" ? "  bg-primary/20   rounded-sm " : " "
        } px-2`}
        onClick={() => changeLanguage("en")}
      >
        <img
          className="w-[1em] sm:w-[1.5em]"
          src={
            "https://img.icons8.com/?size=100&id=15534&format=png&color=000000"
          }
          alt=""
        />
      </button>
    </div>
  );
}
