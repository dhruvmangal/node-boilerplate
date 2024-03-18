import redisClient from "./redisClient";

export const storeToken = (userId, token)=>{
  redisClient.set(`user:${userId}`, token)
}

export const checkToken = (userId, token, callback) => {
  redisClient.get(`user:${userId}`, (err, reply) => {
      if (err) {
          console.error('Redis error:', err);
          callback(false);
      } else {
          callback(reply === token);
      }
  });
}

export const deleteToken = (userId) => {
  redisClient.del(`user:${userId}`)
}