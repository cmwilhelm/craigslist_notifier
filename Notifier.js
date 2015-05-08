var NotificationLog = require('./NotificationLog'),
    SMSer           = require('./SMSer'),
    Emailer         = require('./Emailer');


function Notifier () {
  this._devices = [new SMSer(), new Emailer()];
  this._log = new NotificationLog();
}

Notifier.prototype = {
  sendNotifications: function (listings) {
    var length = listings.length > 10 ? 10 : listings.length,
        listings;
    for (var i = 0; i < length; i += 1) {
      listing = listings[i]
      if (!this._log.wasSeen(listing)) {
        this._send(listing);
        this._log.add(listing);
      }
    }
  },
  _send: function (listing) {
    for (var i = 0; i < this._devices.length; i += 1) {
      this._devices[i].send(listing);
    }
  }
};


module.exports = Notifier;