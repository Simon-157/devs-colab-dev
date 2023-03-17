import { subscribeToUserUpdates } from "@/api/socket";
import { useEffect, useState } from "react";


interface UserListProps {
  roomId: string;
}

const UserList: React.FC<UserListProps> = ({ roomId }) => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    subscribeToUserUpdates(setUsers);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
