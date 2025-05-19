import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

type TInputProps = {
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
};

const EZInput = ({ type, name, label, disabled, placeholder }: TInputProps) => {
  const handleNegativeValueForNumber = (value: number | string) => {
    if (type === "number") {
      return Number(value) < 0 ? 0 : value;
    } else return value;
  };

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label || name}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              value={handleNegativeValueForNumber(field.value)}
              className={`mt-2`}
              disabled={disabled}
              onWheel={(e) => {
                if (type === "number") {
                  e.currentTarget.blur();
                }
              }}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EZInput;
