"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export default function ManageProfile() {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Profile</h2>
      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input type="text" value={user?.name} disabled readOnly />
      </div>
      <div className="mb-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" disabled readOnly value={user?.email} />
      </div>
    </div>
  );
}
