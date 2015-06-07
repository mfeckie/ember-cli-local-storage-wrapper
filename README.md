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

`setItem(key, object)`


`getItem(key)`



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
