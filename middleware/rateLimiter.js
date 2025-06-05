// middleware/rateLimiter.js
const axios = require("axios");

const rateLimiter = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const key = `rate-limit:${ip}`;

  try {
    // Increase the count
    const incrRes = await axios.get(`${process.env.UPSTASH_REDIS_REST_URL}/incr/${key}`, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });

    const count = parseInt(incrRes.data.result);

    // Set TTL if first request
    if (count === 1) {
      await axios.get(`${process.env.UPSTASH_REDIS_REST_URL}/expire/${key}/60`, {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
      });
    }

    if (count > 30) {
      return res.status(429).json({ message: "Too many requests, try again in a minute." });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err.message);
    next(); // Let the request go through if Upstash fails
  }
};

module.exports = rateLimiter;
