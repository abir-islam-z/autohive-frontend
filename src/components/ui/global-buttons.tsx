import { Pencil, Plus, Trash } from "lucide-react";
import { ConfirmAlert } from "../Alert";
import { Button } from "./button";

interface GlobalButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  className?: string;
}

export function EditButton({
  onClick,
  className,
  isDisabled,
}: GlobalButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
      disabled={isDisabled}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}

export function AddButton({
  onClick,
  className,
  isDisabled,
}: GlobalButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
      disabled={isDisabled}
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
}

export function DeleteButton({
  onClick,
  className,
  isDisabled,
}: GlobalButtonProps) {
  return (
    <>
      <ConfirmAlert action={onClick}>
        <Button
          variant="outline"
          size="icon"
          className={className}
          disabled={isDisabled}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmAlert>
    </>
  );
}
