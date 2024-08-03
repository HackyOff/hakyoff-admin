import { ElementType, InputHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

export type IHProps = InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  leftIcon?: ElementType;
  icon?: ElementType;
  color?: string;
  rightIcon?: ElementType;
  isLoading?: boolean;
  className?: string;
  divClass?: string;
};

export function InputHakyOff({
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  divClass,
  icon: Icon,
  isLoading,
  placeholder,
  className,
  ...props
}: IHProps) {
  return (
    <div
      className={`${divClass}  border-2 focus-within:border-primary   py-2 px-4 rounded-xl`}
    >
      {LeftIcon && (isLoading ? <FaSpinner /> : <LeftIcon />)}
      <input
        {...props}
        type="email"
        placeholder={placeholder}
        className={`${className} input my-auto text-white bg-transparent outline-none px-2 py-1 `}
        disabled={isLoading}
        {...props}
      />
      {(RightIcon || Icon) &&
        (isLoading ? (
          <FaSpinner />
        ) : RightIcon ? (
          <RightIcon className="my-auto" />
        ) : (
          Icon && <Icon className="my-auto" />
        ))}
    </div>
  );
}
