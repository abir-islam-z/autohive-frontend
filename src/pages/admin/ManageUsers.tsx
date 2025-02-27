import { useState } from "react";
import { Button } from "../../components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", active: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", active: true },
  ]);

  const handleToggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <Button
              onClick={() => handleToggleUserStatus(user.id)}
              variant={user.active ? "destructive" : "default"}
            >
              {user.active ? "Deactivate" : "Activate"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
