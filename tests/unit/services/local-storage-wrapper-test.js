import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:local-storage-wrapper', {
  beforeEach: function () {
    localStorage.clear();
  },
  afterEach: function () {
    localStorage.clear();
  }
});

test('It can add a key with default namespace', function (assert){
  var service = this.subject();
  service.setItem('testKey', {things: 'someStuff'});
  var result = localStorage.getItem('ember-local-storage.testKey');
  assert.equal(result, '{"things":"someStuff"}');
});

test('Adds key with custom namespace', function (assert){
  var service = this.subject({namespace: 'test'});
  service.setItem('testKey', {things: 'someStuff'});
  var result = localStorage.getItem('test.testKey');
  assert.equal(result, '{"things":"someStuff"}');
});

test('retreives a key', function (assert){
  var service = this.subject();
  localStorage.setItem('ember-local-storage.setKey', 'setStuff');
  var result = service.getItem('setKey');
  assert.equal(result, 'setStuff');
});
