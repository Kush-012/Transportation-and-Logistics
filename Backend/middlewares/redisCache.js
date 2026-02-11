const redisClient = require("../config/redisconfig");

// Middleware to check cache
const cacheMiddleware = async (req, res, next) => {
  const { email } = req.params;

  try {
    const count = await redisClient.hLen(`cart:${email}:qty`);

    if (count > 0) {
      console.log("📦 Redis Cache HIT");
      const qtyMap = await redisClient.hGetAll(`cart:${email}:qty`);
      const output = [];

      for (const itemid in qtyMap) {
        const details = await redisClient.hGetAll(`cart:${email}:data:${itemid}`);
        output.push({
          dishphoto: details.dishphoto,
          itemid: details.itemid,
          price: Number(details.price),
          dishname: details.dishname,
          email: details.email,
          quantity: Number(qtyMap[itemid])
        });
      }

      return res.status(200).json(output);
    }

    // No Redis cache — continue to controller
    console.log("🚫 Redis Cache MISS");
    next();

  } catch (error) {
    console.error("❌ Redis cache error:", error);
    next();
  }
};

module.exports = cacheMiddleware;
