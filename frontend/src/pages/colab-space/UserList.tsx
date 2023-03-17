import { subscribeToUserUpdates } from "@/api/socket";
import { useEffect, useState } from "react";

import {
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import mainEditorFrameStyle from "./editor.module.scss";


interface UserListProps {
  roomId: string;
  clients: {userName:string; email:string; avatar:string}[]
}

const UserList: React.FC<UserListProps> = ({ roomId, clients }) => {
  const [users, setUsers] = useState<string[]>(["Benoni", "Gordon","Benoni", "Gordon"]);

  useEffect(() => {
    subscribeToUserUpdates(setUsers);
  }, []);



  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>
        <Button
          className={`bg-sky-400 ${mainEditorFrameStyle.btn}`}
        >
          participants
        </Button>
      </MenuHandler>
      <MenuList className="w-80 px-2 py-1">
        {clients?.map((client, index) => {
          return (
            <MenuItem className="py-1" key={index}>
              {" "}
              <div className="flex justify-items-end flex-row ">
                <Avatar
                  className="mr-1"
                  size="xs"
                  src={client?.avatar}
                  alt="avatar"
                  variant="circular"
                />
                <span className="mt-1">{client?.userName}</span>
                <span className="absolute right-1 mt-1 text-green-400 place-items-center ">
                  online
                </span>
              </div>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default UserList;
