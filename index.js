"use strict";

var requireindex = require("requireindex");

// import all rules in lib/rules
module.exports.rules = requireindex(__dirname + "/lib/rules");
