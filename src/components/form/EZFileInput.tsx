import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileUploader } from "../ui/file-uploader";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
};

const EZFileInput = ({ name, label, disabled }: TInputProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label || name}</FormLabel>
          <FormControl>
            <FileUploader
              value={field.value}
              onValueChange={field.onChange}
              maxFileCount={1}
              maxSize={4 * 1024 * 1024}
              disabled={disabled}
              className="mt-2"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EZFileInput;
