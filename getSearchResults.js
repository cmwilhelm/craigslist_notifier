var request = require('request'),
    config  = require('./config.json'),
    Promise = require('bluebird');


function runSearch (qs) {
  return new Promise (function (resolve, reject) {
    request.get({
      url: config.url,
      qs:  qs
    }, function (error, response, body) {
      if (!error && response && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

function getSearchResults () {
  console.log("Running searches");
  var promises = [];
  for (var search in config.searches) {
    promises.push(runSearch(config.searches[search]))
  }
  return promises;
}

module.exports = getSearchResults;