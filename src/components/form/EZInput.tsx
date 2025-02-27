import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
};

const EZInput = ({ type, name, label, disabled }: TInputProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label || name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              className="mt-2"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EZInput;
