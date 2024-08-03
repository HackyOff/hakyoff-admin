
import { extra } from "../../../utils/image-exporter";

export function Preloader() {

  return (
    <div className="relative bg-black grid w-full items-center h-screen preloader-container place-content-center">

      <div className="z-10 text-center"> <img
        src={extra.loader_circle}
        className="w-[6em]  mx-auto mb-4"
        alt=""
      />
        <p className="text-2xl font-bold text-primary hacker">
          Carregando HakyOff...
        </p>
      </div>

    </div>
  );
}
