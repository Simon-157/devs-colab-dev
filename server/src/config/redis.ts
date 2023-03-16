const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient(process.env.REDIS_URL);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  client,
  getAsync,
  setAsync,
};
