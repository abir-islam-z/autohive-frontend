import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "./button";

interface GlobalButtonProps {
  onClick: () => void;
  className?: string;
}

export function EditButton({ onClick, className }: GlobalButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}

export function AddButton({ onClick, className }: GlobalButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
}

export function DeleteButton({ onClick, className }: GlobalButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
