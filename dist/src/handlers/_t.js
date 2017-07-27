"use strict";
exports.__esModule = true;
var ts = require("typescript");
var utils_1 = require("../utils");
var _1 = require("./");
// Simple translation
function translate(d) {
    return function (signatureItems, identInfo, comments) {
        var tString = signatureItems[0], _a = signatureItems[2], args = _a === void 0 ? null : _a;
        // Checks
        if (tString.kind != ts.SyntaxKind.StringLiteral) {
            _1.panic('_t: parameter #0 should be a string literal', identInfo);
            return;
        }
        if (!utils_1.validateSinglePlaceholder(args, tString)) {
            _1.panic('_t: optional arguments count mismatch', identInfo);
            return;
        }
        // All ok, add to dict
        var entry = {
            type: 'single',
            entry: tString.text,
            occurences: [identInfo],
            translations: [],
            comments: comments
        };
        var key = utils_1.makeKey(entry);
        if (d[key]) {
            d[key].comments = d[key].comments.concat(entry.comments)
                .filter(function (value, index, self) { return self.indexOf(value) === index; });
            d[key].occurences.push(identInfo);
        }
        else {
            d[key] = entry;
        }
    };
}
exports.translate = translate;
