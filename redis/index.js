const Redis = require('ioredis');
let cachedRedisClient;

function getClient(redisConfig) {
    return new Redis(redisConfig);
}

function fetchRedisClientFromCache(){
  return cachedRedisClient;
}
function init(redisConfig) {
  const redisClient = fetchRedisClientFromCache();
  if(redisClient)
    return redisClient
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

  cachedRedisClient = client;
  return client;
}

module.exports = {
  init,
  fetchRedisClientFromCache
}