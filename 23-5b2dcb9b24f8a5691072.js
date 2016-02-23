webpackJsonp([23],{

/***/ "./node_modules/escodegen/escodegen.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	  Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
	  Copyright (C) 2015 Ingvar Stepanyan <me@rreverser.com>
	  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
	  Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
	  Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
	  Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
	  Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
	  Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
	  Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
	  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
	  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
	  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
	
	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:
	
	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.
	
	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	/*global exports:true, require:true, global:true*/
	(function () {
	    'use strict';
	
	    var Syntax,
	        Precedence,
	        BinaryPrecedence,
	        SourceNode,
	        estraverse,
	        esutils,
	        isArray,
	        base,
	        indent,
	        json,
	        renumber,
	        hexadecimal,
	        quotes,
	        escapeless,
	        newline,
	        space,
	        parentheses,
	        semicolons,
	        safeConcatenation,
	        directive,
	        extra,
	        parse,
	        sourceMap,
	        sourceCode,
	        preserveBlankLines,
	        FORMAT_MINIFY,
	        FORMAT_DEFAULTS;
	
	    estraverse = __webpack_require__("./node_modules/estraverse/estraverse.js");
	    esutils = __webpack_require__("./node_modules/esutils/lib/utils.js");
	
	    Syntax = estraverse.Syntax;
	
	    // Generation is done by generateExpression.
	    function isExpression(node) {
	        return CodeGenerator.Expression.hasOwnProperty(node.type);
	    }
	
	    // Generation is done by generateStatement.
	    function isStatement(node) {
	        return CodeGenerator.Statement.hasOwnProperty(node.type);
	    }
	
	    Precedence = {
	        Sequence: 0,
	        Yield: 1,
	        Await: 1,
	        Assignment: 1,
	        Conditional: 2,
	        ArrowFunction: 2,
	        LogicalOR: 3,
	        LogicalAND: 4,
	        BitwiseOR: 5,
	        BitwiseXOR: 6,
	        BitwiseAND: 7,
	        Equality: 8,
	        Relational: 9,
	        BitwiseSHIFT: 10,
	        Additive: 11,
	        Multiplicative: 12,
	        Unary: 13,
	        Postfix: 14,
	        Call: 15,
	        New: 16,
	        TaggedTemplate: 17,
	        Member: 18,
	        Primary: 19
	    };
	
	    BinaryPrecedence = {
	        '||': Precedence.LogicalOR,
	        '&&': Precedence.LogicalAND,
	        '|': Precedence.BitwiseOR,
	        '^': Precedence.BitwiseXOR,
	        '&': Precedence.BitwiseAND,
	        '==': Precedence.Equality,
	        '!=': Precedence.Equality,
	        '===': Precedence.Equality,
	        '!==': Precedence.Equality,
	        'is': Precedence.Equality,
	        'isnt': Precedence.Equality,
	        '<': Precedence.Relational,
	        '>': Precedence.Relational,
	        '<=': Precedence.Relational,
	        '>=': Precedence.Relational,
	        'in': Precedence.Relational,
	        'instanceof': Precedence.Relational,
	        '<<': Precedence.BitwiseSHIFT,
	        '>>': Precedence.BitwiseSHIFT,
	        '>>>': Precedence.BitwiseSHIFT,
	        '+': Precedence.Additive,
	        '-': Precedence.Additive,
	        '*': Precedence.Multiplicative,
	        '%': Precedence.Multiplicative,
	        '/': Precedence.Multiplicative
	    };
	
	    //Flags
	    var F_ALLOW_IN = 1,
	        F_ALLOW_CALL = 1 << 1,
	        F_ALLOW_UNPARATH_NEW = 1 << 2,
	        F_FUNC_BODY = 1 << 3,
	        F_DIRECTIVE_CTX = 1 << 4,
	        F_SEMICOLON_OPT = 1 << 5;
	
	    //Expression flag sets
	    //NOTE: Flag order:
	    // F_ALLOW_IN
	    // F_ALLOW_CALL
	    // F_ALLOW_UNPARATH_NEW
	    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
	        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
	        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
	        E_TFF = F_ALLOW_IN,
	        E_FFT = F_ALLOW_UNPARATH_NEW,
	        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
	
	    //Statement flag sets
	    //NOTE: Flag order:
	    // F_ALLOW_IN
	    // F_FUNC_BODY
	    // F_DIRECTIVE_CTX
	    // F_SEMICOLON_OPT
	    var S_TFFF = F_ALLOW_IN,
	        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
	        S_FFFF = 0x00,
	        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
	        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
	
	    function getDefaultOptions() {
	        // default options
	        return {
	            indent: null,
	            base: null,
	            parse: null,
	            comment: false,
	            format: {
	                indent: {
	                    style: '    ',
	                    base: 0,
	                    adjustMultilineComment: false
	                },
	                newline: '\n',
	                space: ' ',
	                json: false,
	                renumber: false,
	                hexadecimal: false,
	                quotes: 'single',
	                escapeless: false,
	                compact: false,
	                parentheses: true,
	                semicolons: true,
	                safeConcatenation: false,
	                preserveBlankLines: false
	            },
	            moz: {
	                comprehensionExpressionStartsWithAssignment: false,
	                starlessGenerator: false
	            },
	            sourceMap: null,
	            sourceMapRoot: null,
	            sourceMapWithCode: false,
	            directive: false,
	            raw: true,
	            verbatim: null,
	            sourceCode: null
	        };
	    }
	
	    function stringRepeat(str, num) {
	        var result = '';
	
	        for (num |= 0; num > 0; num >>>= 1, str += str) {
	            if (num & 1) {
	                result += str;
	            }
	        }
	
	        return result;
	    }
	
	    isArray = Array.isArray;
	    if (!isArray) {
	        isArray = function isArray(array) {
	            return Object.prototype.toString.call(array) === '[object Array]';
	        };
	    }
	
	    function hasLineTerminator(str) {
	        return (/[\r\n]/g).test(str);
	    }
	
	    function endsWithLineTerminator(str) {
	        var len = str.length;
	        return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
	    }
	
	    function merge(target, override) {
	        var key;
	        for (key in override) {
	            if (override.hasOwnProperty(key)) {
	                target[key] = override[key];
	            }
	        }
	        return target;
	    }
	
	    function updateDeeply(target, override) {
	        var key, val;
	
	        function isHashObject(target) {
	            return typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
	        }
	
	        for (key in override) {
	            if (override.hasOwnProperty(key)) {
	                val = override[key];
	                if (isHashObject(val)) {
	                    if (isHashObject(target[key])) {
	                        updateDeeply(target[key], val);
	                    } else {
	                        target[key] = updateDeeply({}, val);
	                    }
	                } else {
	                    target[key] = val;
	                }
	            }
	        }
	        return target;
	    }
	
	    function generateNumber(value) {
	        var result, point, temp, exponent, pos;
	
	        if (value !== value) {
	            throw new Error('Numeric literal whose value is NaN');
	        }
	        if (value < 0 || (value === 0 && 1 / value < 0)) {
	            throw new Error('Numeric literal whose value is negative');
	        }
	
	        if (value === 1 / 0) {
	            return json ? 'null' : renumber ? '1e400' : '1e+400';
	        }
	
	        result = '' + value;
	        if (!renumber || result.length < 3) {
	            return result;
	        }
	
	        point = result.indexOf('.');
	        if (!json && result.charCodeAt(0) === 0x30  /* 0 */ && point === 1) {
	            point = 0;
	            result = result.slice(1);
	        }
	        temp = result;
	        result = result.replace('e+', 'e');
	        exponent = 0;
	        if ((pos = temp.indexOf('e')) > 0) {
	            exponent = +temp.slice(pos + 1);
	            temp = temp.slice(0, pos);
	        }
	        if (point >= 0) {
	            exponent -= temp.length - point - 1;
	            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
	        }
	        pos = 0;
	        while (temp.charCodeAt(temp.length + pos - 1) === 0x30  /* 0 */) {
	            --pos;
	        }
	        if (pos !== 0) {
	            exponent -= pos;
	            temp = temp.slice(0, pos);
	        }
	        if (exponent !== 0) {
	            temp += 'e' + exponent;
	        }
	        if ((temp.length < result.length ||
	                    (hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length)) &&
	                +temp === value) {
	            result = temp;
	        }
	
	        return result;
	    }
	
	    // Generate valid RegExp expression.
	    // This function is based on https://github.com/Constellation/iv Engine
	
	    function escapeRegExpCharacter(ch, previousIsBackslash) {
	        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
	        if ((ch & ~1) === 0x2028) {
	            return (previousIsBackslash ? 'u' : '\\u') + ((ch === 0x2028) ? '2028' : '2029');
	        } else if (ch === 10 || ch === 13) {  // \n, \r
	            return (previousIsBackslash ? '' : '\\') + ((ch === 10) ? 'n' : 'r');
	        }
	        return String.fromCharCode(ch);
	    }
	
	    function generateRegExp(reg) {
	        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
	
	        result = reg.toString();
	
	        if (reg.source) {
	            // extract flag from toString result
	            match = result.match(/\/([^/]*)$/);
	            if (!match) {
	                return result;
	            }
	
	            flags = match[1];
	            result = '';
	
	            characterInBrack = false;
	            previousIsBackslash = false;
	            for (i = 0, iz = reg.source.length; i < iz; ++i) {
	                ch = reg.source.charCodeAt(i);
	
	                if (!previousIsBackslash) {
	                    if (characterInBrack) {
	                        if (ch === 93) {  // ]
	                            characterInBrack = false;
	                        }
	                    } else {
	                        if (ch === 47) {  // /
	                            result += '\\';
	                        } else if (ch === 91) {  // [
	                            characterInBrack = true;
	                        }
	                    }
	                    result += escapeRegExpCharacter(ch, previousIsBackslash);
	                    previousIsBackslash = ch === 92;  // \
	                } else {
	                    // if new RegExp("\\\n') is provided, create /\n/
	                    result += escapeRegExpCharacter(ch, previousIsBackslash);
	                    // prevent like /\\[/]/
	                    previousIsBackslash = false;
	                }
	            }
	
	            return '/' + result + '/' + flags;
	        }
	
	        return result;
	    }
	
	    function escapeAllowedCharacter(code, next) {
	        var hex;
	
	        if (code === 0x08  /* \b */) {
	            return '\\b';
	        }
	
	        if (code === 0x0C  /* \f */) {
	            return '\\f';
	        }
	
	        if (code === 0x09  /* \t */) {
	            return '\\t';
	        }
	
	        hex = code.toString(16).toUpperCase();
	        if (json || code > 0xFF) {
	            return '\\u' + '0000'.slice(hex.length) + hex;
	        } else if (code === 0x0000 && !esutils.code.isDecimalDigit(next)) {
	            return '\\0';
	        } else if (code === 0x000B  /* \v */) { // '\v'
	            return '\\x0B';
	        } else {
	            return '\\x' + '00'.slice(hex.length) + hex;
	        }
	    }
	
	    function escapeDisallowedCharacter(code) {
	        if (code === 0x5C  /* \ */) {
	            return '\\\\';
	        }
	
	        if (code === 0x0A  /* \n */) {
	            return '\\n';
	        }
	
	        if (code === 0x0D  /* \r */) {
	            return '\\r';
	        }
	
	        if (code === 0x2028) {
	            return '\\u2028';
	        }
	
	        if (code === 0x2029) {
	            return '\\u2029';
	        }
	
	        throw new Error('Incorrectly classified character');
	    }
	
	    function escapeDirective(str) {
	        var i, iz, code, quote;
	
	        quote = quotes === 'double' ? '"' : '\'';
	        for (i = 0, iz = str.length; i < iz; ++i) {
	            code = str.charCodeAt(i);
	            if (code === 0x27  /* ' */) {
	                quote = '"';
	                break;
	            } else if (code === 0x22  /* " */) {
	                quote = '\'';
	                break;
	            } else if (code === 0x5C  /* \ */) {
	                ++i;
	            }
	        }
	
	        return quote + str + quote;
	    }
	
	    function escapeString(str) {
	        var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
	
	        for (i = 0, len = str.length; i < len; ++i) {
	            code = str.charCodeAt(i);
	            if (code === 0x27  /* ' */) {
	                ++singleQuotes;
	            } else if (code === 0x22  /* " */) {
	                ++doubleQuotes;
	            } else if (code === 0x2F  /* / */ && json) {
	                result += '\\';
	            } else if (esutils.code.isLineTerminator(code) || code === 0x5C  /* \ */) {
	                result += escapeDisallowedCharacter(code);
	                continue;
	            } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 0x20  /* SP */ || !json && !escapeless && (code < 0x20  /* SP */ || code > 0x7E  /* ~ */))) {
	                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
	                continue;
	            }
	            result += String.fromCharCode(code);
	        }
	
	        single = !(quotes === 'double' || (quotes === 'auto' && doubleQuotes < singleQuotes));
	        quote = single ? '\'' : '"';
	
	        if (!(single ? singleQuotes : doubleQuotes)) {
	            return quote + result + quote;
	        }
	
	        str = result;
	        result = quote;
	
	        for (i = 0, len = str.length; i < len; ++i) {
	            code = str.charCodeAt(i);
	            if ((code === 0x27  /* ' */ && single) || (code === 0x22  /* " */ && !single)) {
	                result += '\\';
	            }
	            result += String.fromCharCode(code);
	        }
	
	        return result + quote;
	    }
	
	    /**
	     * flatten an array to a string, where the array can contain
	     * either strings or nested arrays
	     */
	    function flattenToString(arr) {
	        var i, iz, elem, result = '';
	        for (i = 0, iz = arr.length; i < iz; ++i) {
	            elem = arr[i];
	            result += isArray(elem) ? flattenToString(elem) : elem;
	        }
	        return result;
	    }
	
	    /**
	     * convert generated to a SourceNode when source maps are enabled.
	     */
	    function toSourceNodeWhenNeeded(generated, node) {
	        if (!sourceMap) {
	            // with no source maps, generated is either an
	            // array or a string.  if an array, flatten it.
	            // if a string, just return it
	            if (isArray(generated)) {
	                return flattenToString(generated);
	            } else {
	                return generated;
	            }
	        }
	        if (node == null) {
	            if (generated instanceof SourceNode) {
	                return generated;
	            } else {
	                node = {};
	            }
	        }
	        if (node.loc == null) {
	            return new SourceNode(null, null, sourceMap, generated, node.name || null);
	        }
	        return new SourceNode(node.loc.start.line, node.loc.start.column, (sourceMap === true ? node.loc.source || null : sourceMap), generated, node.name || null);
	    }
	
	    function noEmptySpace() {
	        return (space) ? space : ' ';
	    }
	
	    function join(left, right) {
	        var leftSource,
	            rightSource,
	            leftCharCode,
	            rightCharCode;
	
	        leftSource = toSourceNodeWhenNeeded(left).toString();
	        if (leftSource.length === 0) {
	            return [right];
	        }
	
	        rightSource = toSourceNodeWhenNeeded(right).toString();
	        if (rightSource.length === 0) {
	            return [left];
	        }
	
	        leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
	        rightCharCode = rightSource.charCodeAt(0);
	
	        if ((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode ||
	            esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) ||
	            leftCharCode === 0x2F  /* / */ && rightCharCode === 0x69  /* i */) { // infix word operators all start with `i`
	            return [left, noEmptySpace(), right];
	        } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) ||
	                esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
	            return [left, right];
	        }
	        return [left, space, right];
	    }
	
	    function addIndent(stmt) {
	        return [base, stmt];
	    }
	
	    function withIndent(fn) {
	        var previousBase;
	        previousBase = base;
	        base += indent;
	        fn(base);
	        base = previousBase;
	    }
	
	    function calculateSpaces(str) {
	        var i;
	        for (i = str.length - 1; i >= 0; --i) {
	            if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
	                break;
	            }
	        }
	        return (str.length - 1) - i;
	    }
	
	    function adjustMultilineComment(value, specialBase) {
	        var array, i, len, line, j, spaces, previousBase, sn;
	
	        array = value.split(/\r\n|[\r\n]/);
	        spaces = Number.MAX_VALUE;
	
	        // first line doesn't have indentation
	        for (i = 1, len = array.length; i < len; ++i) {
	            line = array[i];
	            j = 0;
	            while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
	                ++j;
	            }
	            if (spaces > j) {
	                spaces = j;
	            }
	        }
	
	        if (typeof specialBase !== 'undefined') {
	            // pattern like
	            // {
	            //   var t = 20;  /*
	            //                 * this is comment
	            //                 */
	            // }
	            previousBase = base;
	            if (array[1][spaces] === '*') {
	                specialBase += ' ';
	            }
	            base = specialBase;
	        } else {
	            if (spaces & 1) {
	                // /*
	                //  *
	                //  */
	                // If spaces are odd number, above pattern is considered.
	                // We waste 1 space.
	                --spaces;
	            }
	            previousBase = base;
	        }
	
	        for (i = 1, len = array.length; i < len; ++i) {
	            sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
	            array[i] = sourceMap ? sn.join('') : sn;
	        }
	
	        base = previousBase;
	
	        return array.join('\n');
	    }
	
	    function generateComment(comment, specialBase) {
	        if (comment.type === 'Line') {
	            if (endsWithLineTerminator(comment.value)) {
	                return '//' + comment.value;
	            } else {
	                // Always use LineTerminator
	                var result = '//' + comment.value;
	                if (!preserveBlankLines) {
	                    result += '\n';
	                }
	                return result;
	            }
	        }
	        if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
	            return adjustMultilineComment('/*' + comment.value + '*/', specialBase);
	        }
	        return '/*' + comment.value + '*/';
	    }
	
	    function addComments(stmt, result) {
	        var i, len, comment, save, tailingToStatement, specialBase, fragment,
	            extRange, range, prevRange, prefix, infix, suffix, count;
	
	        if (stmt.leadingComments && stmt.leadingComments.length > 0) {
	            save = result;
	
	            if (preserveBlankLines) {
	                comment = stmt.leadingComments[0];
	                result = [];
	
	                extRange = comment.extendedRange;
	                range = comment.range;
	
	                prefix = sourceCode.substring(extRange[0], range[0]);
	                count = (prefix.match(/\n/g) || []).length;
	                if (count > 0) {
	                    result.push(stringRepeat('\n', count));
	                    result.push(addIndent(generateComment(comment)));
	                } else {
	                    result.push(prefix);
	                    result.push(generateComment(comment));
	                }
	
	                prevRange = range;
	
	                for (i = 1, len = stmt.leadingComments.length; i < len; i++) {
	                    comment = stmt.leadingComments[i];
	                    range = comment.range;
	
	                    infix = sourceCode.substring(prevRange[1], range[0]);
	                    count = (infix.match(/\n/g) || []).length;
	                    result.push(stringRepeat('\n', count));
	                    result.push(addIndent(generateComment(comment)));
	
	                    prevRange = range;
	                }
	
	                suffix = sourceCode.substring(range[1], extRange[1]);
	                count = (suffix.match(/\n/g) || []).length;
	                result.push(stringRepeat('\n', count));
	            } else {
	                comment = stmt.leadingComments[0];
	                result = [];
	                if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
	                    result.push('\n');
	                }
	                result.push(generateComment(comment));
	                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                    result.push('\n');
	                }
	
	                for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
	                    comment = stmt.leadingComments[i];
	                    fragment = [generateComment(comment)];
	                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
	                        fragment.push('\n');
	                    }
	                    result.push(addIndent(fragment));
	                }
	            }
	
	            result.push(addIndent(save));
	        }
	
	        if (stmt.trailingComments) {
	
	            if (preserveBlankLines) {
	                comment = stmt.trailingComments[0];
	                extRange = comment.extendedRange;
	                range = comment.range;
	
	                prefix = sourceCode.substring(extRange[0], range[0]);
	                count = (prefix.match(/\n/g) || []).length;
	
	                if (count > 0) {
	                    result.push(stringRepeat('\n', count));
	                    result.push(addIndent(generateComment(comment)));
	                } else {
	                    result.push(prefix);
	                    result.push(generateComment(comment));
	                }
	            } else {
	                tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
	                specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([base, result, indent]).toString()));
	                for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
	                    comment = stmt.trailingComments[i];
	                    if (tailingToStatement) {
	                        // We assume target like following script
	                        //
	                        // var t = 20;  /**
	                        //               * This is comment of t
	                        //               */
	                        if (i === 0) {
	                            // first case
	                            result = [result, indent];
	                        } else {
	                            result = [result, specialBase];
	                        }
	                        result.push(generateComment(comment, specialBase));
	                    } else {
	                        result = [result, addIndent(generateComment(comment))];
	                    }
	                    if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                        result = [result, '\n'];
	                    }
	                }
	            }
	        }
	
	        return result;
	    }
	
	    function generateBlankLines(start, end, result) {
	        var j, newlineCount = 0;
	
	        for (j = start; j < end; j++) {
	            if (sourceCode[j] === '\n') {
	                newlineCount++;
	            }
	        }
	
	        for (j = 1; j < newlineCount; j++) {
	            result.push(newline);
	        }
	    }
	
	    function parenthesize(text, current, should) {
	        if (current < should) {
	            return ['(', text, ')'];
	        }
	        return text;
	    }
	
	    function generateVerbatimString(string) {
	        var i, iz, result;
	        result = string.split(/\r\n|\n/);
	        for (i = 1, iz = result.length; i < iz; i++) {
	            result[i] = newline + base + result[i];
	        }
	        return result;
	    }
	
	    function generateVerbatim(expr, precedence) {
	        var verbatim, result, prec;
	        verbatim = expr[extra.verbatim];
	
	        if (typeof verbatim === 'string') {
	            result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence);
	        } else {
	            // verbatim is object
	            result = generateVerbatimString(verbatim.content);
	            prec = (verbatim.precedence != null) ? verbatim.precedence : Precedence.Sequence;
	            result = parenthesize(result, prec, precedence);
	        }
	
	        return toSourceNodeWhenNeeded(result, expr);
	    }
	
	    function CodeGenerator() {
	    }
	
	    // Helpers.
	
	    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
	        var result, noLeadingComment, that = this;
	
	        noLeadingComment = !extra.comment || !stmt.leadingComments;
	
	        if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
	            return [space, this.generateStatement(stmt, flags)];
	        }
	
	        if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
	            return ';';
	        }
	
	        withIndent(function () {
	            result = [
	                newline,
	                addIndent(that.generateStatement(stmt, flags))
	            ];
	        });
	
	        return result;
	    };
	
	    CodeGenerator.prototype.maybeBlockSuffix = function (stmt, result) {
	        var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
	        if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
	            return [result, space];
	        }
	        if (ends) {
	            return [result, base];
	        }
	        return [result, newline, base];
	    };
	
	    function generateIdentifier(node) {
	        return toSourceNodeWhenNeeded(node.name, node);
	    }
	
	    function generateAsyncPrefix(node, spaceRequired) {
	        return node.async ? 'async' + (spaceRequired ? noEmptySpace() : space) : '';
	    }
	
	    function generateStarSuffix(node) {
	        var isGenerator = node.generator && !extra.moz.starlessGenerator;
	        return isGenerator ? '*' + space : '';
	    }
	
	    function generateMethodPrefix(prop) {
	        var func = prop.value;
	        if (func.async) {
	            return generateAsyncPrefix(func, !prop.computed);
	        } else {
	            // avoid space before method name
	            return generateStarSuffix(func) ? '*' : '';
	        }
	    }
	
	    CodeGenerator.prototype.generatePattern = function (node, precedence, flags) {
	        if (node.type === Syntax.Identifier) {
	            return generateIdentifier(node);
	        }
	        return this.generateExpression(node, precedence, flags);
	    };
	
	    CodeGenerator.prototype.generateFunctionParams = function (node) {
	        var i, iz, result, hasDefault;
	
	        hasDefault = false;
	
	        if (node.type === Syntax.ArrowFunctionExpression &&
	                !node.rest && (!node.defaults || node.defaults.length === 0) &&
	                node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
	            // arg => { } case
	            result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
	        } else {
	            result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [];
	            result.push('(');
	            if (node.defaults) {
	                hasDefault = true;
	            }
	            for (i = 0, iz = node.params.length; i < iz; ++i) {
	                if (hasDefault && node.defaults[i]) {
	                    // Handle default values.
	                    result.push(this.generateAssignment(node.params[i], node.defaults[i], '=', Precedence.Assignment, E_TTT));
	                } else {
	                    result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT));
	                }
	                if (i + 1 < iz) {
	                    result.push(',' + space);
	                }
	            }
	
	            if (node.rest) {
	                if (node.params.length) {
	                    result.push(',' + space);
	                }
	                result.push('...');
	                result.push(generateIdentifier(node.rest));
	            }
	
	            result.push(')');
	        }
	
	        return result;
	    };
	
	    CodeGenerator.prototype.generateFunctionBody = function (node) {
	        var result, expr;
	
	        result = this.generateFunctionParams(node);
	
	        if (node.type === Syntax.ArrowFunctionExpression) {
	            result.push(space);
	            result.push('=>');
	        }
	
	        if (node.expression) {
	            result.push(space);
	            expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT);
	            if (expr.toString().charAt(0) === '{') {
	                expr = ['(', expr, ')'];
	            }
	            result.push(expr);
	        } else {
	            result.push(this.maybeBlock(node.body, S_TTFF));
	        }
	
	        return result;
	    };
	
	    CodeGenerator.prototype.generateIterationForStatement = function (operator, stmt, flags) {
	        var result = ['for' + space + '('], that = this;
	        withIndent(function () {
	            if (stmt.left.type === Syntax.VariableDeclaration) {
	                withIndent(function () {
	                    result.push(stmt.left.kind + noEmptySpace());
	                    result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
	                });
	            } else {
	                result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT));
	            }
	
	            result = join(result, operator);
	            result = [join(
	                result,
	                that.generateExpression(stmt.right, Precedence.Sequence, E_TTT)
	            ), ')'];
	        });
	        result.push(this.maybeBlock(stmt.body, flags));
	        return result;
	    };
	
	    CodeGenerator.prototype.generatePropertyKey = function (expr, computed) {
	        var result = [];
	
	        if (computed) {
	            result.push('[');
	        }
	
	        result.push(this.generateExpression(expr, Precedence.Sequence, E_TTT));
	        if (computed) {
	            result.push(']');
	        }
	
	        return result;
	    };
	
	    CodeGenerator.prototype.generateAssignment = function (left, right, operator, precedence, flags) {
	        if (Precedence.Assignment < precedence) {
	            flags |= F_ALLOW_IN;
	        }
	
	        return parenthesize(
	            [
	                this.generateExpression(left, Precedence.Call, flags),
	                space + operator + space,
	                this.generateExpression(right, Precedence.Assignment, flags)
	            ],
	            Precedence.Assignment,
	            precedence
	        );
	    };
	
	    CodeGenerator.prototype.semicolon = function (flags) {
	        if (!semicolons && flags & F_SEMICOLON_OPT) {
	            return '';
	        }
	        return ';';
	    };
	
	    // Statements.
	
	    CodeGenerator.Statement = {
	
	        BlockStatement: function (stmt, flags) {
	            var range, content, result = ['{', newline], that = this;
	
	            withIndent(function () {
	                // handle functions without any code
	                if (stmt.body.length === 0 && preserveBlankLines) {
	                    range = stmt.range;
	                    if (range[1] - range[0] > 2) {
	                        content = sourceCode.substring(range[0] + 1, range[1] - 1);
	                        if (content[0] === '\n') {
	                            result = ['{'];
	                        }
	                        result.push(content);
	                    }
	                }
	
	                var i, iz, fragment, bodyFlags;
	                bodyFlags = S_TFFF;
	                if (flags & F_FUNC_BODY) {
	                    bodyFlags |= F_DIRECTIVE_CTX;
	                }
	
	                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
	                    if (preserveBlankLines) {
	                        // handle spaces before the first line
	                        if (i === 0) {
	                            if (stmt.body[0].leadingComments) {
	                                range = stmt.body[0].leadingComments[0].extendedRange;
	                                content = sourceCode.substring(range[0], range[1]);
	                                if (content[0] === '\n') {
	                                    result = ['{'];
	                                }
	                            }
	                            if (!stmt.body[0].leadingComments) {
	                                generateBlankLines(stmt.range[0], stmt.body[0].range[0], result);
	                            }
	                        }
	
	                        // handle spaces between lines
	                        if (i > 0) {
	                            if (!stmt.body[i - 1].trailingComments  && !stmt.body[i].leadingComments) {
	                                generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
	                            }
	                        }
	                    }
	
	                    if (i === iz - 1) {
	                        bodyFlags |= F_SEMICOLON_OPT;
	                    }
	
	                    if (stmt.body[i].leadingComments && preserveBlankLines) {
	                        fragment = that.generateStatement(stmt.body[i], bodyFlags);
	                    } else {
	                        fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags));
	                    }
	
	                    result.push(fragment);
	                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
	                        if (preserveBlankLines && i < iz - 1) {
	                            // don't add a new line if there are leading coments
	                            // in the next statement
	                            if (!stmt.body[i + 1].leadingComments) {
	                                result.push(newline);
	                            }
	                        } else {
	                            result.push(newline);
	                        }
	                    }
	
	                    if (preserveBlankLines) {
	                        // handle spaces after the last line
	                        if (i === iz - 1) {
	                            if (!stmt.body[i].trailingComments) {
	                                generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
	                            }
	                        }
	                    }
	                }
	            });
	
	            result.push(addIndent('}'));
	            return result;
	        },
	
	        BreakStatement: function (stmt, flags) {
	            if (stmt.label) {
	                return 'break ' + stmt.label.name + this.semicolon(flags);
	            }
	            return 'break' + this.semicolon(flags);
	        },
	
	        ContinueStatement: function (stmt, flags) {
	            if (stmt.label) {
	                return 'continue ' + stmt.label.name + this.semicolon(flags);
	            }
	            return 'continue' + this.semicolon(flags);
	        },
	
	        ClassBody: function (stmt, flags) {
	            var result = [ '{', newline], that = this;
	
	            withIndent(function (indent) {
	                var i, iz;
	
	                for (i = 0, iz = stmt.body.length; i < iz; ++i) {
	                    result.push(indent);
	                    result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT));
	                    if (i + 1 < iz) {
	                        result.push(newline);
	                    }
	                }
	            });
	
	            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                result.push(newline);
	            }
	            result.push(base);
	            result.push('}');
	            return result;
	        },
	
	        ClassDeclaration: function (stmt, flags) {
	            var result, fragment;
	            result  = ['class ' + stmt.id.name];
	            if (stmt.superClass) {
	                fragment = join('extends', this.generateExpression(stmt.superClass, Precedence.Assignment, E_TTT));
	                result = join(result, fragment);
	            }
	            result.push(space);
	            result.push(this.generateStatement(stmt.body, S_TFFT));
	            return result;
	        },
	
	        DirectiveStatement: function (stmt, flags) {
	            if (extra.raw && stmt.raw) {
	                return stmt.raw + this.semicolon(flags);
	            }
	            return escapeDirective(stmt.directive) + this.semicolon(flags);
	        },
	
	        DoWhileStatement: function (stmt, flags) {
	            // Because `do 42 while (cond)` is Syntax Error. We need semicolon.
	            var result = join('do', this.maybeBlock(stmt.body, S_TFFF));
	            result = this.maybeBlockSuffix(stmt.body, result);
	            return join(result, [
	                'while' + space + '(',
	                this.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
	                ')' + this.semicolon(flags)
	            ]);
	        },
	
	        CatchClause: function (stmt, flags) {
	            var result, that = this;
	            withIndent(function () {
	                var guard;
	
	                result = [
	                    'catch' + space + '(',
	                    that.generateExpression(stmt.param, Precedence.Sequence, E_TTT),
	                    ')'
	                ];
	
	                if (stmt.guard) {
	                    guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT);
	                    result.splice(2, 0, ' if ', guard);
	                }
	            });
	            result.push(this.maybeBlock(stmt.body, S_TFFF));
	            return result;
	        },
	
	        DebuggerStatement: function (stmt, flags) {
	            return 'debugger' + this.semicolon(flags);
	        },
	
	        EmptyStatement: function (stmt, flags) {
	            return ';';
	        },
	
	        ExportDefaultDeclaration: function (stmt, flags) {
	            var result = [ 'export' ], bodyFlags;
	
	            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;
	
	            // export default HoistableDeclaration[Default]
	            // export default AssignmentExpression[In] ;
	            result = join(result, 'default');
	            if (isStatement(stmt.declaration)) {
	                result = join(result, this.generateStatement(stmt.declaration, bodyFlags));
	            } else {
	                result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags));
	            }
	            return result;
	        },
	
	        ExportNamedDeclaration: function (stmt, flags) {
	            var result = [ 'export' ], bodyFlags, that = this;
	
	            bodyFlags = (flags & F_SEMICOLON_OPT) ? S_TFFT : S_TFFF;
	
	            // export VariableStatement
	            // export Declaration[Default]
	            if (stmt.declaration) {
	                return join(result, this.generateStatement(stmt.declaration, bodyFlags));
	            }
	
	            // export ExportClause[NoReference] FromClause ;
	            // export ExportClause ;
	            if (stmt.specifiers) {
	                if (stmt.specifiers.length === 0) {
	                    result = join(result, '{' + space + '}');
	                } else if (stmt.specifiers[0].type === Syntax.ExportBatchSpecifier) {
	                    result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT));
	                } else {
	                    result = join(result, '{');
	                    withIndent(function (indent) {
	                        var i, iz;
	                        result.push(newline);
	                        for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
	                            result.push(indent);
	                            result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
	                            if (i + 1 < iz) {
	                                result.push(',' + newline);
	                            }
	                        }
	                    });
	                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                        result.push(newline);
	                    }
	                    result.push(base + '}');
	                }
	
	                if (stmt.source) {
	                    result = join(result, [
	                        'from' + space,
	                        // ModuleSpecifier
	                        this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
	                        this.semicolon(flags)
	                    ]);
	                } else {
	                    result.push(this.semicolon(flags));
	                }
	            }
	            return result;
	        },
	
	        ExportAllDeclaration: function (stmt, flags) {
	            // export * FromClause ;
	            return [
	                'export' + space,
	                '*' + space,
	                'from' + space,
	                // ModuleSpecifier
	                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
	                this.semicolon(flags)
	            ];
	        },
	
	        ExpressionStatement: function (stmt, flags) {
	            var result, fragment;
	
	            function isClassPrefixed(fragment) {
	                var code;
	                if (fragment.slice(0, 5) !== 'class') {
	                    return false;
	                }
	                code = fragment.charCodeAt(5);
	                return code === 0x7B  /* '{' */ || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code);
	            }
	
	            function isFunctionPrefixed(fragment) {
	                var code;
	                if (fragment.slice(0, 8) !== 'function') {
	                    return false;
	                }
	                code = fragment.charCodeAt(8);
	                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
	            }
	
	            function isAsyncPrefixed(fragment) {
	                var code, i, iz;
	                if (fragment.slice(0, 5) !== 'async') {
	                    return false;
	                }
	                if (!esutils.code.isWhiteSpace(fragment.charCodeAt(5))) {
	                    return false;
	                }
	                for (i = 6, iz = fragment.length; i < iz; ++i) {
	                    if (!esutils.code.isWhiteSpace(fragment.charCodeAt(i))) {
	                        break;
	                    }
	                }
	                if (i === iz) {
	                    return false;
	                }
	                if (fragment.slice(i, i + 8) !== 'function') {
	                    return false;
	                }
	                code = fragment.charCodeAt(i + 8);
	                return code === 0x28 /* '(' */ || esutils.code.isWhiteSpace(code) || code === 0x2A  /* '*' */ || esutils.code.isLineTerminator(code);
	            }
	
	            result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)];
	            // 12.4 '{', 'function', 'class' is not allowed in this position.
	            // wrap expression with parentheses
	            fragment = toSourceNodeWhenNeeded(result).toString();
	            if (fragment.charCodeAt(0) === 0x7B  /* '{' */ ||  // ObjectExpression
	                    isClassPrefixed(fragment) ||
	                    isFunctionPrefixed(fragment) ||
	                    isAsyncPrefixed(fragment) ||
	                    (directive && (flags & F_DIRECTIVE_CTX) && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string')) {
	                result = ['(', result, ')' + this.semicolon(flags)];
	            } else {
	                result.push(this.semicolon(flags));
	            }
	            return result;
	        },
	
	        ImportDeclaration: function (stmt, flags) {
	            // ES6: 15.2.1 valid import declarations:
	            //     - import ImportClause FromClause ;
	            //     - import ModuleSpecifier ;
	            var result, cursor, that = this;
	
	            // If no ImportClause is present,
	            // this should be `import ModuleSpecifier` so skip `from`
	            // ModuleSpecifier is StringLiteral.
	            if (stmt.specifiers.length === 0) {
	                // import ModuleSpecifier ;
	                return [
	                    'import',
	                    space,
	                    // ModuleSpecifier
	                    this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
	                    this.semicolon(flags)
	                ];
	            }
	
	            // import ImportClause FromClause ;
	            result = [
	                'import'
	            ];
	            cursor = 0;
	
	            // ImportedBinding
	            if (stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier) {
	                result = join(result, [
	                        this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
	                ]);
	                ++cursor;
	            }
	
	            if (stmt.specifiers[cursor]) {
	                if (cursor !== 0) {
	                    result.push(',');
	                }
	
	                if (stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier) {
	                    // NameSpaceImport
	                    result = join(result, [
	                            space,
	                            this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)
	                    ]);
	                } else {
	                    // NamedImports
	                    result.push(space + '{');
	
	                    if ((stmt.specifiers.length - cursor) === 1) {
	                        // import { ... } from "...";
	                        result.push(space);
	                        result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT));
	                        result.push(space + '}' + space);
	                    } else {
	                        // import {
	                        //    ...,
	                        //    ...,
	                        // } from "...";
	                        withIndent(function (indent) {
	                            var i, iz;
	                            result.push(newline);
	                            for (i = cursor, iz = stmt.specifiers.length; i < iz; ++i) {
	                                result.push(indent);
	                                result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT));
	                                if (i + 1 < iz) {
	                                    result.push(',' + newline);
	                                }
	                            }
	                        });
	                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                            result.push(newline);
	                        }
	                        result.push(base + '}' + space);
	                    }
	                }
	            }
	
	            result = join(result, [
	                'from' + space,
	                // ModuleSpecifier
	                this.generateExpression(stmt.source, Precedence.Sequence, E_TTT),
	                this.semicolon(flags)
	            ]);
	            return result;
	        },
	
	        VariableDeclarator: function (stmt, flags) {
	            var itemFlags = (flags & F_ALLOW_IN) ? E_TTT : E_FTT;
	            if (stmt.init) {
	                return [
	                    this.generateExpression(stmt.id, Precedence.Assignment, itemFlags),
	                    space,
	                    '=',
	                    space,
	                    this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)
	                ];
	            }
	            return this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
	        },
	
	        VariableDeclaration: function (stmt, flags) {
	            // VariableDeclarator is typed as Statement,
	            // but joined with comma (not LineTerminator).
	            // So if comment is attached to target node, we should specialize.
	            var result, i, iz, node, bodyFlags, that = this;
	
	            result = [ stmt.kind ];
	
	            bodyFlags = (flags & F_ALLOW_IN) ? S_TFFF : S_FFFF;
	
	            function block() {
	                node = stmt.declarations[0];
	                if (extra.comment && node.leadingComments) {
	                    result.push('\n');
	                    result.push(addIndent(that.generateStatement(node, bodyFlags)));
	                } else {
	                    result.push(noEmptySpace());
	                    result.push(that.generateStatement(node, bodyFlags));
	                }
	
	                for (i = 1, iz = stmt.declarations.length; i < iz; ++i) {
	                    node = stmt.declarations[i];
	                    if (extra.comment && node.leadingComments) {
	                        result.push(',' + newline);
	                        result.push(addIndent(that.generateStatement(node, bodyFlags)));
	                    } else {
	                        result.push(',' + space);
	                        result.push(that.generateStatement(node, bodyFlags));
	                    }
	                }
	            }
	
	            if (stmt.declarations.length > 1) {
	                withIndent(block);
	            } else {
	                block();
	            }
	
	            result.push(this.semicolon(flags));
	
	            return result;
	        },
	
	        ThrowStatement: function (stmt, flags) {
	            return [join(
	                'throw',
	                this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
	            ), this.semicolon(flags)];
	        },
	
	        TryStatement: function (stmt, flags) {
	            var result, i, iz, guardedHandlers;
	
	            result = ['try', this.maybeBlock(stmt.block, S_TFFF)];
	            result = this.maybeBlockSuffix(stmt.block, result);
	
	            if (stmt.handlers) {
	                // old interface
	                for (i = 0, iz = stmt.handlers.length; i < iz; ++i) {
	                    result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF));
	                    if (stmt.finalizer || i + 1 !== iz) {
	                        result = this.maybeBlockSuffix(stmt.handlers[i].body, result);
	                    }
	                }
	            } else {
	                guardedHandlers = stmt.guardedHandlers || [];
	
	                for (i = 0, iz = guardedHandlers.length; i < iz; ++i) {
	                    result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF));
	                    if (stmt.finalizer || i + 1 !== iz) {
	                        result = this.maybeBlockSuffix(guardedHandlers[i].body, result);
	                    }
	                }
	
	                // new interface
	                if (stmt.handler) {
	                    if (isArray(stmt.handler)) {
	                        for (i = 0, iz = stmt.handler.length; i < iz; ++i) {
	                            result = join(result, this.generateStatement(stmt.handler[i], S_TFFF));
	                            if (stmt.finalizer || i + 1 !== iz) {
	                                result = this.maybeBlockSuffix(stmt.handler[i].body, result);
	                            }
	                        }
	                    } else {
	                        result = join(result, this.generateStatement(stmt.handler, S_TFFF));
	                        if (stmt.finalizer) {
	                            result = this.maybeBlockSuffix(stmt.handler.body, result);
	                        }
	                    }
	                }
	            }
	            if (stmt.finalizer) {
	                result = join(result, ['finally', this.maybeBlock(stmt.finalizer, S_TFFF)]);
	            }
	            return result;
	        },
	
	        SwitchStatement: function (stmt, flags) {
	            var result, fragment, i, iz, bodyFlags, that = this;
	            withIndent(function () {
	                result = [
	                    'switch' + space + '(',
	                    that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT),
	                    ')' + space + '{' + newline
	                ];
	            });
	            if (stmt.cases) {
	                bodyFlags = S_TFFF;
	                for (i = 0, iz = stmt.cases.length; i < iz; ++i) {
	                    if (i === iz - 1) {
	                        bodyFlags |= F_SEMICOLON_OPT;
	                    }
	                    fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags));
	                    result.push(fragment);
	                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
	                        result.push(newline);
	                    }
	                }
	            }
	            result.push(addIndent('}'));
	            return result;
	        },
	
	        SwitchCase: function (stmt, flags) {
	            var result, fragment, i, iz, bodyFlags, that = this;
	            withIndent(function () {
	                if (stmt.test) {
	                    result = [
	                        join('case', that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)),
	                        ':'
	                    ];
	                } else {
	                    result = ['default:'];
	                }
	
	                i = 0;
	                iz = stmt.consequent.length;
	                if (iz && stmt.consequent[0].type === Syntax.BlockStatement) {
	                    fragment = that.maybeBlock(stmt.consequent[0], S_TFFF);
	                    result.push(fragment);
	                    i = 1;
	                }
	
	                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                    result.push(newline);
	                }
	
	                bodyFlags = S_TFFF;
	                for (; i < iz; ++i) {
	                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
	                        bodyFlags |= F_SEMICOLON_OPT;
	                    }
	                    fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags));
	                    result.push(fragment);
	                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
	                        result.push(newline);
	                    }
	                }
	            });
	            return result;
	        },
	
	        IfStatement: function (stmt, flags) {
	            var result, bodyFlags, semicolonOptional, that = this;
	            withIndent(function () {
	                result = [
	                    'if' + space + '(',
	                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
	                    ')'
	                ];
	            });
	            semicolonOptional = flags & F_SEMICOLON_OPT;
	            bodyFlags = S_TFFF;
	            if (semicolonOptional) {
	                bodyFlags |= F_SEMICOLON_OPT;
	            }
	            if (stmt.alternate) {
	                result.push(this.maybeBlock(stmt.consequent, S_TFFF));
	                result = this.maybeBlockSuffix(stmt.consequent, result);
	                if (stmt.alternate.type === Syntax.IfStatement) {
	                    result = join(result, ['else ', this.generateStatement(stmt.alternate, bodyFlags)]);
	                } else {
	                    result = join(result, join('else', this.maybeBlock(stmt.alternate, bodyFlags)));
	                }
	            } else {
	                result.push(this.maybeBlock(stmt.consequent, bodyFlags));
	            }
	            return result;
	        },
	
	        ForStatement: function (stmt, flags) {
	            var result, that = this;
	            withIndent(function () {
	                result = ['for' + space + '('];
	                if (stmt.init) {
	                    if (stmt.init.type === Syntax.VariableDeclaration) {
	                        result.push(that.generateStatement(stmt.init, S_FFFF));
	                    } else {
	                        // F_ALLOW_IN becomes false.
	                        result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT));
	                        result.push(';');
	                    }
	                } else {
	                    result.push(';');
	                }
	
	                if (stmt.test) {
	                    result.push(space);
	                    result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT));
	                    result.push(';');
	                } else {
	                    result.push(';');
	                }
	
	                if (stmt.update) {
	                    result.push(space);
	                    result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT));
	                    result.push(')');
	                } else {
	                    result.push(')');
	                }
	            });
	
	            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
	            return result;
	        },
	
	        ForInStatement: function (stmt, flags) {
	            return this.generateIterationForStatement('in', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
	        },
	
	        ForOfStatement: function (stmt, flags) {
	            return this.generateIterationForStatement('of', stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
	        },
	
	        LabeledStatement: function (stmt, flags) {
	            return [stmt.label.name + ':', this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
	        },
	
	        Program: function (stmt, flags) {
	            var result, fragment, i, iz, bodyFlags;
	            iz = stmt.body.length;
	            result = [safeConcatenation && iz > 0 ? '\n' : ''];
	            bodyFlags = S_TFTF;
	            for (i = 0; i < iz; ++i) {
	                if (!safeConcatenation && i === iz - 1) {
	                    bodyFlags |= F_SEMICOLON_OPT;
	                }
	
	                if (preserveBlankLines) {
	                    // handle spaces before the first line
	                    if (i === 0) {
	                        if (!stmt.body[0].leadingComments) {
	                            generateBlankLines(stmt.range[0], stmt.body[i].range[0], result);
	                        }
	                    }
	
	                    // handle spaces between lines
	                    if (i > 0) {
	                        if (!stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments) {
	                            generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result);
	                        }
	                    }
	                }
	
	                fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags));
	                result.push(fragment);
	                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
	                    if (preserveBlankLines) {
	                        if (!stmt.body[i + 1].leadingComments) {
	                            result.push(newline);
	                        }
	                    } else {
	                        result.push(newline);
	                    }
	                }
	
	                if (preserveBlankLines) {
	                    // handle spaces after the last line
	                    if (i === iz - 1) {
	                        if (!stmt.body[i].trailingComments) {
	                            generateBlankLines(stmt.body[i].range[1], stmt.range[1], result);
	                        }
	                    }
	                }
	            }
	            return result;
	        },
	
	        FunctionDeclaration: function (stmt, flags) {
	            return [
	                generateAsyncPrefix(stmt, true),
	                'function',
	                generateStarSuffix(stmt) || noEmptySpace(),
	                stmt.id ? generateIdentifier(stmt.id) : '',
	                this.generateFunctionBody(stmt)
	            ];
	        },
	
	        ReturnStatement: function (stmt, flags) {
	            if (stmt.argument) {
	                return [join(
	                    'return',
	                    this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)
	                ), this.semicolon(flags)];
	            }
	            return ['return' + this.semicolon(flags)];
	        },
	
	        WhileStatement: function (stmt, flags) {
	            var result, that = this;
	            withIndent(function () {
	                result = [
	                    'while' + space + '(',
	                    that.generateExpression(stmt.test, Precedence.Sequence, E_TTT),
	                    ')'
	                ];
	            });
	            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
	            return result;
	        },
	
	        WithStatement: function (stmt, flags) {
	            var result, that = this;
	            withIndent(function () {
	                result = [
	                    'with' + space + '(',
	                    that.generateExpression(stmt.object, Precedence.Sequence, E_TTT),
	                    ')'
	                ];
	            });
	            result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
	            return result;
	        }
	
	    };
	
	    merge(CodeGenerator.prototype, CodeGenerator.Statement);
	
	    // Expressions.
	
	    CodeGenerator.Expression = {
	
	        SequenceExpression: function (expr, precedence, flags) {
	            var result, i, iz;
	            if (Precedence.Sequence < precedence) {
	                flags |= F_ALLOW_IN;
	            }
	            result = [];
	            for (i = 0, iz = expr.expressions.length; i < iz; ++i) {
	                result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags));
	                if (i + 1 < iz) {
	                    result.push(',' + space);
	                }
	            }
	            return parenthesize(result, Precedence.Sequence, precedence);
	        },
	
	        AssignmentExpression: function (expr, precedence, flags) {
	            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
	        },
	
	        ArrowFunctionExpression: function (expr, precedence, flags) {
	            return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
	        },
	
	        ConditionalExpression: function (expr, precedence, flags) {
	            if (Precedence.Conditional < precedence) {
	                flags |= F_ALLOW_IN;
	            }
	            return parenthesize(
	                [
	                    this.generateExpression(expr.test, Precedence.LogicalOR, flags),
	                    space + '?' + space,
	                    this.generateExpression(expr.consequent, Precedence.Assignment, flags),
	                    space + ':' + space,
	                    this.generateExpression(expr.alternate, Precedence.Assignment, flags)
	                ],
	                Precedence.Conditional,
	                precedence
	            );
	        },
	
	        LogicalExpression: function (expr, precedence, flags) {
	            return this.BinaryExpression(expr, precedence, flags);
	        },
	
	        BinaryExpression: function (expr, precedence, flags) {
	            var result, currentPrecedence, fragment, leftSource;
	            currentPrecedence = BinaryPrecedence[expr.operator];
	
	            if (currentPrecedence < precedence) {
	                flags |= F_ALLOW_IN;
	            }
	
	            fragment = this.generateExpression(expr.left, currentPrecedence, flags);
	
	            leftSource = fragment.toString();
	
	            if (leftSource.charCodeAt(leftSource.length - 1) === 0x2F /* / */ && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0))) {
	                result = [fragment, noEmptySpace(), expr.operator];
	            } else {
	                result = join(fragment, expr.operator);
	            }
	
	            fragment = this.generateExpression(expr.right, currentPrecedence + 1, flags);
	
	            if (expr.operator === '/' && fragment.toString().charAt(0) === '/' ||
	            expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
	                // If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
	                result.push(noEmptySpace());
	                result.push(fragment);
	            } else {
	                result = join(result, fragment);
	            }
	
	            if (expr.operator === 'in' && !(flags & F_ALLOW_IN)) {
	                return ['(', result, ')'];
	            }
	            return parenthesize(result, currentPrecedence, precedence);
	        },
	
	        CallExpression: function (expr, precedence, flags) {
	            var result, i, iz;
	            // F_ALLOW_UNPARATH_NEW becomes false.
	            result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)];
	            result.push('(');
	            for (i = 0, iz = expr['arguments'].length; i < iz; ++i) {
	                result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
	                if (i + 1 < iz) {
	                    result.push(',' + space);
	                }
	            }
	            result.push(')');
	
	            if (!(flags & F_ALLOW_CALL)) {
	                return ['(', result, ')'];
	            }
	            return parenthesize(result, Precedence.Call, precedence);
	        },
	
	        NewExpression: function (expr, precedence, flags) {
	            var result, length, i, iz, itemFlags;
	            length = expr['arguments'].length;
	
	            // F_ALLOW_CALL becomes false.
	            // F_ALLOW_UNPARATH_NEW may become false.
	            itemFlags = (flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0) ? E_TFT : E_TFF;
	
	            result = join(
	                'new',
	                this.generateExpression(expr.callee, Precedence.New, itemFlags)
	            );
	
	            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
	                result.push('(');
	                for (i = 0, iz = length; i < iz; ++i) {
	                    result.push(this.generateExpression(expr['arguments'][i], Precedence.Assignment, E_TTT));
	                    if (i + 1 < iz) {
	                        result.push(',' + space);
	                    }
	                }
	                result.push(')');
	            }
	
	            return parenthesize(result, Precedence.New, precedence);
	        },
	
	        MemberExpression: function (expr, precedence, flags) {
	            var result, fragment;
	
	            // F_ALLOW_UNPARATH_NEW becomes false.
	            result = [this.generateExpression(expr.object, Precedence.Call, (flags & F_ALLOW_CALL) ? E_TTF : E_TFF)];
	
	            if (expr.computed) {
	                result.push('[');
	                result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT));
	                result.push(']');
	            } else {
	                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
	                    fragment = toSourceNodeWhenNeeded(result).toString();
	                    // When the following conditions are all true,
	                    //   1. No floating point
	                    //   2. Don't have exponents
	                    //   3. The last character is a decimal digit
	                    //   4. Not hexadecimal OR octal number literal
	                    // we should add a floating point.
	                    if (
	                            fragment.indexOf('.') < 0 &&
	                            !/[eExX]/.test(fragment) &&
	                            esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) &&
	                            !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)  // '0'
	                            ) {
	                        result.push('.');
	                    }
	                }
	                result.push('.');
	                result.push(generateIdentifier(expr.property));
	            }
	
	            return parenthesize(result, Precedence.Member, precedence);
	        },
	
	        MetaProperty: function (expr, precedence, flags) {
	            var result;
	            result = [];
	            result.push(expr.meta);
	            result.push('.');
	            result.push(expr.property);
	            return parenthesize(result, Precedence.Member, precedence);
	        },
	
	        UnaryExpression: function (expr, precedence, flags) {
	            var result, fragment, rightCharCode, leftSource, leftCharCode;
	            fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT);
	
	            if (space === '') {
	                result = join(expr.operator, fragment);
	            } else {
	                result = [expr.operator];
	                if (expr.operator.length > 2) {
	                    // delete, void, typeof
	                    // get `typeof []`, not `typeof[]`
	                    result = join(result, fragment);
	                } else {
	                    // Prevent inserting spaces between operator and argument if it is unnecessary
	                    // like, `!cond`
	                    leftSource = toSourceNodeWhenNeeded(result).toString();
	                    leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
	                    rightCharCode = fragment.toString().charCodeAt(0);
	
	                    if (((leftCharCode === 0x2B  /* + */ || leftCharCode === 0x2D  /* - */) && leftCharCode === rightCharCode) ||
	                            (esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode))) {
	                        result.push(noEmptySpace());
	                        result.push(fragment);
	                    } else {
	                        result.push(fragment);
	                    }
	                }
	            }
	            return parenthesize(result, Precedence.Unary, precedence);
	        },
	
	        YieldExpression: function (expr, precedence, flags) {
	            var result;
	            if (expr.delegate) {
	                result = 'yield*';
	            } else {
	                result = 'yield';
	            }
	            if (expr.argument) {
	                result = join(
	                    result,
	                    this.generateExpression(expr.argument, Precedence.Yield, E_TTT)
	                );
	            }
	            return parenthesize(result, Precedence.Yield, precedence);
	        },
	
	        AwaitExpression: function (expr, precedence, flags) {
	            var result = join(
	                expr.all ? 'await*' : 'await',
	                this.generateExpression(expr.argument, Precedence.Await, E_TTT)
	            );
	            return parenthesize(result, Precedence.Await, precedence);
	        },
	
	        UpdateExpression: function (expr, precedence, flags) {
	            if (expr.prefix) {
	                return parenthesize(
	                    [
	                        expr.operator,
	                        this.generateExpression(expr.argument, Precedence.Unary, E_TTT)
	                    ],
	                    Precedence.Unary,
	                    precedence
	                );
	            }
	            return parenthesize(
	                [
	                    this.generateExpression(expr.argument, Precedence.Postfix, E_TTT),
	                    expr.operator
	                ],
	                Precedence.Postfix,
	                precedence
	            );
	        },
	
	        FunctionExpression: function (expr, precedence, flags) {
	            var result = [
	                generateAsyncPrefix(expr, true),
	                'function'
	            ];
	            if (expr.id) {
	                result.push(generateStarSuffix(expr) || noEmptySpace());
	                result.push(generateIdentifier(expr.id));
	            } else {
	                result.push(generateStarSuffix(expr) || space);
	            }
	            result.push(this.generateFunctionBody(expr));
	            return result;
	        },
	
	        ArrayPattern: function (expr, precedence, flags) {
	            return this.ArrayExpression(expr, precedence, flags, true);
	        },
	
	        ArrayExpression: function (expr, precedence, flags, isPattern) {
	            var result, multiline, that = this;
	            if (!expr.elements.length) {
	                return '[]';
	            }
	            multiline = isPattern ? false : expr.elements.length > 1;
	            result = ['[', multiline ? newline : ''];
	            withIndent(function (indent) {
	                var i, iz;
	                for (i = 0, iz = expr.elements.length; i < iz; ++i) {
	                    if (!expr.elements[i]) {
	                        if (multiline) {
	                            result.push(indent);
	                        }
	                        if (i + 1 === iz) {
	                            result.push(',');
	                        }
	                    } else {
	                        result.push(multiline ? indent : '');
	                        result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT));
	                    }
	                    if (i + 1 < iz) {
	                        result.push(',' + (multiline ? newline : space));
	                    }
	                }
	            });
	            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                result.push(newline);
	            }
	            result.push(multiline ? base : '');
	            result.push(']');
	            return result;
	        },
	
	        RestElement: function(expr, precedence, flags) {
	            return '...' + this.generatePattern(expr.argument);
	        },
	
	        ClassExpression: function (expr, precedence, flags) {
	            var result, fragment;
	            result = ['class'];
	            if (expr.id) {
	                result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT));
	            }
	            if (expr.superClass) {
	                fragment = join('extends', this.generateExpression(expr.superClass, Precedence.Assignment, E_TTT));
	                result = join(result, fragment);
	            }
	            result.push(space);
	            result.push(this.generateStatement(expr.body, S_TFFT));
	            return result;
	        },
	
	        MethodDefinition: function (expr, precedence, flags) {
	            var result, fragment;
	            if (expr['static']) {
	                result = ['static' + space];
	            } else {
	                result = [];
	            }
	            if (expr.kind === 'get' || expr.kind === 'set') {
	                fragment = [
	                    join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)),
	                    this.generateFunctionBody(expr.value)
	                ];
	            } else {
	                fragment = [
	                    generateMethodPrefix(expr),
	                    this.generatePropertyKey(expr.key, expr.computed),
	                    this.generateFunctionBody(expr.value)
	                ];
	            }
	            return join(result, fragment);
	        },
	
	        Property: function (expr, precedence, flags) {
	            if (expr.kind === 'get' || expr.kind === 'set') {
	                return [
	                    expr.kind, noEmptySpace(),
	                    this.generatePropertyKey(expr.key, expr.computed),
	                    this.generateFunctionBody(expr.value)
	                ];
	            }
	
	            if (expr.shorthand) {
	                return this.generatePropertyKey(expr.key, expr.computed);
	            }
	
	            if (expr.method) {
	                return [
	                    generateMethodPrefix(expr),
	                    this.generatePropertyKey(expr.key, expr.computed),
	                    this.generateFunctionBody(expr.value)
	                ];
	            }
	
	            return [
	                this.generatePropertyKey(expr.key, expr.computed),
	                ':' + space,
	                this.generateExpression(expr.value, Precedence.Assignment, E_TTT)
	            ];
	        },
	
	        ObjectExpression: function (expr, precedence, flags) {
	            var multiline, result, fragment, that = this;
	
	            if (!expr.properties.length) {
	                return '{}';
	            }
	            multiline = expr.properties.length > 1;
	
	            withIndent(function () {
	                fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
	            });
	
	            if (!multiline) {
	                // issues 4
	                // Do not transform from
	                //   dejavu.Class.declare({
	                //       method2: function () {}
	                //   });
	                // to
	                //   dejavu.Class.declare({method2: function () {
	                //       }});
	                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
	                    return [ '{', space, fragment, space, '}' ];
	                }
	            }
	
	            withIndent(function (indent) {
	                var i, iz;
	                result = [ '{', newline, indent, fragment ];
	
	                if (multiline) {
	                    result.push(',' + newline);
	                    for (i = 1, iz = expr.properties.length; i < iz; ++i) {
	                        result.push(indent);
	                        result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
	                        if (i + 1 < iz) {
	                            result.push(',' + newline);
	                        }
	                    }
	                }
	            });
	
	            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                result.push(newline);
	            }
	            result.push(base);
	            result.push('}');
	            return result;
	        },
	
	        AssignmentPattern: function(expr, precedence, flags) {
	            return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
	        },
	
	        ObjectPattern: function (expr, precedence, flags) {
	            var result, i, iz, multiline, property, that = this;
	            if (!expr.properties.length) {
	                return '{}';
	            }
	
	            multiline = false;
	            if (expr.properties.length === 1) {
	                property = expr.properties[0];
	                if (property.value.type !== Syntax.Identifier) {
	                    multiline = true;
	                }
	            } else {
	                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
	                    property = expr.properties[i];
	                    if (!property.shorthand) {
	                        multiline = true;
	                        break;
	                    }
	                }
	            }
	            result = ['{', multiline ? newline : '' ];
	
	            withIndent(function (indent) {
	                var i, iz;
	                for (i = 0, iz = expr.properties.length; i < iz; ++i) {
	                    result.push(multiline ? indent : '');
	                    result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT));
	                    if (i + 1 < iz) {
	                        result.push(',' + (multiline ? newline : space));
	                    }
	                }
	            });
	
	            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
	                result.push(newline);
	            }
	            result.push(multiline ? base : '');
	            result.push('}');
	            return result;
	        },
	
	        ThisExpression: function (expr, precedence, flags) {
	            return 'this';
	        },
	
	        Super: function (expr, precedence, flags) {
	            return 'super';
	        },
	
	        Identifier: function (expr, precedence, flags) {
	            return generateIdentifier(expr);
	        },
	
	        ImportDefaultSpecifier: function (expr, precedence, flags) {
	            return generateIdentifier(expr.id || expr.local);
	        },
	
	        ImportNamespaceSpecifier: function (expr, precedence, flags) {
	            var result = ['*'];
	            var id = expr.id || expr.local;
	            if (id) {
	                result.push(space + 'as' + noEmptySpace() + generateIdentifier(id));
	            }
	            return result;
	        },
	
	        ImportSpecifier: function (expr, precedence, flags) {
	            var imported = expr.imported;
	            var result = [ imported.name ];
	            var local = expr.local;
	            if (local && local.name !== imported.name) {
	                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(local));
	            }
	            return result;
	        },
	
	        ExportSpecifier: function (expr, precedence, flags) {
	            var local = expr.local;
	            var result = [ local.name ];
	            var exported = expr.exported;
	            if (exported && exported.name !== local.name) {
	                result.push(noEmptySpace() + 'as' + noEmptySpace() + generateIdentifier(exported));
	            }
	            return result;
	        },
	
	        Literal: function (expr, precedence, flags) {
	            var raw;
	            if (expr.hasOwnProperty('raw') && parse && extra.raw) {
	                try {
	                    raw = parse(expr.raw).body[0].expression;
	                    if (raw.type === Syntax.Literal) {
	                        if (raw.value === expr.value) {
	                            return expr.raw;
	                        }
	                    }
	                } catch (e) {
	                    // not use raw property
	                }
	            }
	
	            if (expr.value === null) {
	                return 'null';
	            }
	
	            if (typeof expr.value === 'string') {
	                return escapeString(expr.value);
	            }
	
	            if (typeof expr.value === 'number') {
	                return generateNumber(expr.value);
	            }
	
	            if (typeof expr.value === 'boolean') {
	                return expr.value ? 'true' : 'false';
	            }
	
	            return generateRegExp(expr.value);
	        },
	
	        GeneratorExpression: function (expr, precedence, flags) {
	            return this.ComprehensionExpression(expr, precedence, flags);
	        },
	
	        ComprehensionExpression: function (expr, precedence, flags) {
	            // GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
	            // Due to https://bugzilla.mozilla.org/show_bug.cgi?id=883468 position of expr.body can differ in Spidermonkey and ES6
	
	            var result, i, iz, fragment, that = this;
	            result = (expr.type === Syntax.GeneratorExpression) ? ['('] : ['['];
	
	            if (extra.moz.comprehensionExpressionStartsWithAssignment) {
	                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
	                result.push(fragment);
	            }
	
	            if (expr.blocks) {
	                withIndent(function () {
	                    for (i = 0, iz = expr.blocks.length; i < iz; ++i) {
	                        fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT);
	                        if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
	                            result = join(result, fragment);
	                        } else {
	                            result.push(fragment);
	                        }
	                    }
	                });
	            }
	
	            if (expr.filter) {
	                result = join(result, 'if' + space);
	                fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT);
	                result = join(result, [ '(', fragment, ')' ]);
	            }
	
	            if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
	                fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT);
	
	                result = join(result, fragment);
	            }
	
	            result.push((expr.type === Syntax.GeneratorExpression) ? ')' : ']');
	            return result;
	        },
	
	        ComprehensionBlock: function (expr, precedence, flags) {
	            var fragment;
	            if (expr.left.type === Syntax.VariableDeclaration) {
	                fragment = [
	                    expr.left.kind, noEmptySpace(),
	                    this.generateStatement(expr.left.declarations[0], S_FFFF)
	                ];
	            } else {
	                fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT);
	            }
	
	            fragment = join(fragment, expr.of ? 'of' : 'in');
	            fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT));
	
	            return [ 'for' + space + '(', fragment, ')' ];
	        },
	
	        SpreadElement: function (expr, precedence, flags) {
	            return [
	                '...',
	                this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)
	            ];
	        },
	
	        TaggedTemplateExpression: function (expr, precedence, flags) {
	            var itemFlags = E_TTF;
	            if (!(flags & F_ALLOW_CALL)) {
	                itemFlags = E_TFF;
	            }
	            var result = [
	                this.generateExpression(expr.tag, Precedence.Call, itemFlags),
	                this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)
	            ];
	            return parenthesize(result, Precedence.TaggedTemplate, precedence);
	        },
	
	        TemplateElement: function (expr, precedence, flags) {
	            // Don't use "cooked". Since tagged template can use raw template
	            // representation. So if we do so, it breaks the script semantics.
	            return expr.value.raw;
	        },
	
	        TemplateLiteral: function (expr, precedence, flags) {
	            var result, i, iz;
	            result = [ '`' ];
	            for (i = 0, iz = expr.quasis.length; i < iz; ++i) {
	                result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT));
	                if (i + 1 < iz) {
	                    result.push('${' + space);
	                    result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT));
	                    result.push(space + '}');
	                }
	            }
	            result.push('`');
	            return result;
	        },
	
	        ModuleSpecifier: function (expr, precedence, flags) {
	            return this.Literal(expr, precedence, flags);
	        }
	
	    };
	
	    merge(CodeGenerator.prototype, CodeGenerator.Expression);
	
	    CodeGenerator.prototype.generateExpression = function (expr, precedence, flags) {
	        var result, type;
	
	        type = expr.type || Syntax.Property;
	
	        if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
	            return generateVerbatim(expr, precedence);
	        }
	
	        result = this[type](expr, precedence, flags);
	
	
	        if (extra.comment) {
	            result = addComments(expr, result);
	        }
	        return toSourceNodeWhenNeeded(result, expr);
	    };
	
	    CodeGenerator.prototype.generateStatement = function (stmt, flags) {
	        var result,
	            fragment;
	
	        result = this[stmt.type](stmt, flags);
	
	        // Attach comments
	
	        if (extra.comment) {
	            result = addComments(stmt, result);
	        }
	
	        fragment = toSourceNodeWhenNeeded(result).toString();
	        if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' &&  fragment.charAt(fragment.length - 1) === '\n') {
	            result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
	        }
	
	        return toSourceNodeWhenNeeded(result, stmt);
	    };
	
	    function generateInternal(node) {
	        var codegen;
	
	        codegen = new CodeGenerator();
	        if (isStatement(node)) {
	            return codegen.generateStatement(node, S_TFFF);
	        }
	
	        if (isExpression(node)) {
	            return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
	        }
	
	        throw new Error('Unknown node type: ' + node.type);
	    }
	
	    function generate(node, options) {
	        var defaultOptions = getDefaultOptions(), result, pair;
	
	        if (options != null) {
	            // Obsolete options
	            //
	            //   `options.indent`
	            //   `options.base`
	            //
	            // Instead of them, we can use `option.format.indent`.
	            if (typeof options.indent === 'string') {
	                defaultOptions.format.indent.style = options.indent;
	            }
	            if (typeof options.base === 'number') {
	                defaultOptions.format.indent.base = options.base;
	            }
	            options = updateDeeply(defaultOptions, options);
	            indent = options.format.indent.style;
	            if (typeof options.base === 'string') {
	                base = options.base;
	            } else {
	                base = stringRepeat(indent, options.format.indent.base);
	            }
	        } else {
	            options = defaultOptions;
	            indent = options.format.indent.style;
	            base = stringRepeat(indent, options.format.indent.base);
	        }
	        json = options.format.json;
	        renumber = options.format.renumber;
	        hexadecimal = json ? false : options.format.hexadecimal;
	        quotes = json ? 'double' : options.format.quotes;
	        escapeless = options.format.escapeless;
	        newline = options.format.newline;
	        space = options.format.space;
	        if (options.format.compact) {
	            newline = space = indent = base = '';
	        }
	        parentheses = options.format.parentheses;
	        semicolons = options.format.semicolons;
	        safeConcatenation = options.format.safeConcatenation;
	        directive = options.directive;
	        parse = json ? null : options.parse;
	        sourceMap = options.sourceMap;
	        sourceCode = options.sourceCode;
	        preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null;
	        extra = options;
	
	        if (sourceMap) {
	            if (!exports.browser) {
	                // We assume environment is node.js
	                // And prevent from including source-map by browserify
	                SourceNode = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map.js").SourceNode;
	            } else {
	                SourceNode = global.sourceMap.SourceNode;
	            }
	        }
	
	        result = generateInternal(node);
	
	        if (!sourceMap) {
	            pair = {code: result.toString(), map: null};
	            return options.sourceMapWithCode ? pair : pair.code;
	        }
	
	
	        pair = result.toStringWithSourceMap({
	            file: options.file,
	            sourceRoot: options.sourceMapRoot
	        });
	
	        if (options.sourceContent) {
	            pair.map.setSourceContent(options.sourceMap,
	                                      options.sourceContent);
	        }
	
	        if (options.sourceMapWithCode) {
	            return pair;
	        }
	
	        return pair.map.toString();
	    }
	
	    FORMAT_MINIFY = {
	        indent: {
	            style: '',
	            base: 0
	        },
	        renumber: true,
	        hexadecimal: true,
	        quotes: 'auto',
	        escapeless: true,
	        compact: true,
	        parentheses: false,
	        semicolons: false
	    };
	
	    FORMAT_DEFAULTS = getDefaultOptions().format;
	
	    exports.version = __webpack_require__("./node_modules/escodegen/package.json").version;
	    exports.generate = generate;
	    exports.attachComments = estraverse.attachComments;
	    exports.Precedence = updateDeeply({}, Precedence);
	    exports.browser = false;
	    exports.FORMAT_MINIFY = FORMAT_MINIFY;
	    exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
	}());
	/* vim: set sw=4 ts=4 et tw=80 : */
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/escodegen/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"escodegen@https://registry.npmjs.org/escodegen/-/escodegen-1.8.0.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "escodegen@>=1.4.1 <2.0.0",
		"_id": "escodegen@1.8.0",
		"_inCache": true,
		"_location": "/escodegen",
		"_phantomChildren": {
			"amdefine": "1.0.0"
		},
		"_requested": {
			"name": "escodegen",
			"raw": "escodegen@https://registry.npmjs.org/escodegen/-/escodegen-1.8.0.tgz",
			"rawSpec": "https://registry.npmjs.org/escodegen/-/escodegen-1.8.0.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/escodegen/-/escodegen-1.8.0.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/escodegen/-/escodegen-1.8.0.tgz",
		"_shasum": "b246aae829ce73d59e2c55727359edd1c130a81b",
		"_shrinkwrap": null,
		"_spec": "escodegen@https://registry.npmjs.org/escodegen/-/escodegen-1.8.0.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"bin": {
			"escodegen": "./bin/escodegen.js",
			"esgenerate": "./bin/esgenerate.js"
		},
		"bugs": {
			"url": "https://github.com/estools/escodegen/issues"
		},
		"dependencies": {
			"esprima": "^2.7.1",
			"estraverse": "^1.9.1",
			"esutils": "^2.0.2",
			"optionator": "^0.8.1",
			"source-map": "~0.2.0"
		},
		"description": "ECMAScript code generator",
		"devDependencies": {
			"acorn-6to5": "^0.11.1-25",
			"bluebird": "^2.3.11",
			"bower-registry-client": "^0.2.1",
			"chai": "^1.10.0",
			"commonjs-everywhere": "^0.9.7",
			"gulp": "^3.8.10",
			"gulp-eslint": "^0.2.0",
			"gulp-mocha": "^2.0.0",
			"semver": "^5.1.0"
		},
		"engines": {
			"node": ">=0.12.0"
		},
		"files": [
			"LICENSE.BSD",
			"LICENSE.source-map",
			"README.md",
			"bin",
			"escodegen.js",
			"package.json"
		],
		"homepage": "http://github.com/estools/escodegen",
		"license": "BSD-2-Clause",
		"main": "escodegen.js",
		"maintainers": [
			{
				"name": "Yusuke Suzuki",
				"email": "utatane.tea@gmail.com",
				"url": "http://github.com/Constellation"
			}
		],
		"name": "escodegen",
		"optionalDependencies": {
			"source-map": "~0.2.0"
		},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com/estools/escodegen.git"
		},
		"scripts": {
			"build": "cjsify -a path: tools/entry-point.js > escodegen.browser.js",
			"build-min": "cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
			"lint": "gulp lint",
			"release": "node tools/release.js",
			"test": "gulp travis",
			"unit-test": "gulp test"
		},
		"version": "1.8.0"
	};

