
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

                const arg1 = (node.arguments.length > 0) ? node.arguments[0] : {};
                const argOthers = (node.arguments.length > 1) ? node.arguments.slice(1) : [];

                // arg1.type === Identifier | ArrayExpression


                if (arg1.type === 'Identifier') {
                    console.log('[IDENTFIER]');

                    context.report({
                        message: 'Use native array (identifier)',
                        node: node
                    })
                }
                else if (arg1.type === 'ArrayExpression') {
                    console.log('[ARRAY EXPRESSION]');

                    context.report({
                        message: 'Use native array (array)',
                        node: node
                    })
                }
                
            }
        };
    }
};
