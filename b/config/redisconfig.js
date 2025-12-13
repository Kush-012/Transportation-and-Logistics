const Redis = require("ioredis");
const client = new Redis("redis://default:"+process.env.redis_password+"@"+process.env.redis_endpoint+":12831");
client.on("connect", () => {
  console.log("Redis connected");
});

client.on("error", (err) => {
  console.log("Redis connection error", err);
});
module.exports = client;
