import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URI as string);
redisClient.on("error", (err: any) => {
  console.log(err);
});
redisClient.on("ready", () => {
    console.log("connected to redis instance")
})

export { redisClient };