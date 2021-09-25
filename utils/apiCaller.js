const rp = require('promise-request-retry');

const API_KEY = '858f15fed9292cbe25c341a754c55e45';
module.exports.call = function(endPoint, appendKey = true, body = {}, method = 'GET'){

    if(appendKey){
        endPoint = endPoint + `&appid=${API_KEY}`
    }

    const options = {
      method,
      uri: endPoint,
      body,
      headers: {
          'Content-type': 'application/json'
      },
      json: true, 
      verbose_logging : false, 
    };
    
    return rp(options)
      .then(function (repos) {
          // console.log('User has repos', repos);
          return repos
      })
      .catch(function (err) {
          console.log("🚀 ~ file: apiCaller.js ~ line 25 ~ err", err)
          // API call failed...
      });

}