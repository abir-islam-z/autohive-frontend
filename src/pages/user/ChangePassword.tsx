"use client";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import EZButton from "@/components/form/EZButton";
import { EZForm } from "@/components/form/EZForm";
import EZInput from "@/components/form/EZInput";

import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import {
  changePasswordSchema,
  TChangePassword,
} from "@/schema/change-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function ChangePassword() {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [changePassword] = useChangePasswordMutation();

  const handleChangePassword = async (data: TChangePassword) => {
    const id = toast.loading("Changing password");
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password changed successfully", { id, duration: 2000 });
    } catch (error) {
      toast.dismiss(id);
      throw error;
    }
  };

  return (
    <>
      <DashboardPageWrapper pageHeading="Change Password">
        <EZForm
          onSubmit={handleChangePassword}
          resolver={zodResolver(changePasswordSchema)}
          defaultValues={defaultValues}
        >
          <EZInput
            label="Current Password"
            type="password"
            name="oldPassword"
          />
          <EZInput label="New Password" type="password" name="newPassword" />
          <EZInput
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
          />
          <EZButton>Change Password</EZButton>
        </EZForm>
      </DashboardPageWrapper>
    </>
  );
}
