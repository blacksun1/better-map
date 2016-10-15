# better-map

Map object extended with extra functional goodness.

## Usage

Grab the package and add to your project

```bash
npm install --save better-map
```

Then add it to your code

```js
const BetterMap = require('better-map');
```

## API

### Constructor

Takes an optional parameter of an iteratable object otherwise it returns an
empty map.

```js
const myMap = new BetterMap();
expect(myMap.size).to.equal(0);
const myOtherMap = new BetterMap([
	['one', 1],
	['two', 2]
]);
expect(myOtherMap.size).to.equal(2);
```

### entriesArray

Returns all of the entries as an array in the format of an array of arrays with
key then value. Entries are returned in the order that they were added.

```js
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.entriesArray();
expect(actual).to.equal([
	['one', 1],
	['two', 2]
]);
```

### keysArray

Returns all of the keys as an array. Keys are returned in the order that the
entries were added.

```js
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.keysArray();
expect(actual).to.equal(['one', 'two']);
```

### valuesArray

Returns all of the values as an array. Values are returned in the order that
the entries were added.

```js
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.valuesArray();
expect(actual).to.equal([1, 2]);
```

### map

Takes a `callback` function which it calls for every entry in the map and
returns an array of the results of each call.

The callback function takes `value`, `key`, `map`. The value of the array entry
will be the value returned from the callback.

```js
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.map((value, key) => `${key} = ${value}`);
expect(actual).to.equal(['one = 1', 'two = 2']);
```

### reduce

Takes a `callback` and an `initialValue` function. It calls the `callback`
function for every entry in the map and returns a single reduced value.

The callback function takes `previousValue`, `value`, `key`, `map`. The
value of the array entry will be the value returned from the callback.
`previousValue` will be `undefined` if an `initialValue` is not given.

```js
const test = new BetterMap([ ['one', 1], ['two', 2] ]);
const actual = test.reduce((pv, cv) => pv + cv, 0);
expect(actual).to.equal(3);
```
