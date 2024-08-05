import {
  AboutUs,
  Footer,
  Hero,
  NavBar,
  NewsLetter,
  TeamComponent,
  TestimonialsSection,
  TrainingSection,
} from "../../components";
import { gifs } from "../../../utils/image-exporter";
import HackerLightEffect from "../../components/hacker-light-effect/hacker-light-effect";


export function HomePage() {
  return (
    <>
      <HackerLightEffect>
        <div className="hhidden lg:block">
          <NavBar />
          <Hero />
          <img
            src={gifs.scroll_bottom}
            alt="scroll bottom"
            className="w-[3em] mx-auto mt-[3rem] sm:-mt-[3rem] md:mt-[2vh] "
          />
          <br />
          <AboutUs />
          <br />
          <TrainingSection />
          <br />
          <TeamComponent />
          <br />
          <TestimonialsSection />
          <br />
          <NewsLetter />
          <br />
          <Footer />
        </div>
        {/*

          <div className="lghidden">
          <center className="text-white ">
            <h1 className="text-4xl mt-[45vh]">
              Não disponivel ainda para este tamanho de tela
            </h1>
          </center>
        </div>
        
          */}
      </HackerLightEffect>
    </>
  );
}
