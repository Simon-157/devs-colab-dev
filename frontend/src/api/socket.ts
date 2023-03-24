import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

const socketOpts = {
  // transports: ["websocket","polling"],
  reconnectionAttempts: 5,
  withCredentials: true,
} as Partial<ManagerOptions & SocketOptions>;

const SOCKET_SERVER_URL = "http://localhost:5000";

const socket = io("ws://localhost:5000", socketOpts);

socket.on("connect", () => {
  console.log(socket.id);
});

const joinRoom = (roomId: string, user:string) => {
  // user is the id of the user
  console.log("Room Id: , ", roomId)
  socket.emit("join", {roomId, user});
};

const createColab = (roomId: string, roomName:string, user: string, challenge: number) => {
  socket.emit("create", { roomId, roomName, user, challenge });
}

const leaveRoom = (room: string) => {
  socket.emit("leave", room);
};

const updateCode = (room: string, code: string) => {
  socket.emit("code change", { room, code });
};

const muteVideo = (room: string, action: string) => {
  socket.emit("mute", { room, action, type: "video" });
};

const muteAudio = (room: string, action: string) => {
  socket.emit("mute", { room, action, type: "audio" });
};

const sendMessage = (room: string, message: string) => {
  socket.emit("chat message", { room, message });
};

const subscribeToCodeUpdates = (callback: (code: string) => void) => {
  socket.on("code update", callback);
};

const subscribeToMuteEvents = (
  callback: (data: { action: string; type: string }) => void
) => {
  socket.on("mute", callback);
};

const subscribeToChatMessages = (
  callback: (data: { username: string; message: string }) => void
) => {
  socket.on("chat message", callback);
};

const subscribeToUserUpdates = (callback: (users: string[]) => void) => {
  socket.on("user joined", (user: string) => {
    socket.emit("get users", (users: string[]) => {
      callback(users);
    });
  });

  socket.on("user left", (user: string) => {
    socket.emit("get users", (users: string[]) => {
      callback(users);
    });
  });

  socket.on("user disconnected", (user: string) => {
    socket.emit("get users", (users: string[]) => {
      callback(users);
    });
  });

  socket.emit("get users", (users: string[]) => {
    callback(users);
  });
};

export {
  socket,
  joinRoom,
  createColab,
  leaveRoom,
  subscribeToChatMessages,
  subscribeToCodeUpdates,
  subscribeToMuteEvents,
  subscribeToUserUpdates,
  sendMessage,
  muteAudio,
  muteVideo,
  updateCode,
};
