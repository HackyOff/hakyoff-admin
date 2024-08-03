import { svgs } from "@/utils/image-exporter";

export function NotFound() {
    return (
        <div className="h-screen grid items-center place-content-center bg-[#FBBC0B]">

            <div className="text-center">
                <img src={svgs.not_found_svg} className="w-[60vh]" alt="" />
                <a href="/" className="mx-auto hover:underline hover:bg-white/90 transition-all bg-white px-6 py-3 font-semibold tracking-wider text-center">
                    Inícial
                </a>
            </div>
        </div>
    )
}