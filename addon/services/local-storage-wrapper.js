import Ember from 'ember';

export default Ember.Service.extend({
  namespace: 'ember-local-storage',
  setItem: function (key, object) {
    var stringified = JSON.stringify(object);
    localStorage.setItem(this._namespacedKey(key), stringified);
  },
  getItem: function (key) {
    return localStorage.getItem(this._namespacedKey(key));
  },
  _namespacedKey: function (key) {
    return this.get('namespace') + `.${key}`;
  }
});
