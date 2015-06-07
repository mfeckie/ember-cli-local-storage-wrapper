import Ember from 'ember';

export default Ember.Route.extend({
  localStorage: Ember.inject.service(),
  model: function () {
    var ls = this.get('localStorage');
    ls.setItem('thing', {name: 'thing1'});
    return ls.getItem('thing');
  }
});
