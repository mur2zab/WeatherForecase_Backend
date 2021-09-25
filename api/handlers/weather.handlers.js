const apiCaller = require('../../utils/apiCaller');
const PromiseB = require('bluebird');
const { fetchAllCitiesFromRedis } = require('./cities.handlers');
const responseHandler = require('../../utils/responseHandler');
async function fetchWeatherForCities(req, res){
  let resP;
    try{
        let cities = req.query.q || null;
        if(cities){
          cities = cities.split(',');
          console.log("🚀 ~ file: weather.handlers.js ~ line 11 ~ fetchWeatherForCities ~ cities", cities)
        }else{
          cities = await fetchAllCitiesFromRedis();
        }
        const responseArray = [];
        let allP = PromiseB.map(cities, async (eachCity) => {
          const weatherEndPoint = config.app.weatherEndPoint;
          const fetchWeatherEndPoint = `${weatherEndPoint}?q=${eachCity}`
          const response = await apiCaller.call(fetchWeatherEndPoint);
          responseArray.push(response);
          return response;
        })
        await allP;
        resP = Promise.resolve(responseArray);
        responseHandler(req,res, resP);
    }catch(err){
      resP = Promise.reject(err);
      responseHandler(req,res, resP);
    }
  }


module.exports = {
    fetchWeatherForCities,
}