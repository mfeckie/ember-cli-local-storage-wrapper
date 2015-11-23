import {
  moduleFor,
  test
} from 'ember-qunit';

import cleanLocalStorage from '../../helpers/clean-local-storage';

moduleFor('service:local-storage-wrapper', {});

test('It can add a key with default namespace', function (assert){
  var service = this.subject();
  service.setItem('testKey', {things: 'someStuff'});
  var result = localStorage.getItem('ember-local-storage.testKey');

  assert.equal(result, '{"things":"someStuff"}');

  cleanLocalStorage(service, ['testKey']);
});

test('Adds key with custom namespace', function (assert){
  var service = this.subject({namespace: 'test'});
  var objectToStore = {things: 'someStuff'};
  service.setItem('testKey', objectToStore);
  var result = localStorage.getItem('test.testKey');

  assert.deepEqual(result, '{"things":"someStuff"}');
  cleanLocalStorage(service, ['testKey']);
});

test('retreives a key', function (assert){
  var service = this.subject();
  var objectToStore = {things: 'someStuff'};
  localStorage.setItem('ember-local-storage.setKey', JSON.stringify(objectToStore));
  var result = service.getItem('setKey');

  assert.deepEqual(result, objectToStore);
  cleanLocalStorage(service, ['setKey']);
});

test('return undefined when key not found', function (assert) {
  var service = this.subject();
  var result = service.getItem('nonsense');

  assert.equal(result, undefined);
});

test('Return false when in time to live period', function (assert) {
  var service = this.subject();
  var objectWithTTL = {dobby: 'House Elf'};
  service.setItem('dobby', objectWithTTL ,{ttl: 23});

  assert.equal(service.keyExpired('dobby'), false);
  cleanLocalStorage(service, ['dobby']);
});

test('Returns true when outside expiry period', function (assert) {
  var service = this.subject();
  var objectWithTTL = {dobby: 'House Elf'};

  service.setItem('dobby', objectWithTTL ,{ttl: 23});

  var futureDate = new Date().setTime(new Date().getTime() + 24);

  assert.equal(service.keyExpired('dobby', futureDate), true);
  cleanLocalStorage(service, ['dobby', '_ttl_dobby']);
});

test('If expiry key not present return true for key expired', function (assert) {
  var service = this.subject();
  var objectWithNoTTL = { hermione: 'Witch' };
  service.setItem('hermione', objectWithNoTTL);

  assert.ok(service.keyExpired('hermione'));
  cleanLocalStorage(service, ['hermione']);
});
