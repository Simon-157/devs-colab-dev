import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const socket = io(SOCKET_SERVER_URL);

export const joinRoom = (room: string) => {
  socket.emit("join", room);
};

export const leaveRoom = (room: string) => {
  socket.emit("leave", room);
};

export const updateCode = (room: string, code: string) => {
  socket.emit("code change", { room, code });
};

export const muteVideo = (room: string, action: string) => {
  socket.emit("mute", { room, action, type: "video" });
};

export const muteAudio = (room: string, action: string) => {
  socket.emit("mute", { room, action, type: "audio" });
};

export const sendMessage = (room: string, message: string) => {
  socket.emit("chat message", { room, message });
};

export const subscribeToCodeUpdates = (callback: (code: string) => void) => {
  socket.on("code update", callback);
};

export const subscribeToMuteEvents = (
  callback: (data: { action: string; type: string }) => void
) => {
  socket.on("mute", callback);
};

export const subscribeToChatMessages = (
  callback: (data: { username: string; message: string }) => void
) => {
  socket.on("chat message", callback);
};

export const subscribeToUserUpdates = (callback: (users: string[]) => void) => {
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
