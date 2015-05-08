var getSearchResults = require('./getSearchResults'),
    Notifier         = require('./Notifier'),
    notifier         = new Notifier(),
    parser           = require('./parser'),
    Promise          = require('bluebird');


function main () {

  Promise.all(getSearchResults()).then(function (searchResults) {

    for (var i = 0; i < searchResults.length; i += 1) {
      parser.extractData(searchResults[i]).then(function (listings) {
        notifier.sendNotifications(listings);
      });
    }

  });

}

setInterval(main, 60000);