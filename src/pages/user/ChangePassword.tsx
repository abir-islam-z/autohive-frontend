"use client";

import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";
import { Button } from "@/components/ui/button";
import { shapeError } from "@/lib/utils";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [changePassword] = useChangePasswordMutation();

  const handleChangePassword = async (data: TChangePasswordSchema) => {
    const id = toast.loading("Changing password");
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password changed successfully", { id, duration: 2000 });
    } catch (error) {
      throw shapeError(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <EZForm
        onSubmit={handleChangePassword}
        resolver={zodResolver(changePasswordSchema)}
        defaultValues={defaultValues}
      >
        <div className="mb-4">
          <EZInput
            label="Current Password"
            type="password"
            name="oldPassword"
          />
        </div>
        <div className="mb-4">
          <EZInput label="New Password" type="password" name="newPassword" />
        </div>
        <div className="mb-4">
          <EZInput
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
          />
        </div>
        <Button type="submit">Change Password</Button>
      </EZForm>
    </div>
  );
}
