const { expect, test, describe } = require("@jest/globals");
const { fetchAllCities, addNewCity } = require('../../api/handlers/cities.handlers');
const redis = require("../../redis");
global.config = require("../../config");

const fixtures = {
  req: {
    query: {
      q: "Mumbai",
    },
  },

  res: {
    header: () => {},
    send: () => {},
    status: () => {
      return {
        send: (response) => response,
      };
    },
  },

  reqWithBodyAndCityName:{
      body: {
          cityName: "Jammu"
      }
  },

  reqWithOutBodyAndCityName:{
    body: {}
},

};

describe("Cities API test", () => {
  test("Get cities from redis API call", async () => {

    redis.fetchRedisClientFromCache = jest.fn(() => {
      return {};
    });

    redis.init = jest.fn(() => {
      return {};
    });

    redis.smember = jest.fn(() => {
      return [];
    });

    await fetchAllCities(fixtures.req, fixtures.res);
  });


  test("Add city to redis ", async () => {

    redis.fetchRedisClientFromCache = jest.fn(() => {
      return {};
    });

    redis.init = jest.fn(() => {
      return {};
    });

    redis.sadd = jest.fn(() => {
      return [];
    });

    await addNewCity(fixtures.reqWithBodyAndCityName, fixtures.res);
    // Need to add expected outcome: Success response 

  });

  test("Add city to redis without body ", async () => {

    redis.fetchRedisClientFromCache = jest.fn(() => {
      return {};
    });

    redis.init = jest.fn(() => {
      return {};
    });

    redis.sadd = jest.fn(() => {
      return [];
    });

    await addNewCity(fixtures.reqWithOutBodyAndCityName, fixtures.res);
    // Need to add expected outcome: Error response 
  });
});
