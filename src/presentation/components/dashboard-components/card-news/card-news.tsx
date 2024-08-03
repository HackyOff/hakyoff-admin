import { FaCalendarAlt } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { DateUtils } from "../../../../utils/dateutils";
import { INews } from "../../../../utils/news-data-uils";
//import { HakyOffSquare } from "../../hakyoff-square/hakyoff-square";
import { svgs } from '@/utils/image-exporter';
import { LazyImage } from "../../lazy-image/lazy-image";
//import { StringUtils } from '@/utils/string-utils';
import { abbreviateText } from "@/utils/abreviate";

interface ICNews {
    news: INews;
}

export function CardNews({ news }: ICNews) {
    return (
        <div className="hover:scale-[1.01] me-5 gap-2 flex relative cursor-pointer transition-all">
            {/*news.new && <HakyOffSquare className="absolute rounded-lg bg-white/70 top-2 left-2" />*/}
            <LazyImage
                src={news.cover}
                alt={news.title}
                className='h-[7em] w-[12em] dark:border-white dark:border 2xl:w-full rounded-lg'
                placeholder={svgs.bg_placeholder_svg}
            />
            <div className="w-full">
                <p className="mt-0  font-semibold dark:text-white text-md pe-0 font-poppins">
                    {abbreviateText(news.short_desc, 50)}
                </p>
                <div className="flex justify-between mt-4 mb-8 dark:text-white">
                    <div className="flex gap-2 text-[9px]">
                        <FaCalendarAlt className='my-auto text-gray-600 dark:text-white' />
                        <span className="my-auto text-[10px] text-gray-600 dark:text-white">
                            {DateUtils.formatDateToPTSecond(news.date)}
                        </span>
                    </div>
                    <div  onClick={() => window.location.href = '../news/' + news.id} className="flex gap-1 my-auto text-blue-600 text-xs">
                        <span className="my-auto font-semibold dark:text-white hover:text-blue-700">Ler</span>
                        <FaArrowRightLong className='my-auto text-xs dark:text-white' />
                    </div>
                </div>
            </div>
        </div>
    );
}
