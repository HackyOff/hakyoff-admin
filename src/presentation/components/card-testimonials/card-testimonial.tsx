import { icons, users } from "../../../utils/image-exporter";

interface CardTestimonialProps {
  img: keyof typeof users; // Chaves válidas do objeto users
  name: string;
  role: string;
  content: string;
}

export function CardTestimonialComponent({
  img,
  name,
  role,
  content,
}: CardTestimonialProps) {
  return (
    <div className="">
      <div className="text-white p-4  w-[18rem] testimonial">
        {/* Se necessário, ajuste essa parte de acordo com a estrutura de icons */}
        <img src={icons.apos} className="w-[2em]" alt="" />
        <p className="mt-3 text-secondary">{content}</p>
        <div className="flex gap-3 mt-3">
          <img src={users[img]} className="w-[2.5em] h-[2.5em] rounded-full" alt={img} />
          <div>
            <h2 className="text-sm font-bold">{name}</h2>
            <p className="text-xs text-secondary">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
