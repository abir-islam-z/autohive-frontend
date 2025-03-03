"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function EZButton({ children }: { children: string }) {
  const { formState } = useFormContext();
  return (
    <Button
      className="w-full mt-3"
      disabled={
        !formState.isValid || formState.isSubmitting || !formState.isDirty
      }
    >
      {formState.isSubmitting ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
