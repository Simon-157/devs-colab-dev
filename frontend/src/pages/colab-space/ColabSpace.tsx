import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { leaveRoom, updateCode } from "@/api/socket";
import Chat from "./Chat";
import UserList from "./UserList";


const Editor = dynamic(import("./Editor"), { ssr: false });

const Room: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;

  const [code, setCode] = useState("");

  const handleLeave = () => {
    leaveRoom(roomId as string);
    router.push("/");
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    updateCode(roomId as string, newCode);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor initialValue={code} room = {roomId as string} />
          </div>
          <div className="flex-none">
            <Chat room={roomId as string} />
          </div>
        </div>
        <div className="w-1/4 bg-gray-100 p-4">
          <UserList roomId={roomId as string} />
        </div>
      </div>
      <div className="bg-gray-100 p-4 flex-none">
        <button onClick={handleLeave}>Leave Room</button>
      </div>
    </div>
  );
};

export default Room;
