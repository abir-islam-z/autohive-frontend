import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TSelectProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  options: TOption[];
};

const EZSelect = ({ options, name, label, disabled }: TSelectProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label || name.charAt(0).toUpperCase() + name.slice(1)}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger disabled={disabled} className="mt-2">
                <SelectValue
                  className="capitalize"
                  placeholder={`Select ${label || name}`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EZSelect;
