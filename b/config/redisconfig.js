const Redis = require("ioredis");

let client;

if (!process.env.redis_endpoint) {
  console.log("[WARN] Redis endpoint not found in .env. Using MOCK Redis client.");
  client = {
    on: (event, callback) => { },
    get: async () => null,
    set: async () => { },
    del: async () => { },
    hLen: async () => 0,
    hGetAll: async () => ({}),
    // Add other methods if needed
  };
} else {
  client = new Redis("redis://default:" + process.env.redis_password + "@" + process.env.redis_endpoint + ":12831");
  client.on("connect", () => {
    console.log("Redis connected");
  });

  client.on("error", (err) => {
    console.log("Redis connection error", err);
  });
}

module.exports = client;
