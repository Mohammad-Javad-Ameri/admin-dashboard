import { InputProps } from "./Input.types";
import "./Input.css";
import Label from "../Label/Label";
function Input({
  labeltext,
  type,
  placeHolder,
  className,
  field,
  error,
}: InputProps) {
  return (
    <div className="Filed_Container">
      <div className="Field">
        {labeltext && (
          <Label htmlfor="sku" className="Field_title" label={labeltext} />
        )}
        <input
          type={type}
          placeholder={placeHolder}
          className={`w-full p-3 outline-none border border-gray-300 rounded-lg Field_input_in-${
            error && "error"
          } ${className}`}
          {...field}
          onChange={(e) => field.onChange(e)}
        />
      </div>
      {error && (
        <div className="error text-sm text-red-600  mt-2 w-2/3 ml-auto">
          {error}
        </div>
      )}
    </div>
  );
}

export default Input;
