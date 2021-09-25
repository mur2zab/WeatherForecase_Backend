const _ = require("lodash");
const fs = require('fs');
const path = require('path');
function loadAllConfigs() {
  try {
    const config = {};
    const files = fs.readdirSync(`${__dirname}/configs`);
    _.forEach(files, (file) => {
      if (file.indexOf(".js") === -1) return;
      config[_.first(file.split("."))] = require(path.resolve(
        __dirname,
        `./configs/${file}`
      ));
    });
    return config;
  } catch (error) {
    console.log(error);
  }
}

module.exports = loadAllConfigs();