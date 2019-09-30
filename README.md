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

## При тестировании на astexplorer.net используется следующий код

```javascript
module.exports = {
    meta: {
        docs: {
            description: "validate map method in lodash",
            category: "Best Practices",
            recommended: true
        },
      	fixable: "code",
        schema: []
    },
    create: function(context) {
        return {
            CallExpression(node) {
              
              if (!(node.callee.object.name === "_" && 
                      node.callee.property.name === 'map')) return;

                
                const arg1 = (node.arguments.length > 0) ? node.arguments[0] : {};
                const argOthers = (node.arguments.length > 1) ? node.arguments.slice(1) : [];
                const sourceCode = context.getSourceCode();

                // arg1.type === Identifier | ArrayExpression
              
              	console.log(arg1.name);

                let sourceCodeArgs = '';

                for (let i = 0; i < argOthers.length; i++) {
                    sourceCodeArgs = (i === 0) 
                        ? `${sourceCode.getText(argOthers[i])}`
                        : ` , ${sourceCode.getText(argOthers[i])}`
                }

                console.log(sourceCodeArgs);
              
              if (arg1.type === 'Identifier') {
                
                 // in order not to let recursion
                    const parent = node.parent;
                    if (parent.type === 'ConditionalExpression' &&
                        sourceCode.getText(parent.test).match('instanceof Array')) return
                
              	context.report({
                        message: 'Use native array (identifier)',
                        node: node,
                        fix: function (fixer) {
                            const newCode = `(${arg1.name} instanceof Array) ? ${sourceCode.getText(arg1)}.map(${sourceCodeArgs}) : `
                            return [
                                fixer.insertTextBefore(node, newCode)
                            ]
                        }
                   })
              }
              
              else if (arg1.type === 'ArrayExpression') {
                    context.report({
                        message: 'Use native array (array)',
                        node: node,
                        fix: function (fixer) {
                            return fixer.replaceText(node, `${sourceCode.getText(arg1)}.map(${sourceCodeArgs})`);
                        }
                    })
                }
                
            }
        };
    }
};
```

**esLint 4**

![how to](/screens/screen-astexplorer.png)
Format: ![how to](url)

`(screens/screen-astexplorer.png)`