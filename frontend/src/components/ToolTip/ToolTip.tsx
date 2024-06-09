import { TooltipPorps } from "./ToolTip.types";
const ToolTip = ({ text, top, left }: TooltipPorps) => {
  return (
    <div
      className="flex justify-center items-center w-[50px] bg-red-400 p-3"
      style={{ position: "absolute", top, left }}
    >
      <h4>{text}</h4>
    </div>
  );
};

export default ToolTip;
