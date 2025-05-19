import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchFieldProps = {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchField({
  searchTerm,
  handleSearchChange,
}: SearchFieldProps) {
  return (
    <div>
      <Label
        htmlFor="search"
        className="text-sm font-medium text-gray-700 block mb-2"
      >
        Search
      </Label>
      <Input
        id="search"
        type="text"
        placeholder="Search vehicles..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full"
      />
    </div>
  );
}
