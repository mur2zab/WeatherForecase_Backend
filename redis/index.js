const Redis = require('ioredis');

function getClient(redisConfig) {
    return new Redis(redisConfig);
}
module.exports.init = function(redisConfig) {
  const client = getClient(redisConfig);

  client.on('connect', () => {
    console.log('Redis client connected');
  });

  client.on('error', (err) => {
    console.error('Redis client error connecting', err);
  });

  client.on('close', () => {
    console.log('Redis client connection closed');
  });

  client.on('reconnecting', () => {
    console.log('Redis client reconnecting');
  });

  return client;
}