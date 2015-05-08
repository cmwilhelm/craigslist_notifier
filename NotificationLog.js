var fs = require('fs');


function NotificationLog () {
  this._store = './seen.json';
  this._list = require(this._store);
}

NotificationLog.prototype = {
  wasSeen: function (listing) {
    return this._list.indexOf(listing.url) !== -1;
  },
  add: function (listing) {
    this._list.unshift(listing.url);
    this._list = this._list.slice(0, 2000);
    this._save()
  },
  _save: function () {
    fs.writeFile(this._store, JSON.stringify(this._list));
  }
};


module.exports = NotificationLog;