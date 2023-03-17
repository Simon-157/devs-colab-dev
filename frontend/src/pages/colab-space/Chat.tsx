import { sendMessage, subscribeToChatMessages } from "@/api/socket";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { ChatMessage } from "../../types/Chat";
import mainEditorFrameStyle from "./editor.module.scss";

interface ChatBoxProps {
  room: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = () => {
    sendMessage(room, message);
    setMessage("");
  };

  subscribeToChatMessages((data: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  return (
    <div className="flex flex-row h-full px-4 py-2 bg-gray-200 border-t-2 border-gray-400">
      <div className={mainEditorFrameStyle.groupButtons}>
        <div className="px-0 py-2 flex w-max gap-2">
          <Button
            className={`bg-green-400 ${mainEditorFrameStyle.btn}`}
            variant="filled"
            color="green"
            //   onClick={copyRoomId}
          >
            save
          </Button>
          {/* <CollabChallenge challenge={currentChallenge} /> */}

          <Button
            className={`bg-red-400 ${mainEditorFrameStyle.btn}`}
            //   text="exit group"
            //   onClick={handleLeave}
          >
            exit collab
          </Button>
        </div>
      </div>
      <div className="flex-grow mb-4 overflow-auto">
        {messages.map(({ username, message }, index) => (
          <div key={index} className="mb-2">
            <strong>{username}</strong>: {message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow px-4 py-2 mr-2 bg-white border-2 border-gray-400 rounded-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
