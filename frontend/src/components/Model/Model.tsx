import { ModelProps } from "./Model.types";
import "./Model.css";
import Loading from "../spinner/Loading";
const Model = ({
  icon,
  title,
  description,
  actionFun,
  closeModel,
  isLoading,
}: ModelProps) => {
  return (
    <div className="fixed z-10 flex items-center justify-center top-0 bottom-0 left-0 right-0">
      <div
        className="w-[500px] text-center rounded-lg shadow-md bg-white z-20 px-4 py-8 flex justify-center items-center flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {icon && <div className="flex justify-center mb-3">{icon}</div>}
        <h1 className="text-lg">{title}</h1>
        <p className="mt-2">{description}</p>
        <div className="flex w-full">
          <button className="btn btn-blank w-1/2 mb-0" onClick={closeModel}>
            Cancel
          </button>
          <button className="btn btn-primary w-1/2 mb-0" onClick={actionFun}>
            {isLoading ? <Loading /> : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model;
