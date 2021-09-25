const express = require('express');
const router = express.Router();
const handlers = require('../handlers/cities.handlers');

module.exports = function(){
    router.get('/', handlers.fetchAllCities);
    router.post('/', handlers.addNewCity);
    return router;
}