"use client";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import EZFileInput from "@/components/form/EZFileInput";
import { EZForm } from "@/components/form/EZForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Briefcase, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { toast } from "sonner";

export default function ManageProfile() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const handleSubmit = () => {
    toast.info("Profile update functionality coming soon");
  };

  return (
    <DashboardPageWrapper pageHeading="Manage Profile">
      <div>
        {/* Personal Information Card */}
        <EZForm
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onSubmit={handleSubmit}
        >
          {/* Profile Photo Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={user?.avatar || ""}
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="text-4xl">
                  {user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="w-full">
                <EZFileInput
                  name="profile-picture"
                  className="mt-2"
                  disabled
                  label="Upload new profile picture"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  * Profile update functionality coming soon
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User size={16} /> Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={user?.name || ""}
                    disabled
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={user?.phone || ""}
                    disabled
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2">
                    <Calendar size={16} /> Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    value={user?.dob || ""}
                    disabled
                    readOnly
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin size={16} /> Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={user?.address || ""}
                  disabled
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <Briefcase size={16} /> Bio/Description
                </Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[80px] p-2 rounded-md border bg-muted"
                  disabled
                  readOnly
                  value={user?.bio || ""}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="button" disabled>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </EZForm>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Profile management features are currently in development. You'll be able
        to update your information soon.
      </p>
    </DashboardPageWrapper>
  );
}
