# eslint-plugin-lodash-to-native

**Info**

**node** version >= `10`

**Install**

1. **esLint**

`npm i eslint --save-dev`

2. **плагин**

`npm i https://github.com/vlad8zavr/eslint-plugin-lodash-to-native.git --save-dev`

3. в файл `.eslintrc.js` добавить следующее:

```javascript
"plugins": [
    "lodash-to-native"
],
"rules": {
    "lodash-to-native/map": "warn"
},
```

**Examples**

1. **Situation 1**

transforms this: 

```javascript
let collection = [1, 2, 3];
let fn = function(a) { return a + 1; }
let newArr = _.map(collection, fn);
```

into this: 

```javascript
let collection = [1, 2, 3];
let fn = function(a) { return a + 1; }
let newArr = (collection instanceof Array) ? collection.map(fn) : _.map(collection, fn);
```

2. **Situation 2**

transforms this: 

```javascript
let fn = function(a) { return a + 1; }
let newArr = _.map([1,2,3], fn);
```

into this

```javascript
let fn = function(a) { return a + 1; }
let newArr = [1,2,3].map(fn);
```