import { FaSpinner } from "react-icons/fa6";
import { Typewriter } from "react-simple-typewriter";
interface L {
    className?: string
    text: string
}
export function LoaderText({ className, text }: L) {
    return (
        <div className={`flex ${className}`}>
            <FaSpinner className="my-auto animate-spin" />
            <span className="ms-2">{text}</span>
            <Typewriter
                words={["..."]}
                loop={30}
                cursor
                cursorStyle="."
                typeSpeed={30}
                deleteSpeed={50}
                delaySpeed={500}
            />
        </div>
    )
}