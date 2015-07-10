import Ember from 'ember';

const stringify = JSON.stringify;
const parse = JSON.parse;

function setItem(key, value) {
  localStorage.setItem(key, stringify(value));
}

function getItem(key) {
  var result = localStorage.getItem(key);
  if (result) {
    return parse(result);
  }
}


export default Ember.Service.extend({
  namespace: 'ember-local-storage',
  setItem: function (key, object) {
    var ttlOptions = arguments[2];

    if (ttlOptions) {
      this._setTTLKey(key, ttlOptions);
    }

    setItem(this._namespacedKey(key), object);
  },
  getItem: function (key) {
    return getItem(this._namespacedKey(key));
  },
  keyExpired: function (key, now) {
    var ttl = this.getItem(`_ttl_${key}`);

    var expiry = new Date(ttl.lastUpdated)
        .setTime(new Date(ttl.lastUpdated)
        .getTime() + ttl.ttl);

    now = now || new Date();

    return now > expiry;
  },
  _setTTLKey: function (key, ttlOptions) {
    var dateTime = new Date();
    setItem(this._namespacedKey(`_ttl_${key}`),
      {ttl: ttlOptions.ttl, lastUpdated: dateTime}
    );
  },
  _namespacedKey: function (key) {
    return this.get('namespace') + `.${key}`;
  }
});
