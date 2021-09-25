const express = require('express');
const router = express.Router();
const handlers = require('../handlers/weather.handlers');


module.exports = function(){
  router
    .route("/")
    .get(handlers.fetchWeatherForCities)

  return router;

}