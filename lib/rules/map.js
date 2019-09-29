
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

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

                let sourceCodeArgs = '';

                for (let i = 0; i < argOthers.length; i++) {
                    sourceCodeArgs = (i === 0) 
                        ? `${sourceCode.getText(argOthers[i])}`
                        : ` , ${sourceCode.getText(argOthers[i])}`
                }

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
