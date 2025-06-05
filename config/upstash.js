// config/upstash.js
const axios = require("axios");

const upstashFetch = async (method, args) => {
  const url = `${process.env.UPSTASH_REDIS_REST_URL}/${method}/${args.join("/")}`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      },
    });
    return res.data.result;
  } catch (err) {
    console.error("Upstash Redis Error:", err.response?.data || err.message);
    return null;
  }
};

module.exports = upstashFetch;
