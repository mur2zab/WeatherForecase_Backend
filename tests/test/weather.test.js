const { expect, test, describe } = require("@jest/globals");
const {
  fetchWeatherForCities,
} = require("../../api/handlers/weather.handlers");
const apiCaller = require("../../utils/apiCaller");
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
        send: () => {},
      };
    },
  },

  apiCallerResponse: {
    success: true,
  },
};

describe("Weather API test", () => {
  test("Successful API call", async () => {
    apiCaller.call = jest.fn(() => {
      return Promise.resolve(fixtures.apiCallerResponse);
    });

    redis.fetchRedisClientFromCache = jest.fn(() => {
      return {};
    });

    redis.init = jest.fn(() => {
      return {};
    });

    redis.smember = jest.fn(() => {
      return [];
    });

    await fetchWeatherForCities(fixtures.req, fixtures.res);
    return expect(apiCaller.call).toHaveBeenCalledTimes(1);
  });
});
