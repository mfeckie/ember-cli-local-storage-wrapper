[ ![Codeship Status for mfeckie/ember-cli-local-storage-wrapper](https://codeship.com/projects/a197c120-ef37-0132-2d22-428b5d81b233/status?branch=master)](https://codeship.com/projects/84317)

# Ember-cli-local-storage-wrapper

Super slim interface for local storage.

## Usage
If you want to namespace your keys, override the `namespace` property:

`services/local-storage.js`

```js
import LocalStorage from 'ember-cli-local-storage-wrapper/services/local-storage-wrapper';

export default LocalStorage.extend({
  namespace: 'myCustomNamespace'
});
```

Then to use it in your application

```js
import Ember from 'ember';

export default Ember.Route.extend({
  localStorage: Ember.inject.service(),
  model: function (params) {
    var ls = this.get('localStorage');
    return ls.getItem(params.id);
  },
  actions: {
    save: function (item) {
      this.get('localStorage').setItem('someDefaultKey', item);
    }
  }
});
```

## Available functions

`setItem(key, object, [options])`

Available options

{ttl: timeInSeconds} -> Sets an expiry period for the key, which you can use later to decide if it needs a refresh

`getItem(key)`

Returns the object you pushed into the store.

`setRawItem(key, value)`

Sets a plain string item, rather than serializing an object.

`getRawItem(key)`

Returns the plain string, rather than parsed object.

`keyExpired(key)`

Return true if the key is past its expiry time.


## Installation

* `ember install ember-cli-local-storage-wrapper`

## Running local repo

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember try:testall`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Contributions

Contributions for bug fixes are welcome with tests and documentation. Please reach out to me if you're thinking about adding a feature before sending a pull request. This reduces the likelihood of doing work that won't be merged. If you're forking for your own project then of course knock yourself out and go crazy!

If you want to make a suggestion, please open an issue on Github.

Whatever happens, remember, **I put this out here for free**, so if you don't like, don't agree or it doesn't work the way you want - please still be polite and constructive.
