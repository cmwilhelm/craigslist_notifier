var config = require('./config.json'),
    twilio = require('twilio');


function SMSer () {
  this._client = twilio(
    config.twilioConfig.accountSid,
    config.twilioConfig.authToken
  );
  this._numbers = config.phoneNumbers;
}

SMSer.prototype = {
  send: function (listing) {
    for (var i = 0; i < this._numbers.length; i += 1) {
      console.log("Sending text message to ", this._numbers[i]);
      this._client.messages.create({
        to:   this._numbers[i],
        from: config.twilioConfig.fromNumber,
        body: this._getMessage(listing)
      }, function (err, message) {
        console.log(err);
        console.log(message);
      });
    }
  },
  _getMessage: function (listing) {
    return [
      listing.title, listing.location, listing.price, listing.url
    ].join(' | ');
  }
};


module.exports = SMSer;