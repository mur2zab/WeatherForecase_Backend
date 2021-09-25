const _ = require("lodash");
function errorHandler(err, req, res) {
  res.header(err.headers || {});
  res.status(err.statusCode || 500).send(err);
}
function responseHandler(req, res, resP) {
  resP
    .then((body) => {
      body = _.isArray(body) ? body : _.isEmpty(body) ? {} : body;
      res.status(200).send(body);
    })
    .catch((e) => {
      console.log(e);
      return errorHandler(e, req, res);
    });
}

module.exports = responseHandler;