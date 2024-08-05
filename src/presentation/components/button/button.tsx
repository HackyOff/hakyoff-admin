import { ButtonHTMLAttributes, ElementType } from "react";
import { FaSpinner } from "react-icons/fa";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  leftIcon?: ElementType;
  icon?: ElementType;
  color?: string;
  rightIcon?: ElementType;
  isLoading?: boolean;
};

export function Button({
  text,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  icon: Icon,
  isLoading,
  className,
  color,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 w-auto py-2 transition-all gap-3 rounded-md flex ${className || ""
        } font-semibold  ${color === "primary"
          ? "bg-primary dark:bg-yellow-600 dark:text-white hover:bg-primary/90"
          : "bg-white  hover:bg-white/90"
        }`}
      disabled={isLoading}
      {...props}
    >
      {LeftIcon &&
        (isLoading ? (
          <FaSpinner className="my-auto animate-spin" />
        ) : (
          <LeftIcon className='my-auto' />
        ))}
      <span className="my-auto">{text || ""}</span>
      {(RightIcon || Icon) &&
        (isLoading ? (
          <FaSpinner className="my-auto animate-spin" />
        ) : RightIcon ? (
          <RightIcon className="my-auto" />
        ) : (
          Icon && <Icon className="my-auto" />
        ))}
    </button>
  );
}
