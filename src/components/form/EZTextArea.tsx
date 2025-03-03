import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type TTextAreaProps = {
  row?: number;
  name: string;
  label?: string;
  disabled?: boolean;
};

const EZTextArea = ({ name, label, row = 10, disabled }: TTextAreaProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label || name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className="mt-2"
              disabled={disabled}
              rows={row}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EZTextArea;
