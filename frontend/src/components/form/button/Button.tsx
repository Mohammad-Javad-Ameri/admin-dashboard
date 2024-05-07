import { ButtonProps } from "./Button.types";

function Button({ title, onClick, type, size, className, icon }: ButtonProps) {
  return (
    <button
      className={` px-4 py-2 m-[20px] rounded-[0.5rem]  transition-all flex justify-center btn-${type} size-${size} ${className} flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-300 hover:cursor-not-allowed`}
      onClick={(e) => onClick(e)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </button>
  );
}

export default Button;
