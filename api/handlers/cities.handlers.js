const responseHandler = require('../../utils/responseHandler')
const redis = require('../../redis').init();

async function fetchAllCitiesFromRedis(){
  const cities = await redis.smembers('cities');
  return cities;
}

async function fetchAllCities(req,res){
  let resP;
  try{
    const cities = await fetchAllCitiesFromRedis();
    resP = Promise.resolve(cities);
    responseHandler(req,res,resP);
  }catch(error){
    resP = Promise.reject(error);
    responseHandler(req,res,resP);

  }
}

async function addNewCity(req, res) {
  let resP;
    try{
      const cityName = req.body.cityName
      if(!cityName)
        throw {
          message: "Invalid data found in request body"
        }
      const response = await redis.sadd('cities', cityName);
      resP = Promise.resolve({
        success: response
      });
      responseHandler(req,res,resP);
    }catch(error){
      resP = Promise.reject(error);
      responseHandler(req,res,resP);
    }
  
}

module.exports = {
    fetchAllCities,
    addNewCity,
    fetchAllCitiesFromRedis
}