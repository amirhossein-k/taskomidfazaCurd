// src\components\user\UserGrid.tsx
"use client";

import { UserType } from "@/types/types";
import UserCard from "./UserCard";

interface ProductGridProps {
  users: UserType[];
}

const UserGrid: React.FC<ProductGridProps> = ({ users }) => {
  if (!users || users.length === 0) return <p>هیچ کاربری پیدا نشد.</p>;

  return (
    <div className="space-y-2 bg-[#e2e2e2] ">
      {users.map((user: UserType, index: number) => (
        <UserCard key={user.id} user={user} index={index} />
      ))}
    </div>
  );
};

export default UserGrid;
