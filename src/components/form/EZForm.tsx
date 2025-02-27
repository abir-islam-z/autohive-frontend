"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { DefaultValues, UseFormProps } from "react-hook-form";
import { toast } from "sonner";

// Update TFormConfig to use correct types from react-hook-form
type TFormConfig<T extends FieldValues> = {
  defaultValues?: DefaultValues<T>;
  resolver?: UseFormProps<T>["resolver"];
};

type TFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  className?: string;
  children: ReactNode;
} & TFormConfig<T>;

export const EZForm = <T extends FieldValues>({
  onSubmit,
  children,
  defaultValues,
  resolver,
  className,
}: TFormProps<T>) => {
  const formConfig: UseFormProps<T> = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm<T>(formConfig);

  const submit = async (data: T) => {
    try {
      await onSubmit(data);
      await methods.reset();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submit)}
        className={cn("mt-1", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
