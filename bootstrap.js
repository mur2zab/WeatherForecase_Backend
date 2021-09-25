const _ = require('lodash');

function initializeRedis(redisConfig = {} ) {
    if(_.isEmpty(redisConfig)) {
        throw new Error({
            message: "Error while initializing redis"
        })
    }

    require('./redis').init(redisConfig);
}

module.exports.init = async function(config) {
    global.config = config;
    await initializeRedis(config.redis);

}