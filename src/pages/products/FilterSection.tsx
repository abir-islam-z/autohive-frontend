import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type TFilterProps<T> = {
  title: string;
  items: T[];
  selectedItems: T[];
  handleChange: (item: T) => void;
  getLabel?: (item: T) => string;
  type?: "checkbox" | "radio";
};

export default function FilterSection<T extends string>({
  title,
  items,
  selectedItems,
  handleChange,
  getLabel,
}: TFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex w-full justify-between items-center text-sm font-medium text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="mt-2">
          <div className="space-y-2 mt-2">
            {items?.map((item) => (
              <div key={item} className="flex items-center">
                <Checkbox
                  id={`${title.toLowerCase()}-${item}`}
                  checked={selectedItems.includes(item)}
                  onCheckedChange={() => handleChange(item)}
                />
                <Label
                  htmlFor={`${title.toLowerCase()}-${item}`}
                  className="text-sm cursor-pointer ml-2"
                  onClick={() => handleChange(item)}
                >
                  {getLabel ? getLabel(item) : item}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
