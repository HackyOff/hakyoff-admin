// Dentro do componente TestimonialsSection

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CardTestimonialComponent } from "../card-testimonials/card-testimonial";
import { settings } from "../../../constants-config/slide-carousel-config";
import { useTranslation } from "react-i18next";
import { ITestimonials } from "../../../interfaces/testimonials/testimonials";
import { users } from "../../../utils/image-exporter";

export function TestimonialsSection() {
  const { t } = useTranslation();

  // Obtendo os depoimentos traduzidos do arquivo JSON de idiomas
  const testimonialsData: ITestimonials[] = t("testimonialsData", {
    returnObjects: true,
  });

  return (
    <section
      id="testimonials"
      className="container pb-2 pt-[6rem] slider-container"
    >
      <center>
        <h1
          className="text-4xl font-bold text-white sm:text-5xl glitch 2xl:text-6xl hacker"
          data-text={t("testimonials.title")}
        >
          {t("testimonials.title")}
        </h1>
      </center>
      <br />
      <br />
      <br />
      <Slider {...settings}>
        {testimonialsData.map((testimonial: ITestimonials, index: number) => (
          <div key={index}>
            <CardTestimonialComponent
              img={testimonial.img as keyof typeof users}
              role={testimonial.role}
              name={testimonial.name}
              content={testimonial.content}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
