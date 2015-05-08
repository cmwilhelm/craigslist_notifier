var env     = require('jsdom').env,
    Promise = require('bluebird'),
    jQuery  = require('jquery'),
    config  = require('./config.json'),
    parser;


parser = {

  getListings: function ($) {
    var elements = $('.content p.row'),
        listings = [];

    elements.each(function () {
      listings.push({
        title: $(this).find('span.pl a').text(),
        price: $(this).find('span.l2 span.price').text(),
        housing: $(this).find('span.l2 span.housing').text(),
        location: $(this).find('span.l2 span.pnr small').text(),
        url: config.baseUrl + $(this).find('span.pl a').attr('href')
      });
    });

    return listings;
  },

  extractData: function (html) {
    console.log("Parsing HTML results");
    var parser = this;
    return new Promise(function (resolve) {
      env(html, function (error, window) {
        $ = jQuery(window);
        resolve(parser.getListings($));
        window.close();
        if (process.memoryUsage().heapUsed > 200000000) {
          global.gc();
        }
      });
    });
  }

};


module.exports = parser;