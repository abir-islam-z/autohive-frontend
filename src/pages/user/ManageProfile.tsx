"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic here
    console.log("Profile updated:", profile);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
          />
        </div>
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}
