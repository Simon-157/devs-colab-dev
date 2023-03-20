import express, { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const redisAdapter = require("socket.io-redis");

const initializeSocket = (app: Application) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.COLAB_URI,
      credentials: true,
    },

    // configure the Redis adapter
    adapter: redisAdapter({ host: "localhost", port: 6379 }),
  });

  return io;
};

export { initializeSocket };
