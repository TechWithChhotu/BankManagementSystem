import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // Adjust this URL to match your Redis server configuration
});

redisClient.on("error", (err) =>
  console.log("Redis Client Error, pls firstly open redis-server and run it")
);

redisClient.connect().catch(console.error);

export default redisClient;
