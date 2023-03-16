const redisClient = require('../config/redis');

const getUser = async (id: any) => {
  const user = await redisClient.hgetall(`user:${id}`);
  if (!user) {
    return null;
  }
  user.id = parseInt(user.id);
  user.created_at = new Date(user.created_at);
  user.updated_at = new Date(user.updated_at);
  return user;
};

const createUser = async (user: { id: any; created_at: Date; updated_at: Date; }) => {
  const userId = await redisClient.incr('next_user_id');
  user.id = userId;
  user.created_at = new Date();
  user.updated_at = new Date();
  await redisClient.hmset(`user:${userId}`, user);
  return user;
};

module.exports = { getUser, createUser };
