import {
  moduleFor,
  test
} from 'ember-qunit';

import cleanLocalStorage from '../../helpers/clean-local-storage';

moduleFor('service:local-storage-wrapper', {});

test('It can add a key with default namespace', function (assert){
  const service = this.subject();
  service.setItem('testKey', {things: 'someStuff'});
  const result = localStorage.getItem('ember-local-storage.testKey');

  assert.equal(result, '{"things":"someStuff"}');

  cleanLocalStorage(service, ['testKey']);
});

test('Adds key with custom namespace', function (assert){
  const service = this.subject({namespace: 'test'});
  const objectToStore = {things: 'someStuff'};
  service.setItem('testKey', objectToStore);
  const result = localStorage.getItem('test.testKey');

  assert.deepEqual(result, '{"things":"someStuff"}');
  cleanLocalStorage(service, ['testKey']);
});

test('retreives a key', function (assert){
  const service = this.subject();
  const objectToStore = {things: 'someStuff'};
  localStorage.setItem('ember-local-storage.setKey', JSON.stringify(objectToStore));
  const result = service.getItem('setKey');

  assert.deepEqual(result, objectToStore);
  cleanLocalStorage(service, ['setKey']);
});

test('return undefined when key not found', function (assert) {
  const service = this.subject();
  const result = service.getItem('nonsense');

  assert.equal(result, undefined);
});

test('Return false when in time to live period', function (assert) {
  const service = this.subject();
  const objectWithTTL = {dobby: 'House Elf'};
  service.setItem('dobby', objectWithTTL ,{ttl: 23});

  assert.equal(service.keyExpired('dobby'), false);
  cleanLocalStorage(service, ['dobby']);
});

test('Returns true when outside expiry period', function (assert) {
  const service = this.subject();
  const objectWithTTL = {dobby: 'House Elf'};

  service.setItem('dobby', objectWithTTL ,{ttl: 23});

  const futureDate = new Date().setTime(new Date().getTime() + 24);

  assert.equal(service.keyExpired('dobby', futureDate), true);
  cleanLocalStorage(service, ['dobby', '_ttl_dobby']);
});

test('If expiry key not present return true for key expired', function (assert) {
  const service = this.subject();
  const objectWithNoTTL = { hermione: 'Witch' };
  service.setItem('hermione', objectWithNoTTL);

  assert.ok(service.keyExpired('hermione'));
  cleanLocalStorage(service, ['hermione']);
});

test('Can add a raw key', function (assert) {
  const service = this.subject();
  const rawString = "Bertie Bot's Every Flavoured Beans";
  service.setRawItem('bertie', rawString);

  const result = localStorage.getItem('ember-local-storage.bertie');

  assert.equal(result, rawString);
  cleanLocalStorage(service, ['bertie']);
});

test('Can retreive a raw key', function (assert) {
  const service = this.subject();
  const rawString = "Bertie Bot's Every Flavoured Beans";
  service.setRawItem('bertie', rawString);

  const result = service.getRawItem('bertie');

  assert.equal(result, rawString);
  cleanLocalStorage(service, ['bertie']);
});

test('Can delete a ley', function (assert) {
  const service = this.subject();
  const rawString = "Bertie Bot's Every Flavoured Beans";
  service.setRawItem('bertie', rawString);

  const result = localStorage.getItem('ember-local-storage.bertie');
  assert.equal(result, rawString);

  service.removeItem('bertie');

  const noResult = localStorage.getItem('ember-local-storage.bertie');
  assert.equal(noResult, null);
  cleanLocalStorage(service, ['bertie']);
});
