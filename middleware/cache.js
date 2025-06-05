const upstashFetch = require("../config/upstash");

const cache = async (req, res, next) => {
  const key = JSON.stringify(req.query || {});
  const cached = await upstashFetch("get", [key]);
  if (cached) return res.json(JSON.parse(cached));

  res.sendResponse = res.json;
  res.json = async (body) => {
    await upstashFetch("setex", [key, 3600, JSON.stringify(body)]);
    res.sendResponse(body);
  };
  next();
};

module.exports = cache;