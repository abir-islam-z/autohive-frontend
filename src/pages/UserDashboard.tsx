"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function UserDashboard() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: "Tesla Model 3",
      date: "2023-05-01",
      status: "Delivered",
    },
    { id: 2, product: "Ford Mustang", date: "2023-05-15", status: "Shipped" },
  ]);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic here
    console.log("Profile updated:", profile);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic here
    console.log("Password change attempted");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <h3 className="text-xl font-semibold mb-4">My Orders</h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{order.product}</p>
                  <p className="text-sm text-gray-600">
                    Date: {order.date} | Status: {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </TabsContent>
        <TabsContent value="password">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <div className="mb-4">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Change Password</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