/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright 2009-2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE.txt or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	exports.SourceMapGenerator = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/source-map-generator.js").SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/source-map-consumer.js").SourceMapConsumer;
	exports.SourceNode = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/source-node.js").SourceNode;


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/source-map-generator.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var base64VLQ = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/base64-vlq.js");
	  var util = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js");
	  var ArraySet = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/array-set.js").ArraySet;
	  var MappingList = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/mapping-list.js").MappingList;
	
	  /**
	   * An instance of the SourceMapGenerator represents a source map which is
	   * being built incrementally. You may pass an object with the following
	   * properties:
	   *
	   *   - file: The filename of the generated source.
	   *   - sourceRoot: A root for all relative URLs in this source map.
	   */
	  function SourceMapGenerator(aArgs) {
	    if (!aArgs) {
	      aArgs = {};
	    }
	    this._file = util.getArg(aArgs, 'file', null);
	    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
	    this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
	    this._sources = new ArraySet();
	    this._names = new ArraySet();
	    this._mappings = new MappingList();
	    this._sourcesContents = null;
	  }
	
	  SourceMapGenerator.prototype._version = 3;
	
	  /**
	   * Creates a new SourceMapGenerator based on a SourceMapConsumer
	   *
	   * @param aSourceMapConsumer The SourceMap.
	   */
	  SourceMapGenerator.fromSourceMap =
	    function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
	      var sourceRoot = aSourceMapConsumer.sourceRoot;
	      var generator = new SourceMapGenerator({
	        file: aSourceMapConsumer.file,
	        sourceRoot: sourceRoot
	      });
	      aSourceMapConsumer.eachMapping(function (mapping) {
	        var newMapping = {
	          generated: {
	            line: mapping.generatedLine,
	            column: mapping.generatedColumn
	          }
	        };
	
	        if (mapping.source != null) {
	          newMapping.source = mapping.source;
	          if (sourceRoot != null) {
	            newMapping.source = util.relative(sourceRoot, newMapping.source);
	          }
	
	          newMapping.original = {
	            line: mapping.originalLine,
	            column: mapping.originalColumn
	          };
	
	          if (mapping.name != null) {
	            newMapping.name = mapping.name;
	          }
	        }
	
	        generator.addMapping(newMapping);
	      });
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content != null) {
	          generator.setSourceContent(sourceFile, content);
	        }
	      });
	      return generator;
	    };
	
	  /**
	   * Add a single mapping from original source line and column to the generated
	   * source's line and column for this source map being created. The mapping
	   * object should have the following properties:
	   *
	   *   - generated: An object with the generated line and column positions.
	   *   - original: An object with the original line and column positions.
	   *   - source: The original source file (relative to the sourceRoot).
	   *   - name: An optional original token name for this mapping.
	   */
	  SourceMapGenerator.prototype.addMapping =
	    function SourceMapGenerator_addMapping(aArgs) {
	      var generated = util.getArg(aArgs, 'generated');
	      var original = util.getArg(aArgs, 'original', null);
	      var source = util.getArg(aArgs, 'source', null);
	      var name = util.getArg(aArgs, 'name', null);
	
	      if (!this._skipValidation) {
	        this._validateMapping(generated, original, source, name);
	      }
	
	      if (source != null && !this._sources.has(source)) {
	        this._sources.add(source);
	      }
	
	      if (name != null && !this._names.has(name)) {
	        this._names.add(name);
	      }
	
	      this._mappings.add({
	        generatedLine: generated.line,
	        generatedColumn: generated.column,
	        originalLine: original != null && original.line,
	        originalColumn: original != null && original.column,
	        source: source,
	        name: name
	      });
	    };
	
	  /**
	   * Set the source content for a source file.
	   */
	  SourceMapGenerator.prototype.setSourceContent =
	    function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
	      var source = aSourceFile;
	      if (this._sourceRoot != null) {
	        source = util.relative(this._sourceRoot, source);
	      }
	
	      if (aSourceContent != null) {
	        // Add the source content to the _sourcesContents map.
	        // Create a new _sourcesContents map if the property is null.
	        if (!this._sourcesContents) {
	          this._sourcesContents = {};
	        }
	        this._sourcesContents[util.toSetString(source)] = aSourceContent;
	      } else if (this._sourcesContents) {
	        // Remove the source file from the _sourcesContents map.
	        // If the _sourcesContents map is empty, set the property to null.
	        delete this._sourcesContents[util.toSetString(source)];
	        if (Object.keys(this._sourcesContents).length === 0) {
	          this._sourcesContents = null;
	        }
	      }
	    };
	
	  /**
	   * Applies the mappings of a sub-source-map for a specific source file to the
	   * source map being generated. Each mapping to the supplied source file is
	   * rewritten using the supplied source map. Note: The resolution for the
	   * resulting mappings is the minimium of this map and the supplied map.
	   *
	   * @param aSourceMapConsumer The source map to be applied.
	   * @param aSourceFile Optional. The filename of the source file.
	   *        If omitted, SourceMapConsumer's file property will be used.
	   * @param aSourceMapPath Optional. The dirname of the path to the source map
	   *        to be applied. If relative, it is relative to the SourceMapConsumer.
	   *        This parameter is needed when the two source maps aren't in the same
	   *        directory, and the source map to be applied contains relative source
	   *        paths. If so, those relative source paths need to be rewritten
	   *        relative to the SourceMapGenerator.
	   */
	  SourceMapGenerator.prototype.applySourceMap =
	    function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
	      var sourceFile = aSourceFile;
	      // If aSourceFile is omitted, we will use the file property of the SourceMap
	      if (aSourceFile == null) {
	        if (aSourceMapConsumer.file == null) {
	          throw new Error(
	            'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
	            'or the source map\'s "file" property. Both were omitted.'
	          );
	        }
	        sourceFile = aSourceMapConsumer.file;
	      }
	      var sourceRoot = this._sourceRoot;
	      // Make "sourceFile" relative if an absolute Url is passed.
	      if (sourceRoot != null) {
	        sourceFile = util.relative(sourceRoot, sourceFile);
	      }
	      // Applying the SourceMap can add and remove items from the sources and
	      // the names array.
	      var newSources = new ArraySet();
	      var newNames = new ArraySet();
	
	      // Find mappings for the "sourceFile"
	      this._mappings.unsortedForEach(function (mapping) {
	        if (mapping.source === sourceFile && mapping.originalLine != null) {
	          // Check if it can be mapped by the source map, then update the mapping.
	          var original = aSourceMapConsumer.originalPositionFor({
	            line: mapping.originalLine,
	            column: mapping.originalColumn
	          });
	          if (original.source != null) {
	            // Copy mapping
	            mapping.source = original.source;
	            if (aSourceMapPath != null) {
	              mapping.source = util.join(aSourceMapPath, mapping.source)
	            }
	            if (sourceRoot != null) {
	              mapping.source = util.relative(sourceRoot, mapping.source);
	            }
	            mapping.originalLine = original.line;
	            mapping.originalColumn = original.column;
	            if (original.name != null) {
	              mapping.name = original.name;
	            }
	          }
	        }
	
	        var source = mapping.source;
	        if (source != null && !newSources.has(source)) {
	          newSources.add(source);
	        }
	
	        var name = mapping.name;
	        if (name != null && !newNames.has(name)) {
	          newNames.add(name);
	        }
	
	      }, this);
	      this._sources = newSources;
	      this._names = newNames;
	
	      // Copy sourcesContents of applied map.
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content != null) {
	          if (aSourceMapPath != null) {
	            sourceFile = util.join(aSourceMapPath, sourceFile);
	          }
	          if (sourceRoot != null) {
	            sourceFile = util.relative(sourceRoot, sourceFile);
	          }
	          this.setSourceContent(sourceFile, content);
	        }
	      }, this);
	    };
	
	  /**
	   * A mapping can have one of the three levels of data:
	   *
	   *   1. Just the generated position.
	   *   2. The Generated position, original position, and original source.
	   *   3. Generated and original position, original source, as well as a name
	   *      token.
	   *
	   * To maintain consistency, we validate that any new mapping being added falls
	   * in to one of these categories.
	   */
	  SourceMapGenerator.prototype._validateMapping =
	    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
	                                                aName) {
	      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	          && aGenerated.line > 0 && aGenerated.column >= 0
	          && !aOriginal && !aSource && !aName) {
	        // Case 1.
	        return;
	      }
	      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
	               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
	               && aGenerated.line > 0 && aGenerated.column >= 0
	               && aOriginal.line > 0 && aOriginal.column >= 0
	               && aSource) {
	        // Cases 2 and 3.
	        return;
	      }
	      else {
	        throw new Error('Invalid mapping: ' + JSON.stringify({
	          generated: aGenerated,
	          source: aSource,
	          original: aOriginal,
	          name: aName
	        }));
	      }
	    };
	
	  /**
	   * Serialize the accumulated mappings in to the stream of base 64 VLQs
	   * specified by the source map format.
	   */
	  SourceMapGenerator.prototype._serializeMappings =
	    function SourceMapGenerator_serializeMappings() {
	      var previousGeneratedColumn = 0;
	      var previousGeneratedLine = 1;
	      var previousOriginalColumn = 0;
	      var previousOriginalLine = 0;
	      var previousName = 0;
	      var previousSource = 0;
	      var result = '';
	      var mapping;
	
	      var mappings = this._mappings.toArray();
	
	      for (var i = 0, len = mappings.length; i < len; i++) {
	        mapping = mappings[i];
	
	        if (mapping.generatedLine !== previousGeneratedLine) {
	          previousGeneratedColumn = 0;
	          while (mapping.generatedLine !== previousGeneratedLine) {
	            result += ';';
	            previousGeneratedLine++;
	          }
	        }
	        else {
	          if (i > 0) {
	            if (!util.compareByGeneratedPositions(mapping, mappings[i - 1])) {
	              continue;
	            }
	            result += ',';
	          }
	        }
	
	        result += base64VLQ.encode(mapping.generatedColumn
	                                   - previousGeneratedColumn);
	        previousGeneratedColumn = mapping.generatedColumn;
	
	        if (mapping.source != null) {
	          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
	                                     - previousSource);
	          previousSource = this._sources.indexOf(mapping.source);
	
	          // lines are stored 0-based in SourceMap spec version 3
	          result += base64VLQ.encode(mapping.originalLine - 1
	                                     - previousOriginalLine);
	          previousOriginalLine = mapping.originalLine - 1;
	
	          result += base64VLQ.encode(mapping.originalColumn
	                                     - previousOriginalColumn);
	          previousOriginalColumn = mapping.originalColumn;
	
	          if (mapping.name != null) {
	            result += base64VLQ.encode(this._names.indexOf(mapping.name)
	                                       - previousName);
	            previousName = this._names.indexOf(mapping.name);
	          }
	        }
	      }
	
	      return result;
	    };
	
	  SourceMapGenerator.prototype._generateSourcesContent =
	    function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
	      return aSources.map(function (source) {
	        if (!this._sourcesContents) {
	          return null;
	        }
	        if (aSourceRoot != null) {
	          source = util.relative(aSourceRoot, source);
	        }
	        var key = util.toSetString(source);
	        return Object.prototype.hasOwnProperty.call(this._sourcesContents,
	                                                    key)
	          ? this._sourcesContents[key]
	          : null;
	      }, this);
	    };
	
	  /**
	   * Externalize the source map.
	   */
	  SourceMapGenerator.prototype.toJSON =
	    function SourceMapGenerator_toJSON() {
	      var map = {
	        version: this._version,
	        sources: this._sources.toArray(),
	        names: this._names.toArray(),
	        mappings: this._serializeMappings()
	      };
	      if (this._file != null) {
	        map.file = this._file;
	      }
	      if (this._sourceRoot != null) {
	        map.sourceRoot = this._sourceRoot;
	      }
	      if (this._sourcesContents) {
	        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
	      }
	
	      return map;
	    };
	
	  /**
	   * Render the source map being generated to a string.
	   */
	  SourceMapGenerator.prototype.toString =
	    function SourceMapGenerator_toString() {
	      return JSON.stringify(this);
	    };
	
	  exports.SourceMapGenerator = SourceMapGenerator;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/base64-vlq.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var base64 = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/base64.js");
	
	  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
	  // length quantities we use in the source map spec, the first bit is the sign,
	  // the next four bits are the actual value, and the 6th bit is the
	  // continuation bit. The continuation bit tells us whether there are more
	  // digits in this value following this digit.
	  //
	  //   Continuation
	  //   |    Sign
	  //   |    |
	  //   V    V
	  //   101011
	
	  var VLQ_BASE_SHIFT = 5;
	
	  // binary: 100000
	  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	
	  // binary: 011111
	  var VLQ_BASE_MASK = VLQ_BASE - 1;
	
	  // binary: 100000
	  var VLQ_CONTINUATION_BIT = VLQ_BASE;
	
	  /**
	   * Converts from a two-complement value to a value where the sign bit is
	   * placed in the least significant bit.  For example, as decimals:
	   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	   */
	  function toVLQSigned(aValue) {
	    return aValue < 0
	      ? ((-aValue) << 1) + 1
	      : (aValue << 1) + 0;
	  }
	
	  /**
	   * Converts to a two-complement value from a value where the sign bit is
	   * placed in the least significant bit.  For example, as decimals:
	   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	   */
	  function fromVLQSigned(aValue) {
	    var isNegative = (aValue & 1) === 1;
	    var shifted = aValue >> 1;
	    return isNegative
	      ? -shifted
	      : shifted;
	  }
	
	  /**
	   * Returns the base 64 VLQ encoded value.
	   */
	  exports.encode = function base64VLQ_encode(aValue) {
	    var encoded = "";
	    var digit;
	
	    var vlq = toVLQSigned(aValue);
	
	    do {
	      digit = vlq & VLQ_BASE_MASK;
	      vlq >>>= VLQ_BASE_SHIFT;
	      if (vlq > 0) {
	        // There are still more digits in this value, so we must make sure the
	        // continuation bit is marked.
	        digit |= VLQ_CONTINUATION_BIT;
	      }
	      encoded += base64.encode(digit);
	    } while (vlq > 0);
	
	    return encoded;
	  };
	
	  /**
	   * Decodes the next base 64 VLQ value from the given string and returns the
	   * value and the rest of the string via the out parameter.
	   */
	  exports.decode = function base64VLQ_decode(aStr, aOutParam) {
	    var i = 0;
	    var strLen = aStr.length;
	    var result = 0;
	    var shift = 0;
	    var continuation, digit;
	
	    do {
	      if (i >= strLen) {
	        throw new Error("Expected more digits in base 64 VLQ value.");
	      }
	      digit = base64.decode(aStr.charAt(i++));
	      continuation = !!(digit & VLQ_CONTINUATION_BIT);
	      digit &= VLQ_BASE_MASK;
	      result = result + (digit << shift);
	      shift += VLQ_BASE_SHIFT;
	    } while (continuation);
	
	    aOutParam.value = fromVLQSigned(result);
	    aOutParam.rest = aStr.slice(i);
	  };
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/base64.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var charToIntMap = {};
	  var intToCharMap = {};
	
	  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	    .split('')
	    .forEach(function (ch, index) {
	      charToIntMap[ch] = index;
	      intToCharMap[index] = ch;
	    });
	
	  /**
	   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	   */
	  exports.encode = function base64_encode(aNumber) {
	    if (aNumber in intToCharMap) {
	      return intToCharMap[aNumber];
	    }
	    throw new TypeError("Must be between 0 and 63: " + aNumber);
	  };
	
	  /**
	   * Decode a single base 64 digit to an integer.
	   */
	  exports.decode = function base64_decode(aChar) {
	    if (aChar in charToIntMap) {
	      return charToIntMap[aChar];
	    }
	    throw new TypeError("Not a valid base 64 digit: " + aChar);
	  };
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  /**
	   * This is a helper function for getting values from parameter/options
	   * objects.
	   *
	   * @param args The object we are extracting values from
	   * @param name The name of the property we are getting.
	   * @param defaultValue An optional value to return if the property is missing
	   * from the object. If this is not specified and the property is missing, an
	   * error will be thrown.
	   */
	  function getArg(aArgs, aName, aDefaultValue) {
	    if (aName in aArgs) {
	      return aArgs[aName];
	    } else if (arguments.length === 3) {
	      return aDefaultValue;
	    } else {
	      throw new Error('"' + aName + '" is a required argument.');
	    }
	  }
	  exports.getArg = getArg;
	
	  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	  var dataUrlRegexp = /^data:.+\,.+$/;
	
	  function urlParse(aUrl) {
	    var match = aUrl.match(urlRegexp);
	    if (!match) {
	      return null;
	    }
	    return {
	      scheme: match[1],
	      auth: match[2],
	      host: match[3],
	      port: match[4],
	      path: match[5]
	    };
	  }
	  exports.urlParse = urlParse;
	
	  function urlGenerate(aParsedUrl) {
	    var url = '';
	    if (aParsedUrl.scheme) {
	      url += aParsedUrl.scheme + ':';
	    }
	    url += '//';
	    if (aParsedUrl.auth) {
	      url += aParsedUrl.auth + '@';
	    }
	    if (aParsedUrl.host) {
	      url += aParsedUrl.host;
	    }
	    if (aParsedUrl.port) {
	      url += ":" + aParsedUrl.port
	    }
	    if (aParsedUrl.path) {
	      url += aParsedUrl.path;
	    }
	    return url;
	  }
	  exports.urlGenerate = urlGenerate;
	
	  /**
	   * Normalizes a path, or the path portion of a URL:
	   *
	   * - Replaces consequtive slashes with one slash.
	   * - Removes unnecessary '.' parts.
	   * - Removes unnecessary '<dir>/..' parts.
	   *
	   * Based on code in the Node.js 'path' core module.
	   *
	   * @param aPath The path or url to normalize.
	   */
	  function normalize(aPath) {
	    var path = aPath;
	    var url = urlParse(aPath);
	    if (url) {
	      if (!url.path) {
	        return aPath;
	      }
	      path = url.path;
	    }
	    var isAbsolute = (path.charAt(0) === '/');
	
	    var parts = path.split(/\/+/);
	    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	      part = parts[i];
	      if (part === '.') {
	        parts.splice(i, 1);
	      } else if (part === '..') {
	        up++;
	      } else if (up > 0) {
	        if (part === '') {
	          // The first part is blank if the path is absolute. Trying to go
	          // above the root is a no-op. Therefore we can remove all '..' parts
	          // directly after the root.
	          parts.splice(i + 1, up);
	          up = 0;
	        } else {
	          parts.splice(i, 2);
	          up--;
	        }
	      }
	    }
	    path = parts.join('/');
	
	    if (path === '') {
	      path = isAbsolute ? '/' : '.';
	    }
	
	    if (url) {
	      url.path = path;
	      return urlGenerate(url);
	    }
	    return path;
	  }
	  exports.normalize = normalize;
	
	  /**
	   * Joins two paths/URLs.
	   *
	   * @param aRoot The root path or URL.
	   * @param aPath The path or URL to be joined with the root.
	   *
	   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	   *   first.
	   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	   *   is updated with the result and aRoot is returned. Otherwise the result
	   *   is returned.
	   *   - If aPath is absolute, the result is aPath.
	   *   - Otherwise the two paths are joined with a slash.
	   * - Joining for example 'http://' and 'www.example.com' is also supported.
	   */
	  function join(aRoot, aPath) {
	    if (aRoot === "") {
	      aRoot = ".";
	    }
	    if (aPath === "") {
	      aPath = ".";
	    }
	    var aPathUrl = urlParse(aPath);
	    var aRootUrl = urlParse(aRoot);
	    if (aRootUrl) {
	      aRoot = aRootUrl.path || '/';
	    }
	
	    // `join(foo, '//www.example.org')`
	    if (aPathUrl && !aPathUrl.scheme) {
	      if (aRootUrl) {
	        aPathUrl.scheme = aRootUrl.scheme;
	      }
	      return urlGenerate(aPathUrl);
	    }
	
	    if (aPathUrl || aPath.match(dataUrlRegexp)) {
	      return aPath;
	    }
	
	    // `join('http://', 'www.example.com')`
	    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	      aRootUrl.host = aPath;
	      return urlGenerate(aRootUrl);
	    }
	
	    var joined = aPath.charAt(0) === '/'
	      ? aPath
	      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
	
	    if (aRootUrl) {
	      aRootUrl.path = joined;
	      return urlGenerate(aRootUrl);
	    }
	    return joined;
	  }
	  exports.join = join;
	
	  /**
	   * Make a path relative to a URL or another path.
	   *
	   * @param aRoot The root path or URL.
	   * @param aPath The path or URL to be made relative to aRoot.
	   */
	  function relative(aRoot, aPath) {
	    if (aRoot === "") {
	      aRoot = ".";
	    }
	
	    aRoot = aRoot.replace(/\/$/, '');
	
	    // XXX: It is possible to remove this block, and the tests still pass!
	    var url = urlParse(aRoot);
	    if (aPath.charAt(0) == "/" && url && url.path == "/") {
	      return aPath.slice(1);
	    }
	
	    return aPath.indexOf(aRoot + '/') === 0
	      ? aPath.substr(aRoot.length + 1)
	      : aPath;
	  }
	  exports.relative = relative;
	
	  /**
	   * Because behavior goes wacky when you set `__proto__` on objects, we
	   * have to prefix all the strings in our set with an arbitrary character.
	   *
	   * See https://github.com/mozilla/source-map/pull/31 and
	   * https://github.com/mozilla/source-map/issues/30
	   *
	   * @param String aStr
	   */
	  function toSetString(aStr) {
	    return '$' + aStr;
	  }
	  exports.toSetString = toSetString;
	
	  function fromSetString(aStr) {
	    return aStr.substr(1);
	  }
	  exports.fromSetString = fromSetString;
	
	  function strcmp(aStr1, aStr2) {
	    var s1 = aStr1 || "";
	    var s2 = aStr2 || "";
	    return (s1 > s2) - (s1 < s2);
	  }
	
	  /**
	   * Comparator between two mappings where the original positions are compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same original source/line/column, but different generated
	   * line and column the same. Useful when searching for a mapping with a
	   * stubbed out mapping.
	   */
	  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	    var cmp;
	
	    cmp = strcmp(mappingA.source, mappingB.source);
	    if (cmp) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp || onlyCompareOriginal) {
	      return cmp;
	    }
	
	    cmp = strcmp(mappingA.name, mappingB.name);
	    if (cmp) {
	      return cmp;
	    }
	
	    cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp) {
	      return cmp;
	    }
	
	    return mappingA.generatedColumn - mappingB.generatedColumn;
	  };
	  exports.compareByOriginalPositions = compareByOriginalPositions;
	
	  /**
	   * Comparator between two mappings where the generated positions are
	   * compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same generated line and column, but different
	   * source/name/original line and column the same. Useful when searching for a
	   * mapping with a stubbed out mapping.
	   */
	  function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
	    var cmp;
	
	    cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp) {
	      return cmp;
	    }
	
	    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	    if (cmp || onlyCompareGenerated) {
	      return cmp;
	    }
	
	    cmp = strcmp(mappingA.source, mappingB.source);
	    if (cmp) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp) {
	      return cmp;
	    }
	
	    return strcmp(mappingA.name, mappingB.name);
	  };
	  exports.compareByGeneratedPositions = compareByGeneratedPositions;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/estraverse/estraverse.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	  Copyright (C) 2012-2013 Yusuke Suzuki <utatane.tea@gmail.com>
	  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
	
	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:
	
	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.
	
	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	/*jslint vars:false, bitwise:true*/
	/*jshint indent:4*/
	/*global exports:true, define:true*/
	(function (root, factory) {
	    'use strict';
	
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
	    // and plain browser loading,
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== 'undefined') {
	        factory(exports);
	    } else {
	        factory((root.estraverse = {}));
	    }
	}(this, function clone(exports) {
	    'use strict';
	
	    var Syntax,
	        isArray,
	        VisitorOption,
	        VisitorKeys,
	        objectCreate,
	        objectKeys,
	        BREAK,
	        SKIP,
	        REMOVE;
	
	    function ignoreJSHintError() { }
	
	    isArray = Array.isArray;
	    if (!isArray) {
	        isArray = function isArray(array) {
	            return Object.prototype.toString.call(array) === '[object Array]';
	        };
	    }
	
	    function deepCopy(obj) {
	        var ret = {}, key, val;
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                val = obj[key];
	                if (typeof val === 'object' && val !== null) {
	                    ret[key] = deepCopy(val);
	                } else {
	                    ret[key] = val;
	                }
	            }
	        }
	        return ret;
	    }
	
	    function shallowCopy(obj) {
	        var ret = {}, key;
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                ret[key] = obj[key];
	            }
	        }
	        return ret;
	    }
	    ignoreJSHintError(shallowCopy);
	
	    // based on LLVM libc++ upper_bound / lower_bound
	    // MIT License
	
	    function upperBound(array, func) {
	        var diff, len, i, current;
	
	        len = array.length;
	        i = 0;
	
	        while (len) {
	            diff = len >>> 1;
	            current = i + diff;
	            if (func(array[current])) {
	                len = diff;
	            } else {
	                i = current + 1;
	                len -= diff + 1;
	            }
	        }
	        return i;
	    }
	
	    function lowerBound(array, func) {
	        var diff, len, i, current;
	
	        len = array.length;
	        i = 0;
	
	        while (len) {
	            diff = len >>> 1;
	            current = i + diff;
	            if (func(array[current])) {
	                i = current + 1;
	                len -= diff + 1;
	            } else {
	                len = diff;
	            }
	        }
	        return i;
	    }
	    ignoreJSHintError(lowerBound);
	
	    objectCreate = Object.create || (function () {
	        function F() { }
	
	        return function (o) {
	            F.prototype = o;
	            return new F();
	        };
	    })();
	
	    objectKeys = Object.keys || function (o) {
	        var keys = [], key;
	        for (key in o) {
	            keys.push(key);
	        }
	        return keys;
	    };
	
	    function extend(to, from) {
	        var keys = objectKeys(from), key, i, len;
	        for (i = 0, len = keys.length; i < len; i += 1) {
	            key = keys[i];
	            to[key] = from[key];
	        }
	        return to;
	    }
	
	    Syntax = {
	        AssignmentExpression: 'AssignmentExpression',
	        ArrayExpression: 'ArrayExpression',
	        ArrayPattern: 'ArrayPattern',
	        ArrowFunctionExpression: 'ArrowFunctionExpression',
	        AwaitExpression: 'AwaitExpression', // CAUTION: It's deferred to ES7.
	        BlockStatement: 'BlockStatement',
	        BinaryExpression: 'BinaryExpression',
	        BreakStatement: 'BreakStatement',
	        CallExpression: 'CallExpression',
	        CatchClause: 'CatchClause',
	        ClassBody: 'ClassBody',
	        ClassDeclaration: 'ClassDeclaration',
	        ClassExpression: 'ClassExpression',
	        ComprehensionBlock: 'ComprehensionBlock',  // CAUTION: It's deferred to ES7.
	        ComprehensionExpression: 'ComprehensionExpression',  // CAUTION: It's deferred to ES7.
	        ConditionalExpression: 'ConditionalExpression',
	        ContinueStatement: 'ContinueStatement',
	        DebuggerStatement: 'DebuggerStatement',
	        DirectiveStatement: 'DirectiveStatement',
	        DoWhileStatement: 'DoWhileStatement',
	        EmptyStatement: 'EmptyStatement',
	        ExportBatchSpecifier: 'ExportBatchSpecifier',
	        ExportDeclaration: 'ExportDeclaration',
	        ExportSpecifier: 'ExportSpecifier',
	        ExpressionStatement: 'ExpressionStatement',
	        ForStatement: 'ForStatement',
	        ForInStatement: 'ForInStatement',
	        ForOfStatement: 'ForOfStatement',
	        FunctionDeclaration: 'FunctionDeclaration',
	        FunctionExpression: 'FunctionExpression',
	        GeneratorExpression: 'GeneratorExpression',  // CAUTION: It's deferred to ES7.
	        Identifier: 'Identifier',
	        IfStatement: 'IfStatement',
	        ImportDeclaration: 'ImportDeclaration',
	        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	        ImportSpecifier: 'ImportSpecifier',
	        Literal: 'Literal',
	        LabeledStatement: 'LabeledStatement',
	        LogicalExpression: 'LogicalExpression',
	        MemberExpression: 'MemberExpression',
	        MethodDefinition: 'MethodDefinition',
	        ModuleSpecifier: 'ModuleSpecifier',
	        NewExpression: 'NewExpression',
	        ObjectExpression: 'ObjectExpression',
	        ObjectPattern: 'ObjectPattern',
	        Program: 'Program',
	        Property: 'Property',
	        ReturnStatement: 'ReturnStatement',
	        SequenceExpression: 'SequenceExpression',
	        SpreadElement: 'SpreadElement',
	        SwitchStatement: 'SwitchStatement',
	        SwitchCase: 'SwitchCase',
	        TaggedTemplateExpression: 'TaggedTemplateExpression',
	        TemplateElement: 'TemplateElement',
	        TemplateLiteral: 'TemplateLiteral',
	        ThisExpression: 'ThisExpression',
	        ThrowStatement: 'ThrowStatement',
	        TryStatement: 'TryStatement',
	        UnaryExpression: 'UnaryExpression',
	        UpdateExpression: 'UpdateExpression',
	        VariableDeclaration: 'VariableDeclaration',
	        VariableDeclarator: 'VariableDeclarator',
	        WhileStatement: 'WhileStatement',
	        WithStatement: 'WithStatement',
	        YieldExpression: 'YieldExpression'
	    };
	
	    VisitorKeys = {
	        AssignmentExpression: ['left', 'right'],
	        ArrayExpression: ['elements'],
	        ArrayPattern: ['elements'],
	        ArrowFunctionExpression: ['params', 'defaults', 'rest', 'body'],
	        AwaitExpression: ['argument'], // CAUTION: It's deferred to ES7.
	        BlockStatement: ['body'],
	        BinaryExpression: ['left', 'right'],
	        BreakStatement: ['label'],
	        CallExpression: ['callee', 'arguments'],
	        CatchClause: ['param', 'body'],
	        ClassBody: ['body'],
	        ClassDeclaration: ['id', 'body', 'superClass'],
	        ClassExpression: ['id', 'body', 'superClass'],
	        ComprehensionBlock: ['left', 'right'],  // CAUTION: It's deferred to ES7.
	        ComprehensionExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
	        ConditionalExpression: ['test', 'consequent', 'alternate'],
	        ContinueStatement: ['label'],
	        DebuggerStatement: [],
	        DirectiveStatement: [],
	        DoWhileStatement: ['body', 'test'],
	        EmptyStatement: [],
	        ExportBatchSpecifier: [],
	        ExportDeclaration: ['declaration', 'specifiers', 'source'],
	        ExportSpecifier: ['id', 'name'],
	        ExpressionStatement: ['expression'],
	        ForStatement: ['init', 'test', 'update', 'body'],
	        ForInStatement: ['left', 'right', 'body'],
	        ForOfStatement: ['left', 'right', 'body'],
	        FunctionDeclaration: ['id', 'params', 'defaults', 'rest', 'body'],
	        FunctionExpression: ['id', 'params', 'defaults', 'rest', 'body'],
	        GeneratorExpression: ['blocks', 'filter', 'body'],  // CAUTION: It's deferred to ES7.
	        Identifier: [],
	        IfStatement: ['test', 'consequent', 'alternate'],
	        ImportDeclaration: ['specifiers', 'source'],
	        ImportDefaultSpecifier: ['id'],
	        ImportNamespaceSpecifier: ['id'],
	        ImportSpecifier: ['id', 'name'],
	        Literal: [],
	        LabeledStatement: ['label', 'body'],
	        LogicalExpression: ['left', 'right'],
	        MemberExpression: ['object', 'property'],
	        MethodDefinition: ['key', 'value'],
	        ModuleSpecifier: [],
	        NewExpression: ['callee', 'arguments'],
	        ObjectExpression: ['properties'],
	        ObjectPattern: ['properties'],
	        Program: ['body'],
	        Property: ['key', 'value'],
	        ReturnStatement: ['argument'],
	        SequenceExpression: ['expressions'],
	        SpreadElement: ['argument'],
	        SwitchStatement: ['discriminant', 'cases'],
	        SwitchCase: ['test', 'consequent'],
	        TaggedTemplateExpression: ['tag', 'quasi'],
	        TemplateElement: [],
	        TemplateLiteral: ['quasis', 'expressions'],
	        ThisExpression: [],
	        ThrowStatement: ['argument'],
	        TryStatement: ['block', 'handlers', 'handler', 'guardedHandlers', 'finalizer'],
	        UnaryExpression: ['argument'],
	        UpdateExpression: ['argument'],
	        VariableDeclaration: ['declarations'],
	        VariableDeclarator: ['id', 'init'],
	        WhileStatement: ['test', 'body'],
	        WithStatement: ['object', 'body'],
	        YieldExpression: ['argument']
	    };
	
	    // unique id
	    BREAK = {};
	    SKIP = {};
	    REMOVE = {};
	
	    VisitorOption = {
	        Break: BREAK,
	        Skip: SKIP,
	        Remove: REMOVE
	    };
	
	    function Reference(parent, key) {
	        this.parent = parent;
	        this.key = key;
	    }
	
	    Reference.prototype.replace = function replace(node) {
	        this.parent[this.key] = node;
	    };
	
	    Reference.prototype.remove = function remove() {
	        if (isArray(this.parent)) {
	            this.parent.splice(this.key, 1);
	            return true;
	        } else {
	            this.replace(null);
	            return false;
	        }
	    };
	
	    function Element(node, path, wrap, ref) {
	        this.node = node;
	        this.path = path;
	        this.wrap = wrap;
	        this.ref = ref;
	    }
	
	    function Controller() { }
	
	    // API:
	    // return property path array from root to current node
	    Controller.prototype.path = function path() {
	        var i, iz, j, jz, result, element;
	
	        function addToPath(result, path) {
	            if (isArray(path)) {
	                for (j = 0, jz = path.length; j < jz; ++j) {
	                    result.push(path[j]);
	                }
	            } else {
	                result.push(path);
	            }
	        }
	
	        // root node
	        if (!this.__current.path) {
	            return null;
	        }
	
	        // first node is sentinel, second node is root element
	        result = [];
	        for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
	            element = this.__leavelist[i];
	            addToPath(result, element.path);
	        }
	        addToPath(result, this.__current.path);
	        return result;
	    };
	
	    // API:
	    // return type of current node
	    Controller.prototype.type = function () {
	        var node = this.current();
	        return node.type || this.__current.wrap;
	    };
	
	    // API:
	    // return array of parent elements
	    Controller.prototype.parents = function parents() {
	        var i, iz, result;
	
	        // first node is sentinel
	        result = [];
	        for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
	            result.push(this.__leavelist[i].node);
	        }
	
	        return result;
	    };
	
	    // API:
	    // return current node
	    Controller.prototype.current = function current() {
	        return this.__current.node;
	    };
	
	    Controller.prototype.__execute = function __execute(callback, element) {
	        var previous, result;
	
	        result = undefined;
	
	        previous  = this.__current;
	        this.__current = element;
	        this.__state = null;
	        if (callback) {
	            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
	        }
	        this.__current = previous;
	
	        return result;
	    };
	
	    // API:
	    // notify control skip / break
	    Controller.prototype.notify = function notify(flag) {
	        this.__state = flag;
	    };
	
	    // API:
	    // skip child nodes of current node
	    Controller.prototype.skip = function () {
	        this.notify(SKIP);
	    };
	
	    // API:
	    // break traversals
	    Controller.prototype['break'] = function () {
	        this.notify(BREAK);
	    };
	
	    // API:
	    // remove node
	    Controller.prototype.remove = function () {
	        this.notify(REMOVE);
	    };
	
	    Controller.prototype.__initialize = function(root, visitor) {
	        this.visitor = visitor;
	        this.root = root;
	        this.__worklist = [];
	        this.__leavelist = [];
	        this.__current = null;
	        this.__state = null;
	        this.__fallback = visitor.fallback === 'iteration';
	        this.__keys = VisitorKeys;
	        if (visitor.keys) {
	            this.__keys = extend(objectCreate(this.__keys), visitor.keys);
	        }
	    };
	
	    function isNode(node) {
	        if (node == null) {
	            return false;
	        }
	        return typeof node === 'object' && typeof node.type === 'string';
	    }
	
	    function isProperty(nodeType, key) {
	        return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === key;
	    }
	
	    Controller.prototype.traverse = function traverse(root, visitor) {
	        var worklist,
	            leavelist,
	            element,
	            node,
	            nodeType,
	            ret,
	            key,
	            current,
	            current2,
	            candidates,
	            candidate,
	            sentinel;
	
	        this.__initialize(root, visitor);
	
	        sentinel = {};
	
	        // reference
	        worklist = this.__worklist;
	        leavelist = this.__leavelist;
	
	        // initialize
	        worklist.push(new Element(root, null, null, null));
	        leavelist.push(new Element(null, null, null, null));
	
	        while (worklist.length) {
	            element = worklist.pop();
	
	            if (element === sentinel) {
	                element = leavelist.pop();
	
	                ret = this.__execute(visitor.leave, element);
	
	                if (this.__state === BREAK || ret === BREAK) {
	                    return;
	                }
	                continue;
	            }
	
	            if (element.node) {
	
	                ret = this.__execute(visitor.enter, element);
	
	                if (this.__state === BREAK || ret === BREAK) {
	                    return;
	                }
	
	                worklist.push(sentinel);
	                leavelist.push(element);
	
	                if (this.__state === SKIP || ret === SKIP) {
	                    continue;
	                }
	
	                node = element.node;
	                nodeType = element.wrap || node.type;
	                candidates = this.__keys[nodeType];
	                if (!candidates) {
	                    if (this.__fallback) {
	                        candidates = objectKeys(node);
	                    } else {
	                        throw new Error('Unknown node type ' + nodeType + '.');
	                    }
	                }
	
	                current = candidates.length;
	                while ((current -= 1) >= 0) {
	                    key = candidates[current];
	                    candidate = node[key];
	                    if (!candidate) {
	                        continue;
	                    }
	
	                    if (isArray(candidate)) {
	                        current2 = candidate.length;
	                        while ((current2 -= 1) >= 0) {
	                            if (!candidate[current2]) {
	                                continue;
	                            }
	                            if (isProperty(nodeType, candidates[current])) {
	                                element = new Element(candidate[current2], [key, current2], 'Property', null);
	                            } else if (isNode(candidate[current2])) {
	                                element = new Element(candidate[current2], [key, current2], null, null);
	                            } else {
	                                continue;
	                            }
	                            worklist.push(element);
	                        }
	                    } else if (isNode(candidate)) {
	                        worklist.push(new Element(candidate, key, null, null));
	                    }
	                }
	            }
	        }
	    };
	
	    Controller.prototype.replace = function replace(root, visitor) {
	        function removeElem(element) {
	            var i,
	                key,
	                nextElem,
	                parent;
	
	            if (element.ref.remove()) {
	                // When the reference is an element of an array.
	                key = element.ref.key;
	                parent = element.ref.parent;
	
	                // If removed from array, then decrease following items' keys.
	                i = worklist.length;
	                while (i--) {
	                    nextElem = worklist[i];
	                    if (nextElem.ref && nextElem.ref.parent === parent) {
	                        if  (nextElem.ref.key < key) {
	                            break;
	                        }
	                        --nextElem.ref.key;
	                    }
	                }
	            }
	        }
	
	        var worklist,
	            leavelist,
	            node,
	            nodeType,
	            target,
	            element,
	            current,
	            current2,
	            candidates,
	            candidate,
	            sentinel,
	            outer,
	            key;
	
	        this.__initialize(root, visitor);
	
	        sentinel = {};
	
	        // reference
	        worklist = this.__worklist;
	        leavelist = this.__leavelist;
	
	        // initialize
	        outer = {
	            root: root
	        };
	        element = new Element(root, null, null, new Reference(outer, 'root'));
	        worklist.push(element);
	        leavelist.push(element);
	
	        while (worklist.length) {
	            element = worklist.pop();
	
	            if (element === sentinel) {
	                element = leavelist.pop();
	
	                target = this.__execute(visitor.leave, element);
	
	                // node may be replaced with null,
	                // so distinguish between undefined and null in this place
	                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
	                    // replace
	                    element.ref.replace(target);
	                }
	
	                if (this.__state === REMOVE || target === REMOVE) {
	                    removeElem(element);
	                }
	
	                if (this.__state === BREAK || target === BREAK) {
	                    return outer.root;
	                }
	                continue;
	            }
	
	            target = this.__execute(visitor.enter, element);
	
	            // node may be replaced with null,
	            // so distinguish between undefined and null in this place
	            if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
	                // replace
	                element.ref.replace(target);
	                element.node = target;
	            }
	
	            if (this.__state === REMOVE || target === REMOVE) {
	                removeElem(element);
	                element.node = null;
	            }
	
	            if (this.__state === BREAK || target === BREAK) {
	                return outer.root;
	            }
	
	            // node may be null
	            node = element.node;
	            if (!node) {
	                continue;
	            }
	
	            worklist.push(sentinel);
	            leavelist.push(element);
	
	            if (this.__state === SKIP || target === SKIP) {
	                continue;
	            }
	
	            nodeType = element.wrap || node.type;
	            candidates = this.__keys[nodeType];
	            if (!candidates) {
	                if (this.__fallback) {
	                    candidates = objectKeys(node);
	                } else {
	                    throw new Error('Unknown node type ' + nodeType + '.');
	                }
	            }
	
	            current = candidates.length;
	            while ((current -= 1) >= 0) {
	                key = candidates[current];
	                candidate = node[key];
	                if (!candidate) {
	                    continue;
	                }
	
	                if (isArray(candidate)) {
	                    current2 = candidate.length;
	                    while ((current2 -= 1) >= 0) {
	                        if (!candidate[current2]) {
	                            continue;
	                        }
	                        if (isProperty(nodeType, candidates[current])) {
	                            element = new Element(candidate[current2], [key, current2], 'Property', new Reference(candidate, current2));
	                        } else if (isNode(candidate[current2])) {
	                            element = new Element(candidate[current2], [key, current2], null, new Reference(candidate, current2));
	                        } else {
	                            continue;
	                        }
	                        worklist.push(element);
	                    }
	                } else if (isNode(candidate)) {
	                    worklist.push(new Element(candidate, key, null, new Reference(node, key)));
	                }
	            }
	        }
	
	        return outer.root;
	    };
	
	    function traverse(root, visitor) {
	        var controller = new Controller();
	        return controller.traverse(root, visitor);
	    }
	
	    function replace(root, visitor) {
	        var controller = new Controller();
	        return controller.replace(root, visitor);
	    }
	
	    function extendCommentRange(comment, tokens) {
	        var target;
	
	        target = upperBound(tokens, function search(token) {
	            return token.range[0] > comment.range[0];
	        });
	
	        comment.extendedRange = [comment.range[0], comment.range[1]];
	
	        if (target !== tokens.length) {
	            comment.extendedRange[1] = tokens[target].range[0];
	        }
	
	        target -= 1;
	        if (target >= 0) {
	            comment.extendedRange[0] = tokens[target].range[1];
	        }
	
	        return comment;
	    }
	
	    function attachComments(tree, providedComments, tokens) {
	        // At first, we should calculate extended comment ranges.
	        var comments = [], comment, len, i, cursor;
	
	        if (!tree.range) {
	            throw new Error('attachComments needs range information');
	        }
	
	        // tokens array is empty, we attach comments to tree as 'leadingComments'
	        if (!tokens.length) {
	            if (providedComments.length) {
	                for (i = 0, len = providedComments.length; i < len; i += 1) {
	                    comment = deepCopy(providedComments[i]);
	                    comment.extendedRange = [0, tree.range[0]];
	                    comments.push(comment);
	                }
	                tree.leadingComments = comments;
	            }
	            return tree;
	        }
	
	        for (i = 0, len = providedComments.length; i < len; i += 1) {
	            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
	        }
	
	        // This is based on John Freeman's implementation.
	        cursor = 0;
	        traverse(tree, {
	            enter: function (node) {
	                var comment;
	
	                while (cursor < comments.length) {
	                    comment = comments[cursor];
	                    if (comment.extendedRange[1] > node.range[0]) {
	                        break;
	                    }
	
	                    if (comment.extendedRange[1] === node.range[0]) {
	                        if (!node.leadingComments) {
	                            node.leadingComments = [];
	                        }
	                        node.leadingComments.push(comment);
	                        comments.splice(cursor, 1);
	                    } else {
	                        cursor += 1;
	                    }
	                }
	
	                // already out of owned node
	                if (cursor === comments.length) {
	                    return VisitorOption.Break;
	                }
	
	                if (comments[cursor].extendedRange[0] > node.range[1]) {
	                    return VisitorOption.Skip;
	                }
	            }
	        });
	
	        cursor = 0;
	        traverse(tree, {
	            leave: function (node) {
	                var comment;
	
	                while (cursor < comments.length) {
	                    comment = comments[cursor];
	                    if (node.range[1] < comment.extendedRange[0]) {
	                        break;
	                    }
	
	                    if (node.range[1] === comment.extendedRange[0]) {
	                        if (!node.trailingComments) {
	                            node.trailingComments = [];
	                        }
	                        node.trailingComments.push(comment);
	                        comments.splice(cursor, 1);
	                    } else {
	                        cursor += 1;
	                    }
	                }
	
	                // already out of owned node
	                if (cursor === comments.length) {
	                    return VisitorOption.Break;
	                }
	
	                if (comments[cursor].extendedRange[0] > node.range[1]) {
	                    return VisitorOption.Skip;
	                }
	            }
	        });
	
	        return tree;
	    }
	
	    exports.version = '1.8.1-dev';
	    exports.Syntax = Syntax;
	    exports.traverse = traverse;
	    exports.replace = replace;
	    exports.attachComments = attachComments;
	    exports.VisitorKeys = VisitorKeys;
	    exports.VisitorOption = VisitorOption;
	    exports.Controller = Controller;
	    exports.cloneEnvironment = function () { return clone({}); };
	
	    return exports;
	}));
	/* vim: set sw=4 ts=4 et tw=80 : */


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/mapping-list.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2014 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var util = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js");
	
	  /**
	   * Determine whether mappingB is after mappingA with respect to generated
	   * position.
	   */
	  function generatedPositionAfter(mappingA, mappingB) {
	    // Optimized for most common case
	    var lineA = mappingA.generatedLine;
	    var lineB = mappingB.generatedLine;
	    var columnA = mappingA.generatedColumn;
	    var columnB = mappingB.generatedColumn;
	    return lineB > lineA || lineB == lineA && columnB >= columnA ||
	           util.compareByGeneratedPositions(mappingA, mappingB) <= 0;
	  }
	
	  /**
	   * A data structure to provide a sorted view of accumulated mappings in a
	   * performance conscious manner. It trades a neglibable overhead in general
	   * case for a large speedup in case of mappings being added in order.
	   */
	  function MappingList() {
	    this._array = [];
	    this._sorted = true;
	    // Serves as infimum
	    this._last = {generatedLine: -1, generatedColumn: 0};
	  }
	
	  /**
	   * Iterate through internal items. This method takes the same arguments that
	   * `Array.prototype.forEach` takes.
	   *
	   * NOTE: The order of the mappings is NOT guaranteed.
	   */
	  MappingList.prototype.unsortedForEach =
	    function MappingList_forEach(aCallback, aThisArg) {
	      this._array.forEach(aCallback, aThisArg);
	    };
	
	  /**
	   * Add the given source mapping.
	   *
	   * @param Object aMapping
	   */
	  MappingList.prototype.add = function MappingList_add(aMapping) {
	    var mapping;
	    if (generatedPositionAfter(this._last, aMapping)) {
	      this._last = aMapping;
	      this._array.push(aMapping);
	    } else {
	      this._sorted = false;
	      this._array.push(aMapping);
	    }
	  };
	
	  /**
	   * Returns the flat, sorted array of mappings. The mappings are sorted by
	   * generated position.
	   *
	   * WARNING: This method returns internal data without copying, for
	   * performance. The return value must NOT be mutated, and should be treated as
	   * an immutable borrow. If you want to take ownership, you must make your own
	   * copy.
	   */
	  MappingList.prototype.toArray = function MappingList_toArray() {
	    if (!this._sorted) {
	      this._array.sort(util.compareByGeneratedPositions);
	      this._sorted = true;
	    }
	    return this._array;
	  };
	
	  exports.MappingList = MappingList;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/source-map-consumer.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var util = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js");
	
	  function SourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }
	
	    // We do late requires because the subclasses require() this file.
	    if (sourceMap.sections != null) {
	      var indexedSourceMapConsumer = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/indexed-source-map-consumer.js");
	      return new indexedSourceMapConsumer.IndexedSourceMapConsumer(sourceMap);
	    } else {
	      var basicSourceMapConsumer = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/basic-source-map-consumer.js");
	      return new basicSourceMapConsumer.BasicSourceMapConsumer(sourceMap);
	    }
	  }
	
	  SourceMapConsumer.fromSourceMap = function(aSourceMap) {
	    var basicSourceMapConsumer = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/basic-source-map-consumer.js");
	    return basicSourceMapConsumer.BasicSourceMapConsumer
	            .fromSourceMap(aSourceMap);
	  }
	
	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  SourceMapConsumer.prototype._version = 3;
	
	
	  // `__generatedMappings` and `__originalMappings` are arrays that hold the
	  // parsed mapping coordinates from the source map's "mappings" attribute. They
	  // are lazily instantiated, accessed via the `_generatedMappings` and
	  // `_originalMappings` getters respectively, and we only parse the mappings
	  // and create these arrays once queried for a source location. We jump through
	  // these hoops because there can be many thousands of mappings, and parsing
	  // them is expensive, so we only want to do it if we must.
	  //
	  // Each object in the arrays is of the form:
	  //
	  //     {
	  //       generatedLine: The line number in the generated code,
	  //       generatedColumn: The column number in the generated code,
	  //       source: The path to the original source file that generated this
	  //               chunk of code,
	  //       originalLine: The line number in the original source that
	  //                     corresponds to this chunk of generated code,
	  //       originalColumn: The column number in the original source that
	  //                       corresponds to this chunk of generated code,
	  //       name: The name of the original symbol which generated this chunk of
	  //             code.
	  //     }
	  //
	  // All properties except for `generatedLine` and `generatedColumn` can be
	  // `null`.
	  //
	  // `_generatedMappings` is ordered by the generated positions.
	  //
	  // `_originalMappings` is ordered by the original positions.
	
	  SourceMapConsumer.prototype.__generatedMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	    get: function () {
	      if (!this.__generatedMappings) {
	        this.__generatedMappings = [];
	        this.__originalMappings = [];
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }
	
	      return this.__generatedMappings;
	    }
	  });
	
	  SourceMapConsumer.prototype.__originalMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	    get: function () {
	      if (!this.__originalMappings) {
	        this.__generatedMappings = [];
	        this.__originalMappings = [];
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }
	
	      return this.__originalMappings;
	    }
	  });
	
	  SourceMapConsumer.prototype._nextCharIsMappingSeparator =
	    function SourceMapConsumer_nextCharIsMappingSeparator(aStr) {
	      var c = aStr.charAt(0);
	      return c === ";" || c === ",";
	    };
	
	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  SourceMapConsumer.prototype._parseMappings =
	    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      throw new Error("Subclasses must implement _parseMappings");
	    };
	
	  SourceMapConsumer.GENERATED_ORDER = 1;
	  SourceMapConsumer.ORIGINAL_ORDER = 2;
	
	  /**
	   * Iterate over each mapping between an original source/line/column and a
	   * generated line/column in this source map.
	   *
	   * @param Function aCallback
	   *        The function that is called with each mapping.
	   * @param Object aContext
	   *        Optional. If specified, this object will be the value of `this` every
	   *        time that `aCallback` is called.
	   * @param aOrder
	   *        Either `SourceMapConsumer.GENERATED_ORDER` or
	   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	   *        iterate over the mappings sorted by the generated file's line/column
	   *        order or the original's source/line/column order, respectively. Defaults to
	   *        `SourceMapConsumer.GENERATED_ORDER`.
	   */
	  SourceMapConsumer.prototype.eachMapping =
	    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	      var context = aContext || null;
	      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
	
	      var mappings;
	      switch (order) {
	      case SourceMapConsumer.GENERATED_ORDER:
	        mappings = this._generatedMappings;
	        break;
	      case SourceMapConsumer.ORIGINAL_ORDER:
	        mappings = this._originalMappings;
	        break;
	      default:
	        throw new Error("Unknown order of iteration.");
	      }
	
	      var sourceRoot = this.sourceRoot;
	      mappings.map(function (mapping) {
	        var source = mapping.source;
	        if (source != null && sourceRoot != null) {
	          source = util.join(sourceRoot, source);
	        }
	        return {
	          source: source,
	          generatedLine: mapping.generatedLine,
	          generatedColumn: mapping.generatedColumn,
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: mapping.name
	        };
	      }).forEach(aCallback, context);
	    };
	
	  /**
	   * Returns all generated line and column information for the original source
	   * and line provided. The only argument is an object with the following
	   * properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *
	   * and an array of objects is returned, each with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  SourceMapConsumer.prototype.allGeneratedPositionsFor =
	    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	      // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
	      // returns the index of the closest mapping less than the needle. By
	      // setting needle.originalColumn to Infinity, we thus find the last
	      // mapping for the given line, provided such a mapping exists.
	      var needle = {
	        source: util.getArg(aArgs, 'source'),
	        originalLine: util.getArg(aArgs, 'line'),
	        originalColumn: Infinity
	      };
	
	      if (this.sourceRoot != null) {
	        needle.source = util.relative(this.sourceRoot, needle.source);
	      }
	
	      var mappings = [];
	
	      var index = this._findMapping(needle,
	                                    this._originalMappings,
	                                    "originalLine",
	                                    "originalColumn",
	                                    util.compareByOriginalPositions);
	      if (index >= 0) {
	        var mapping = this._originalMappings[index];
	
	        while (mapping && mapping.originalLine === needle.originalLine) {
	          mappings.push({
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          });
	
	          mapping = this._originalMappings[--index];
	        }
	      }
	
	      return mappings.reverse();
	    };
	
	  exports.SourceMapConsumer = SourceMapConsumer;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/indexed-source-map-consumer.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var util = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js");
	  var binarySearch = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/binary-search.js");
	  var SourceMapConsumer = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/source-map-consumer.js").SourceMapConsumer;
	  var BasicSourceMapConsumer = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/basic-source-map-consumer.js").BasicSourceMapConsumer;
	
	  /**
	   * An IndexedSourceMapConsumer instance represents a parsed source map which
	   * we can query for information. It differs from BasicSourceMapConsumer in
	   * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	   * input.
	   *
	   * The only parameter is a raw source map (either as a JSON string, or already
	   * parsed to an object). According to the spec for indexed source maps, they
	   * have the following attributes:
	   *
	   *   - version: Which version of the source map spec this map is following.
	   *   - file: Optional. The generated file this source map is associated with.
	   *   - sections: A list of section definitions.
	   *
	   * Each value under the "sections" field has two fields:
	   *   - offset: The offset into the original specified at which this section
	   *       begins to apply, defined as an object with a "line" and "column"
	   *       field.
	   *   - map: A source map definition. This source map could also be indexed,
	   *       but doesn't have to be.
	   *
	   * Instead of the "map" field, it's also possible to have a "url" field
	   * specifying a URL to retrieve a source map from, but that's currently
	   * unsupported.
	   *
	   * Here's an example source map, taken from the source map spec[0], but
	   * modified to omit a section which uses the "url" field.
	   *
	   *  {
	   *    version : 3,
	   *    file: "app.js",
	   *    sections: [{
	   *      offset: {line:100, column:10},
	   *      map: {
	   *        version : 3,
	   *        file: "section.js",
	   *        sources: ["foo.js", "bar.js"],
	   *        names: ["src", "maps", "are", "fun"],
	   *        mappings: "AAAA,E;;ABCDE;"
	   *      }
	   *    }],
	   *  }
	   *
	   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	   */
	  function IndexedSourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }
	
	    var version = util.getArg(sourceMap, 'version');
	    var sections = util.getArg(sourceMap, 'sections');
	
	    if (version != this._version) {
	      throw new Error('Unsupported version: ' + version);
	    }
	
	    var lastOffset = {
	      line: -1,
	      column: 0
	    };
	    this._sections = sections.map(function (s) {
	      if (s.url) {
	        // The url field will require support for asynchronicity.
	        // See https://github.com/mozilla/source-map/issues/16
	        throw new Error('Support for url field in sections not implemented.');
	      }
	      var offset = util.getArg(s, 'offset');
	      var offsetLine = util.getArg(offset, 'line');
	      var offsetColumn = util.getArg(offset, 'column');
	
	      if (offsetLine < lastOffset.line ||
	          (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
	        throw new Error('Section offsets must be ordered and non-overlapping.');
	      }
	      lastOffset = offset;
	
	      return {
	        generatedOffset: {
	          // The offset fields are 0-based, but we use 1-based indices when
	          // encoding/decoding from VLQ.
	          generatedLine: offsetLine + 1,
	          generatedColumn: offsetColumn + 1
	        },
	        consumer: new SourceMapConsumer(util.getArg(s, 'map'))
	      }
	    });
	  }
	
	  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
	
	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  IndexedSourceMapConsumer.prototype._version = 3;
	
	  /**
	   * The list of original sources.
	   */
	  Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
	    get: function () {
	      var sources = [];
	      for (var i = 0; i < this._sections.length; i++) {
	        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
	          sources.push(this._sections[i].consumer.sources[j]);
	        }
	      };
	      return sources;
	    }
	  });
	
	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.
	   *   - column: The column number in the generated source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.
	   *   - column: The column number in the original source, or null.
	   *   - name: The original identifier, or null.
	   */
	  IndexedSourceMapConsumer.prototype.originalPositionFor =
	    function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
	      var needle = {
	        generatedLine: util.getArg(aArgs, 'line'),
	        generatedColumn: util.getArg(aArgs, 'column')
	      };
	
	      // Find the section containing the generated position we're trying to map
	      // to an original position.
	      var sectionIndex = binarySearch.search(needle, this._sections,
	        function(needle, section) {
	          var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
	          if (cmp) {
	            return cmp;
	          }
	
	          return (needle.generatedColumn -
	                  section.generatedOffset.generatedColumn);
	        });
	      var section = this._sections[sectionIndex];
	
	      if (!section) {
	        return {
	          source: null,
	          line: null,
	          column: null,
	          name: null
	        };
	      }
	
	      return section.consumer.originalPositionFor({
	        line: needle.generatedLine -
	          (section.generatedOffset.generatedLine - 1),
	        column: needle.generatedColumn -
	          (section.generatedOffset.generatedLine === needle.generatedLine
	           ? section.generatedOffset.generatedColumn - 1
	           : 0)
	      });
	    };
	
	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * available.
	   */
	  IndexedSourceMapConsumer.prototype.sourceContentFor =
	    function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	      for (var i = 0; i < this._sections.length; i++) {
	        var section = this._sections[i];
	
	        var content = section.consumer.sourceContentFor(aSource, true);
	        if (content) {
	          return content;
	        }
	      }
	      if (nullOnMissing) {
	        return null;
	      }
	      else {
	        throw new Error('"' + aSource + '" is not in the SourceMap.');
	      }
	    };
	
	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *   - column: The column number in the original source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  IndexedSourceMapConsumer.prototype.generatedPositionFor =
	    function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
	      for (var i = 0; i < this._sections.length; i++) {
	        var section = this._sections[i];
	
	        // Only consider this section if the requested source is in the list of
	        // sources of the consumer.
	        if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
	          continue;
	        }
	        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
	        if (generatedPosition) {
	          var ret = {
	            line: generatedPosition.line +
	              (section.generatedOffset.generatedLine - 1),
	            column: generatedPosition.column +
	              (section.generatedOffset.generatedLine === generatedPosition.line
	               ? section.generatedOffset.generatedColumn - 1
	               : 0)
	          };
	          return ret;
	        }
	      }
	
	      return {
	        line: null,
	        column: null
	      };
	    };
	
	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  IndexedSourceMapConsumer.prototype._parseMappings =
	    function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      this.__generatedMappings = [];
	      this.__originalMappings = [];
	      for (var i = 0; i < this._sections.length; i++) {
	        var section = this._sections[i];
	        var sectionMappings = section.consumer._generatedMappings;
	        for (var j = 0; j < sectionMappings.length; j++) {
	          var mapping = sectionMappings[i];
	
	          var source = mapping.source;
	          var sourceRoot = section.consumer.sourceRoot;
	
	          if (source != null && sourceRoot != null) {
	            source = util.join(sourceRoot, source);
	          }
	
	          // The mappings coming from the consumer for the section have
	          // generated positions relative to the start of the section, so we
	          // need to offset them to be relative to the start of the concatenated
	          // generated file.
	          var adjustedMapping = {
	            source: source,
	            generatedLine: mapping.generatedLine +
	              (section.generatedOffset.generatedLine - 1),
	            generatedColumn: mapping.column +
	              (section.generatedOffset.generatedLine === mapping.generatedLine)
	              ? section.generatedOffset.generatedColumn - 1
	              : 0,
	            originalLine: mapping.originalLine,
	            originalColumn: mapping.originalColumn,
	            name: mapping.name
	          };
	
	          this.__generatedMappings.push(adjustedMapping);
	          if (typeof adjustedMapping.originalLine === 'number') {
	            this.__originalMappings.push(adjustedMapping);
	          }
	        };
	      };
	
	    this.__generatedMappings.sort(util.compareByGeneratedPositions);
	    this.__originalMappings.sort(util.compareByOriginalPositions);
	  };
	
	  exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/binary-search.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  /**
	   * Recursive implementation of binary search.
	   *
	   * @param aLow Indices here and lower do not contain the needle.
	   * @param aHigh Indices here and higher do not contain the needle.
	   * @param aNeedle The element being searched for.
	   * @param aHaystack The non-empty array being searched.
	   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	   */
	  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
	    // This function terminates when one of the following is true:
	    //
	    //   1. We find the exact element we are looking for.
	    //
	    //   2. We did not find the exact element, but we can return the index of
	    //      the next closest element that is less than that element.
	    //
	    //   3. We did not find the exact element, and there is no next-closest
	    //      element which is less than the one we are searching for, so we
	    //      return -1.
	    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	    var cmp = aCompare(aNeedle, aHaystack[mid], true);
	    if (cmp === 0) {
	      // Found the element we are looking for.
	      return mid;
	    }
	    else if (cmp > 0) {
	      // aHaystack[mid] is greater than our needle.
	      if (aHigh - mid > 1) {
	        // The element is in the upper half.
	        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
	      }
	      // We did not find an exact match, return the next closest one
	      // (termination case 2).
	      return mid;
	    }
	    else {
	      // aHaystack[mid] is less than our needle.
	      if (mid - aLow > 1) {
	        // The element is in the lower half.
	        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
	      }
	      // The exact needle element was not found in this haystack. Determine if
	      // we are in termination case (2) or (3) and return the appropriate thing.
	      return aLow < 0 ? -1 : aLow;
	    }
	  }
	
	  /**
	   * This is an implementation of binary search which will always try and return
	   * the index of next lowest value checked if there is no exact hit. This is
	   * because mappings between original and generated line/col pairs are single
	   * points, and there is an implicit region between each of them, so a miss
	   * just means that you aren't on the very start of a region.
	   *
	   * @param aNeedle The element you are looking for.
	   * @param aHaystack The array that is being searched.
	   * @param aCompare A function which takes the needle and an element in the
	   *     array and returns -1, 0, or 1 depending on whether the needle is less
	   *     than, equal to, or greater than the element, respectively.
	   */
	  exports.search = function search(aNeedle, aHaystack, aCompare) {
	    if (aHaystack.length === 0) {
	      return -1;
	    }
	    return recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
	  };
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/basic-source-map-consumer.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var util = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js");
	  var binarySearch = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/binary-search.js");
	  var ArraySet = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/array-set.js").ArraySet;
	  var base64VLQ = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/base64-vlq.js");
	  var SourceMapConsumer = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/source-map-consumer.js").SourceMapConsumer;
	
	  /**
	   * A BasicSourceMapConsumer instance represents a parsed source map which we can
	   * query for information about the original file positions by giving it a file
	   * position in the generated source.
	   *
	   * The only parameter is the raw source map (either as a JSON string, or
	   * already parsed to an object). According to the spec, source maps have the
	   * following attributes:
	   *
	   *   - version: Which version of the source map spec this map is following.
	   *   - sources: An array of URLs to the original source files.
	   *   - names: An array of identifiers which can be referrenced by individual mappings.
	   *   - sourceRoot: Optional. The URL root from which all sources are relative.
	   *   - sourcesContent: Optional. An array of contents of the original source files.
	   *   - mappings: A string of base64 VLQs which contain the actual mappings.
	   *   - file: Optional. The generated file this source map is associated with.
	   *
	   * Here is an example source map, taken from the source map spec[0]:
	   *
	   *     {
	   *       version : 3,
	   *       file: "out.js",
	   *       sourceRoot : "",
	   *       sources: ["foo.js", "bar.js"],
	   *       names: ["src", "maps", "are", "fun"],
	   *       mappings: "AA,AB;;ABCDE;"
	   *     }
	   *
	   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	   */
	  function BasicSourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }
	
	    var version = util.getArg(sourceMap, 'version');
	    var sources = util.getArg(sourceMap, 'sources');
	    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	    // requires the array) to play nice here.
	    var names = util.getArg(sourceMap, 'names', []);
	    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	    var mappings = util.getArg(sourceMap, 'mappings');
	    var file = util.getArg(sourceMap, 'file', null);
	
	    // Once again, Sass deviates from the spec and supplies the version as a
	    // string rather than a number, so we use loose equality checking here.
	    if (version != this._version) {
	      throw new Error('Unsupported version: ' + version);
	    }
	
	    // Some source maps produce relative source paths like "./foo.js" instead of
	    // "foo.js".  Normalize these first so that future comparisons will succeed.
	    // See bugzil.la/1090768.
	    sources = sources.map(util.normalize);
	
	    // Pass `true` below to allow duplicate names and sources. While source maps
	    // are intended to be compressed and deduplicated, the TypeScript compiler
	    // sometimes generates source maps with duplicates in them. See Github issue
	    // #72 and bugzil.la/889492.
	    this._names = ArraySet.fromArray(names, true);
	    this._sources = ArraySet.fromArray(sources, true);
	
	    this.sourceRoot = sourceRoot;
	    this.sourcesContent = sourcesContent;
	    this._mappings = mappings;
	    this.file = file;
	  }
	
	  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	
	  /**
	   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	   *
	   * @param SourceMapGenerator aSourceMap
	   *        The source map that will be consumed.
	   * @returns BasicSourceMapConsumer
	   */
	  BasicSourceMapConsumer.fromSourceMap =
	    function SourceMapConsumer_fromSourceMap(aSourceMap) {
	      var smc = Object.create(BasicSourceMapConsumer.prototype);
	
	      smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	      smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	      smc.sourceRoot = aSourceMap._sourceRoot;
	      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                              smc.sourceRoot);
	      smc.file = aSourceMap._file;
	
	      smc.__generatedMappings = aSourceMap._mappings.toArray().slice();
	      smc.__originalMappings = aSourceMap._mappings.toArray().slice()
	        .sort(util.compareByOriginalPositions);
	
	      return smc;
	    };
	
	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  BasicSourceMapConsumer.prototype._version = 3;
	
	  /**
	   * The list of original sources.
	   */
	  Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
	    get: function () {
	      return this._sources.toArray().map(function (s) {
	        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
	      }, this);
	    }
	  });
	
	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  BasicSourceMapConsumer.prototype._parseMappings =
	    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      var generatedLine = 1;
	      var previousGeneratedColumn = 0;
	      var previousOriginalLine = 0;
	      var previousOriginalColumn = 0;
	      var previousSource = 0;
	      var previousName = 0;
	      var str = aStr;
	      var temp = {};
	      var mapping;
	
	      while (str.length > 0) {
	        if (str.charAt(0) === ';') {
	          generatedLine++;
	          str = str.slice(1);
	          previousGeneratedColumn = 0;
	        }
	        else if (str.charAt(0) === ',') {
	          str = str.slice(1);
	        }
	        else {
	          mapping = {};
	          mapping.generatedLine = generatedLine;
	
	          // Generated column.
	          base64VLQ.decode(str, temp);
	          mapping.generatedColumn = previousGeneratedColumn + temp.value;
	          previousGeneratedColumn = mapping.generatedColumn;
	          str = temp.rest;
	
	          if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
	            // Original source.
	            base64VLQ.decode(str, temp);
	            mapping.source = this._sources.at(previousSource + temp.value);
	            previousSource += temp.value;
	            str = temp.rest;
	            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
	              throw new Error('Found a source, but no line and column');
	            }
	
	            // Original line.
	            base64VLQ.decode(str, temp);
	            mapping.originalLine = previousOriginalLine + temp.value;
	            previousOriginalLine = mapping.originalLine;
	            // Lines are stored 0-based
	            mapping.originalLine += 1;
	            str = temp.rest;
	            if (str.length === 0 || this._nextCharIsMappingSeparator(str)) {
	              throw new Error('Found a source and line, but no column');
	            }
	
	            // Original column.
	            base64VLQ.decode(str, temp);
	            mapping.originalColumn = previousOriginalColumn + temp.value;
	            previousOriginalColumn = mapping.originalColumn;
	            str = temp.rest;
	
	            if (str.length > 0 && !this._nextCharIsMappingSeparator(str)) {
	              // Original name.
	              base64VLQ.decode(str, temp);
	              mapping.name = this._names.at(previousName + temp.value);
	              previousName += temp.value;
	              str = temp.rest;
	            }
	          }
	
	          this.__generatedMappings.push(mapping);
	          if (typeof mapping.originalLine === 'number') {
	            this.__originalMappings.push(mapping);
	          }
	        }
	      }
	
	      this.__generatedMappings.sort(util.compareByGeneratedPositions);
	      this.__originalMappings.sort(util.compareByOriginalPositions);
	    };
	
	  /**
	   * Find the mapping that best matches the hypothetical "needle" mapping that
	   * we are searching for in the given "haystack" of mappings.
	   */
	  BasicSourceMapConsumer.prototype._findMapping =
	    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                           aColumnName, aComparator) {
	      // To return the position we are searching for, we must first find the
	      // mapping for the given position and then return the opposite position it
	      // points to. Because the mappings are sorted, we can use binary search to
	      // find the best mapping.
	
	      if (aNeedle[aLineName] <= 0) {
	        throw new TypeError('Line must be greater than or equal to 1, got '
	                            + aNeedle[aLineName]);
	      }
	      if (aNeedle[aColumnName] < 0) {
	        throw new TypeError('Column must be greater than or equal to 0, got '
	                            + aNeedle[aColumnName]);
	      }
	
	      return binarySearch.search(aNeedle, aMappings, aComparator);
	    };
	
	  /**
	   * Compute the last column for each generated mapping. The last column is
	   * inclusive.
	   */
	  BasicSourceMapConsumer.prototype.computeColumnSpans =
	    function SourceMapConsumer_computeColumnSpans() {
	      for (var index = 0; index < this._generatedMappings.length; ++index) {
	        var mapping = this._generatedMappings[index];
	
	        // Mappings do not contain a field for the last generated columnt. We
	        // can come up with an optimistic estimate, however, by assuming that
	        // mappings are contiguous (i.e. given two consecutive mappings, the
	        // first mapping ends where the second one starts).
	        if (index + 1 < this._generatedMappings.length) {
	          var nextMapping = this._generatedMappings[index + 1];
	
	          if (mapping.generatedLine === nextMapping.generatedLine) {
	            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	            continue;
	          }
	        }
	
	        // The last mapping for each line spans the entire line.
	        mapping.lastGeneratedColumn = Infinity;
	      }
	    };
	
	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.
	   *   - column: The column number in the generated source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.
	   *   - column: The column number in the original source, or null.
	   *   - name: The original identifier, or null.
	   */
	  BasicSourceMapConsumer.prototype.originalPositionFor =
	    function SourceMapConsumer_originalPositionFor(aArgs) {
	      var needle = {
	        generatedLine: util.getArg(aArgs, 'line'),
	        generatedColumn: util.getArg(aArgs, 'column')
	      };
	
	      var index = this._findMapping(needle,
	                                    this._generatedMappings,
	                                    "generatedLine",
	                                    "generatedColumn",
	                                    util.compareByGeneratedPositions);
	
	      if (index >= 0) {
	        var mapping = this._generatedMappings[index];
	
	        if (mapping.generatedLine === needle.generatedLine) {
	          var source = util.getArg(mapping, 'source', null);
	          if (source != null && this.sourceRoot != null) {
	            source = util.join(this.sourceRoot, source);
	          }
	          return {
	            source: source,
	            line: util.getArg(mapping, 'originalLine', null),
	            column: util.getArg(mapping, 'originalColumn', null),
	            name: util.getArg(mapping, 'name', null)
	          };
	        }
	      }
	
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    };
	
	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * availible.
	   */
	  BasicSourceMapConsumer.prototype.sourceContentFor =
	    function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	      if (!this.sourcesContent) {
	        return null;
	      }
	
	      if (this.sourceRoot != null) {
	        aSource = util.relative(this.sourceRoot, aSource);
	      }
	
	      if (this._sources.has(aSource)) {
	        return this.sourcesContent[this._sources.indexOf(aSource)];
	      }
	
	      var url;
	      if (this.sourceRoot != null
	          && (url = util.urlParse(this.sourceRoot))) {
	        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	        // many users. We can help them out when they expect file:// URIs to
	        // behave like it would if they were running a local HTTP server. See
	        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
	        if (url.scheme == "file"
	            && this._sources.has(fileUriAbsPath)) {
	          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	        }
	
	        if ((!url.path || url.path == "/")
	            && this._sources.has("/" + aSource)) {
	          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
	        }
	      }
	
	      // This function is used recursively from
	      // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	      // don't want to throw if we can't find the source - we just want to
	      // return null, so we provide a flag to exit gracefully.
	      if (nullOnMissing) {
	        return null;
	      }
	      else {
	        throw new Error('"' + aSource + '" is not in the SourceMap.');
	      }
	    };
	
	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *   - column: The column number in the original source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  BasicSourceMapConsumer.prototype.generatedPositionFor =
	    function SourceMapConsumer_generatedPositionFor(aArgs) {
	      var needle = {
	        source: util.getArg(aArgs, 'source'),
	        originalLine: util.getArg(aArgs, 'line'),
	        originalColumn: util.getArg(aArgs, 'column')
	      };
	
	      if (this.sourceRoot != null) {
	        needle.source = util.relative(this.sourceRoot, needle.source);
	      }
	
	      var index = this._findMapping(needle,
	                                    this._originalMappings,
	                                    "originalLine",
	                                    "originalColumn",
	                                    util.compareByOriginalPositions);
	
	      if (index >= 0) {
	        var mapping = this._originalMappings[index];
	
	        return {
	          line: util.getArg(mapping, 'generatedLine', null),
	          column: util.getArg(mapping, 'generatedColumn', null),
	          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	        };
	      }
	
	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    };
	
	  exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/source-node.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var SourceMapGenerator = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/source-map-generator.js").SourceMapGenerator;
	  var util = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js");
	
	  // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	  // operating systems these days (capturing the result).
	  var REGEX_NEWLINE = /(\r?\n)/;
	
	  // Newline character code for charCodeAt() comparisons
	  var NEWLINE_CODE = 10;
	
	  // Private symbol for identifying `SourceNode`s when multiple versions of
	  // the source-map library are loaded. This MUST NOT CHANGE across
	  // versions!
	  var isSourceNode = "$$$isSourceNode$$$";
	
	  /**
	   * SourceNodes provide a way to abstract over interpolating/concatenating
	   * snippets of generated JavaScript source code while maintaining the line and
	   * column information associated with the original source code.
	   *
	   * @param aLine The original line number.
	   * @param aColumn The original column number.
	   * @param aSource The original source's filename.
	   * @param aChunks Optional. An array of strings which are snippets of
	   *        generated JS, or other SourceNodes.
	   * @param aName The original identifier.
	   */
	  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
	    this.children = [];
	    this.sourceContents = {};
	    this.line = aLine == null ? null : aLine;
	    this.column = aColumn == null ? null : aColumn;
	    this.source = aSource == null ? null : aSource;
	    this.name = aName == null ? null : aName;
	    this[isSourceNode] = true;
	    if (aChunks != null) this.add(aChunks);
	  }
	
	  /**
	   * Creates a SourceNode from generated code and a SourceMapConsumer.
	   *
	   * @param aGeneratedCode The generated code
	   * @param aSourceMapConsumer The SourceMap for the generated code
	   * @param aRelativePath Optional. The path that relative sources in the
	   *        SourceMapConsumer should be relative to.
	   */
	  SourceNode.fromStringWithSourceMap =
	    function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
	      // The SourceNode we want to fill with the generated code
	      // and the SourceMap
	      var node = new SourceNode();
	
	      // All even indices of this array are one line of the generated code,
	      // while all odd indices are the newlines between two adjacent lines
	      // (since `REGEX_NEWLINE` captures its match).
	      // Processed fragments are removed from this array, by calling `shiftNextLine`.
	      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
	      var shiftNextLine = function() {
	        var lineContents = remainingLines.shift();
	        // The last line of a file might not have a newline.
	        var newLine = remainingLines.shift() || "";
	        return lineContents + newLine;
	      };
	
	      // We need to remember the position of "remainingLines"
	      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
	
	      // The generate SourceNodes we need a code range.
	      // To extract it current and last mapping is used.
	      // Here we store the last mapping.
	      var lastMapping = null;
	
	      aSourceMapConsumer.eachMapping(function (mapping) {
	        if (lastMapping !== null) {
	          // We add the code from "lastMapping" to "mapping":
	          // First check if there is a new line in between.
	          if (lastGeneratedLine < mapping.generatedLine) {
	            var code = "";
	            // Associate first line with "lastMapping"
	            addMappingWithCode(lastMapping, shiftNextLine());
	            lastGeneratedLine++;
	            lastGeneratedColumn = 0;
	            // The remaining code is added without mapping
	          } else {
	            // There is no new line in between.
	            // Associate the code between "lastGeneratedColumn" and
	            // "mapping.generatedColumn" with "lastMapping"
	            var nextLine = remainingLines[0];
	            var code = nextLine.substr(0, mapping.generatedColumn -
	                                          lastGeneratedColumn);
	            remainingLines[0] = nextLine.substr(mapping.generatedColumn -
	                                                lastGeneratedColumn);
	            lastGeneratedColumn = mapping.generatedColumn;
	            addMappingWithCode(lastMapping, code);
	            // No more remaining code, continue
	            lastMapping = mapping;
	            return;
	          }
	        }
	        // We add the generated code until the first mapping
	        // to the SourceNode without any mapping.
	        // Each line is added as separate string.
	        while (lastGeneratedLine < mapping.generatedLine) {
	          node.add(shiftNextLine());
	          lastGeneratedLine++;
	        }
	        if (lastGeneratedColumn < mapping.generatedColumn) {
	          var nextLine = remainingLines[0];
	          node.add(nextLine.substr(0, mapping.generatedColumn));
	          remainingLines[0] = nextLine.substr(mapping.generatedColumn);
	          lastGeneratedColumn = mapping.generatedColumn;
	        }
	        lastMapping = mapping;
	      }, this);
	      // We have processed all mappings.
	      if (remainingLines.length > 0) {
	        if (lastMapping) {
	          // Associate the remaining code in the current line with "lastMapping"
	          addMappingWithCode(lastMapping, shiftNextLine());
	        }
	        // and add the remaining lines without any mapping
	        node.add(remainingLines.join(""));
	      }
	
	      // Copy sourcesContent into SourceNode
	      aSourceMapConsumer.sources.forEach(function (sourceFile) {
	        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
	        if (content != null) {
	          if (aRelativePath != null) {
	            sourceFile = util.join(aRelativePath, sourceFile);
	          }
	          node.setSourceContent(sourceFile, content);
	        }
	      });
	
	      return node;
	
	      function addMappingWithCode(mapping, code) {
	        if (mapping === null || mapping.source === undefined) {
	          node.add(code);
	        } else {
	          var source = aRelativePath
	            ? util.join(aRelativePath, mapping.source)
	            : mapping.source;
	          node.add(new SourceNode(mapping.originalLine,
	                                  mapping.originalColumn,
	                                  source,
	                                  code,
	                                  mapping.name));
	        }
	      }
	    };
	
	  /**
	   * Add a chunk of generated JS to this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  SourceNode.prototype.add = function SourceNode_add(aChunk) {
	    if (Array.isArray(aChunk)) {
	      aChunk.forEach(function (chunk) {
	        this.add(chunk);
	      }, this);
	    }
	    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	      if (aChunk) {
	        this.children.push(aChunk);
	      }
	    }
	    else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	      );
	    }
	    return this;
	  };
	
	  /**
	   * Add a chunk of generated JS to the beginning of this source node.
	   *
	   * @param aChunk A string snippet of generated JS code, another instance of
	   *        SourceNode, or an array where each member is one of those things.
	   */
	  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
	    if (Array.isArray(aChunk)) {
	      for (var i = aChunk.length-1; i >= 0; i--) {
	        this.prepend(aChunk[i]);
	      }
	    }
	    else if (aChunk[isSourceNode] || typeof aChunk === "string") {
	      this.children.unshift(aChunk);
	    }
	    else {
	      throw new TypeError(
	        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
	      );
	    }
	    return this;
	  };
	
	  /**
	   * Walk over the tree of JS snippets in this node and its children. The
	   * walking function is called once for each snippet of JS and is passed that
	   * snippet and the its original associated source's line/column location.
	   *
	   * @param aFn The traversal function.
	   */
	  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
	    var chunk;
	    for (var i = 0, len = this.children.length; i < len; i++) {
	      chunk = this.children[i];
	      if (chunk[isSourceNode]) {
	        chunk.walk(aFn);
	      }
	      else {
	        if (chunk !== '') {
	          aFn(chunk, { source: this.source,
	                       line: this.line,
	                       column: this.column,
	                       name: this.name });
	        }
	      }
	    }
	  };
	
	  /**
	   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	   * each of `this.children`.
	   *
	   * @param aSep The separator.
	   */
	  SourceNode.prototype.join = function SourceNode_join(aSep) {
	    var newChildren;
	    var i;
	    var len = this.children.length;
	    if (len > 0) {
	      newChildren = [];
	      for (i = 0; i < len-1; i++) {
	        newChildren.push(this.children[i]);
	        newChildren.push(aSep);
	      }
	      newChildren.push(this.children[i]);
	      this.children = newChildren;
	    }
	    return this;
	  };
	
	  /**
	   * Call String.prototype.replace on the very right-most source snippet. Useful
	   * for trimming whitespace from the end of a source node, etc.
	   *
	   * @param aPattern The pattern to replace.
	   * @param aReplacement The thing to replace the pattern with.
	   */
	  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
	    var lastChild = this.children[this.children.length - 1];
	    if (lastChild[isSourceNode]) {
	      lastChild.replaceRight(aPattern, aReplacement);
	    }
	    else if (typeof lastChild === 'string') {
	      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
	    }
	    else {
	      this.children.push(''.replace(aPattern, aReplacement));
	    }
	    return this;
	  };
	
	  /**
	   * Set the source content for a source file. This will be added to the SourceMapGenerator
	   * in the sourcesContent field.
	   *
	   * @param aSourceFile The filename of the source file
	   * @param aSourceContent The content of the source file
	   */
	  SourceNode.prototype.setSourceContent =
	    function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
	      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
	    };
	
	  /**
	   * Walk over the tree of SourceNodes. The walking function is called for each
	   * source file content and is passed the filename and source content.
	   *
	   * @param aFn The traversal function.
	   */
	  SourceNode.prototype.walkSourceContents =
	    function SourceNode_walkSourceContents(aFn) {
	      for (var i = 0, len = this.children.length; i < len; i++) {
	        if (this.children[i][isSourceNode]) {
	          this.children[i].walkSourceContents(aFn);
	        }
	      }
	
	      var sources = Object.keys(this.sourceContents);
	      for (var i = 0, len = sources.length; i < len; i++) {
	        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
	      }
	    };
	
	  /**
	   * Return the string representation of this source node. Walks over the tree
	   * and concatenates all the various snippets together to one string.
	   */
	  SourceNode.prototype.toString = function SourceNode_toString() {
	    var str = "";
	    this.walk(function (chunk) {
	      str += chunk;
	    });
	    return str;
	  };
	
	  /**
	   * Returns the string representation of this source node along with a source
	   * map.
	   */
	  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
	    var generated = {
	      code: "",
	      line: 1,
	      column: 0
	    };
	    var map = new SourceMapGenerator(aArgs);
	    var sourceMappingActive = false;
	    var lastOriginalSource = null;
	    var lastOriginalLine = null;
	    var lastOriginalColumn = null;
	    var lastOriginalName = null;
	    this.walk(function (chunk, original) {
	      generated.code += chunk;
	      if (original.source !== null
	          && original.line !== null
	          && original.column !== null) {
	        if(lastOriginalSource !== original.source
	           || lastOriginalLine !== original.line
	           || lastOriginalColumn !== original.column
	           || lastOriginalName !== original.name) {
	          map.addMapping({
	            source: original.source,
	            original: {
	              line: original.line,
	              column: original.column
	            },
	            generated: {
	              line: generated.line,
	              column: generated.column
	            },
	            name: original.name
	          });
	        }
	        lastOriginalSource = original.source;
	        lastOriginalLine = original.line;
	        lastOriginalColumn = original.column;
	        lastOriginalName = original.name;
	        sourceMappingActive = true;
	      } else if (sourceMappingActive) {
	        map.addMapping({
	          generated: {
	            line: generated.line,
	            column: generated.column
	          }
	        });
	        lastOriginalSource = null;
	        sourceMappingActive = false;
	      }
	      for (var idx = 0, length = chunk.length; idx < length; idx++) {
	        if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
	          generated.line++;
	          generated.column = 0;
	          // Mappings end at eol
	          if (idx + 1 === length) {
	            lastOriginalSource = null;
	            sourceMappingActive = false;
	          } else if (sourceMappingActive) {
	            map.addMapping({
	              source: original.source,
	              original: {
	                line: original.line,
	                column: original.column
	              },
	              generated: {
	                line: generated.line,
	                column: generated.column
	              },
	              name: original.name
	            });
	          }
	        } else {
	          generated.column++;
	        }
	      }
	    });
	    this.walkSourceContents(function (sourceFile, sourceContent) {
	      map.setSourceContent(sourceFile, sourceContent);
	    });
	
	    return { code: generated.code, map: map };
	  };
	
	  exports.SourceNode = SourceNode;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ "./node_modules/escodegen/node_modules/source-map/lib/source-map/array-set.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	if (false) {
	    var define = require('amdefine')(module, require);
	}
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, module) {
	
	  var util = __webpack_require__("./node_modules/escodegen/node_modules/source-map/lib/source-map/util.js");
	
	  /**
	   * A data structure which is a combination of an array and a set. Adding a new
	   * member is O(1), testing for membership is O(1), and finding the index of an
	   * element is O(1). Removing elements from the set is not supported. Only
	   * strings are supported for membership.
	   */
	  function ArraySet() {
	    this._array = [];
	    this._set = {};
	  }
	
	  /**
	   * Static method for creating ArraySet instances from an existing array.
	   */
	  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	    var set = new ArraySet();
	    for (var i = 0, len = aArray.length; i < len; i++) {
	      set.add(aArray[i], aAllowDuplicates);
	    }
	    return set;
	  };
	
	  /**
	   * Add the given string to this set.
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	    var isDuplicate = this.has(aStr);
	    var idx = this._array.length;
	    if (!isDuplicate || aAllowDuplicates) {
	      this._array.push(aStr);
	    }
	    if (!isDuplicate) {
	      this._set[util.toSetString(aStr)] = idx;
	    }
	  };
	
	  /**
	   * Is the given string a member of this set?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.has = function ArraySet_has(aStr) {
	    return Object.prototype.hasOwnProperty.call(this._set,
	                                                util.toSetString(aStr));
	  };
	
	  /**
	   * What is the index of the given string in the array?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	    if (this.has(aStr)) {
	      return this._set[util.toSetString(aStr)];
	    }
	    throw new Error('"' + aStr + '" is not in the set.');
	  };
	
	  /**
	   * What is the element at the given index?
	   *
	   * @param Number aIdx
	   */
	  ArraySet.prototype.at = function ArraySet_at(aIdx) {
	    if (aIdx >= 0 && aIdx < this._array.length) {
	      return this._array[aIdx];
	    }
	    throw new Error('No element indexed by ' + aIdx);
	  };
	
	  /**
	   * Returns the array representation of this set (which has the proper indices
	   * indicated by indexOf). Note that this is a copy of the internal array used
	   * for storing the members so that no one can mess with internal state.
	   */
	  ArraySet.prototype.toArray = function ArraySet_toArray() {
	    return this._array.slice();
	  };
	
	  exports.ArraySet = ArraySet;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }

});