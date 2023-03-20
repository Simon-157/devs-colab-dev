import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const socketResources = async (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

    io.on("connection", (socket) => {
        console.log("A user connected");
      
        socket.on("join", (room: string) => {
          socket.join(room);
          console.log(`User joined room ${room}`);
        });
      
        socket.on("leave", (room: string) => {
          socket.leave(room);
          console.log(`User left room ${room}`);
        });
      
        socket.on("code change", ({ room, code }: { room: string; code: string }) => {
          io.to(room).emit("code update", code);
          console.log(`Code updated in room ${room}`);
        });
      
        socket.on("mute", ({ room, action, type }: { room: string; action: string; type: string }) => {
          io.to(room).emit("mute", { action, type });
          console.log(`${type} ${action}d in room ${room}`);
        });
      

        socket.on("chat message", ({ room, message }: { room: string; message: string }) => {
          io.to(room).emit("chat message", { username: socket.id, message });
          console.log(`Message sent in room ${room}`);
        });
      

        socket.on("get users", (callback: (users: string[]) => void) => {
            const rooms = Array.from(socket.rooms);
            const users = rooms.flatMap((room) => io.sockets.adapter.rooms?.get(room));
            const uniqueUsers = [...new Set(users)].filter((user) => user !== undefined) as unknown as string[]
            const filteredUsers = uniqueUsers?.filter((id) => typeof id === 'string' && id !== socket.id && !socket.rooms?.has(id));
            callback(filteredUsers);
          });
          

        socket.on("disconnect", () => {
          console.log("A user disconnected");
        });
      });
      
      

}
