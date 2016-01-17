import Ember from 'ember';

const stringify = JSON.stringify;
const parse = JSON.parse;

function setItem(key, value) {
  localStorage.setItem(key, stringify(value));
}

function getItem(key) {
  const result = localStorage.getItem(key);
  if (result) {
    return parse(result);
  }
}


export default Ember.Service.extend({
  namespace: 'ember-local-storage',
  setItem (key, object) {
    const ttlOptions = arguments[2];

    if (ttlOptions) {
      this._setTTLKey(key, ttlOptions);
    }

    setItem(this._namespacedKey(key), object);
  },
  getItem (key) {
    return getItem(this._namespacedKey(key));
  },
  keyExpired (key, now = new Date()) {
    const ttl = this.getItem(`_ttl_${key}`);
    if (ttl) {
      const expiry = new Date(ttl.lastUpdated)
          .setTime(new Date(ttl.lastUpdated)
          .getTime() + ttl.ttl);

      return now > expiry;
    }
    return true;
  },
  _setTTLKey (key, ttlOptions) {
    const dateTime = new Date();
    setItem(this._namespacedKey(`_ttl_${key}`),
      {ttl: ttlOptions.ttl, lastUpdated: dateTime}
    );
  },
  _namespacedKey (key) {
    return this.get('namespace') + `.${key}`;
  }
});
