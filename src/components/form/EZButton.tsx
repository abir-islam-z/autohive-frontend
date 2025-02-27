"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function EZButton({ children }: { children: string }) {
  const { formState } = useFormContext();
  return (
    <Button
      className="w-full"
      disabled={!formState.isValid || formState.isSubmitting}
    >
      {formState.isSubmitting ? <Loader2Icon /> : children}
    </Button>
  );
}
