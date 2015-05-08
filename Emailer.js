var config     = require('./config.json'),
    nodemailer = require('nodemailer');


function Emailer () {
  this._transporter = nodemailer.createTransport(config.emailConfig);
}

Emailer.prototype = {
  send: function (listing) {
    this._writeToLog();
    this._transporter.sendMail({
      from:    config.emailConfig.from,
      to:      config.emails.join('; '),
      subject: this._getMessage(listing),
      text:    listing.url
    });
  },
  _writeToLog: function () {
    console.log("Sending email to ", config.emails);
  },
  _getMessage: function (listing) {
    return [
      listing.title, listing.price, listing.location
    ].join(' | ');
  }
};


module.exports = Emailer;
