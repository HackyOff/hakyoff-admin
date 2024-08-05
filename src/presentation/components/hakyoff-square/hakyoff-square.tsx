import { icons } from "../../../utils/image-exporter";
import { Overlay } from "../overlay/overlay";
interface s {
  className?: string
}
export function HakyOffSquare({ className }: s) {
  return (
    <div className={className}>
      <p className="flex w-[7rem]   relative py-1 px-2 bg-primary/40 rounded-md   text-green-500 dark:text-green-500 font-bold gap-2">
        <Overlay />
        <img src={icons.energy} className="w-[1.2em] h-[1.3em] my-auto" alt="" />
        <span className="my-auto text-xs font-bold hacker">HakyOff {"_>"}</span>
      </p>
    </div>
  );
}
