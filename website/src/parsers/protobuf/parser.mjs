const eof = Symbol("<EOF>");
function createRecursiveDescentParser(input, config) {
    const debug = !!config?.debug;
    let cnt = 0;
    const lines = input.split("\n");
    const parser = {
        input,
        loc: 0,
        offsetToColRow: (offset)=>offsetToColRow(lines, offset)
        ,
        getAroundText: (loc, length, window)=>getAroundText(lines, loc, length, window)
        ,
        try (pattern) {
            const loc = parser.loc;
            try {
                return parser.accept(pattern);
            } finally{
                parser.loc = loc;
            }
        },
        accept (pattern) {
            cnt++;
            if (cnt > input.length * 5) throw `infinite loop`;
            if (pattern === eof) return acceptEof();
            if (typeof pattern === "string") return acceptString(pattern);
            return acceptRegex(pattern);
        },
        expect (acceptPattern, expectedPatterns, mistakePatterns) {
            const result = parser.accept(acceptPattern);
            const _expectedPatterns = expectedPatterns ? [
                acceptPattern,
                ...expectedPatterns
            ] : [
                acceptPattern
            ];
            if (result == null) {
                throw new SyntaxError1(parser, _expectedPatterns, mistakePatterns);
            } else {
                return result;
            }
        }
    };
    function acceptEof() {
        if (parser.loc < input.length) return;
        return {
            start: parser.loc,
            end: parser.loc,
            text: ""
        };
    }
    function acceptString(pattern) {
        const start = parser.loc;
        const end = start + pattern.length;
        const text = input.slice(start, end);
        if (text !== pattern) return;
        parser.loc = end;
        debug && console.log(text);
        return {
            start,
            end,
            text
        };
    }
    function acceptRegex(pattern) {
        pattern.lastIndex = 0;
        const execArray = pattern.exec(input.substr(parser.loc));
        if (execArray == null) return;
        const text = execArray[0];
        const start = parser.loc + execArray.index;
        const end = start + text.length;
        parser.loc = end;
        debug && console.log(text);
        return {
            start,
            end,
            text
        };
    }
    return parser;
}
class SyntaxError1 extends Error {
    parser;
    expectedPatterns;
    mistakePatterns;
    constructor(parser, expectedPatterns, mistakePatterns = []){
        super();
        this.parser = parser;
        this.expectedPatterns = expectedPatterns;
        this.mistakePatterns = mistakePatterns;
        const colRow = this.colRow;
        const got = this.got;
        const length = got === eof ? 1 : got.length;
        const expectedPatternsText = expectedPatterns.map(patternToString).join(" or ");
        this.message = `at line ${colRow.row + 1}, column ${colRow.col + 1}:\n\n` + `expected ${expectedPatternsText}, got ${patternToString(got)}\n\n` + parser.getAroundText(parser.loc, length);
    }
    get got() {
        const parser1 = this.parser;
        for (const mistakePattern of this.mistakePatterns){
            const token = parser1.try(mistakePattern);
            if (token) return token.text;
        }
        return parser1.input.charAt(parser1.loc) || eof;
    }
    get colRow() {
        return this.parser.offsetToColRow(this.parser.loc);
    }
}
function patternToString(pattern) {
    if (pattern === eof) return "<EOF>";
    if (typeof pattern === "string") return JSON.stringify(pattern);
    return pattern.toString();
}
function offsetToColRow(lines, offset) {
    let col = offset;
    let row = 0;
    for (const line of lines){
        const len = line.length + 1;
        if (len < col) {
            col -= len;
            row++;
            continue;
        }
        return {
            col,
            row
        };
    }
    return {
        col: 0,
        row
    };
}
function getAroundText(lines, loc, length1 = 1, window = 5) {
    const colRow1 = offsetToColRow(lines, loc);
    const headCount = Math.min(1, (window >> 1) + window % 2);
    const tailCount = window >> 1;
    const headStart = Math.max(0, colRow1.row - headCount - 1);
    const headEnd = colRow1.row + 1;
    const tailStart = colRow1.row + 1;
    const tailEnd = colRow1.row + tailCount + 1;
    const heads = lines.slice(headStart, headEnd);
    const tails = lines.slice(tailStart, tailEnd);
    const lineNumberDigitCount = tailEnd.toString().length;
    const headTexts = heads.map((line, index)=>{
        const lineNumber = index + headStart + 1;
        const lineNumberText = lineNumber.toString().padStart(lineNumberDigitCount + 1);
        return lineNumberText + " | " + line;
    }).join("\n");
    const tailTexts = tails.map((line, index)=>{
        const lineNumber = index + tailStart + 1;
        const lineNumberText = lineNumber.toString().padStart(lineNumberDigitCount + 1);
        return lineNumberText + " | " + line;
    }).join("\n");
    return [
        headTexts,
        new Array(lineNumberDigitCount + 1 + 1).join(" ") + " | " + new Array(colRow1.col + 1).join(" ") + new Array(length1 + 1).join("^"),
        tailTexts, 
    ].join("\n");
}
function parse1(text) {
    const parser1 = createRecursiveDescentParser(text);
    const statements = acceptStatements(parser1, [
        acceptSyntax,
        acceptImport,
        acceptPackage,
        acceptOption,
        acceptMessage,
        acceptEnum,
        acceptExtend,
        acceptService,
        acceptEmpty, 
    ]);
    const ast = {
        statements
    };
    return {
        ast,
        parser: parser1
    };
}
function parseConstant1(text) {
    const parser1 = createRecursiveDescentParser(text);
    const constant = expectConstant(parser1);
    return {
        ast: constant,
        parser: parser1
    };
}
function acceptPatternAndThen(pattern, then) {
    return function accept(parser1) {
        const token = parser1.accept(pattern);
        if (!token) return;
        return then(token);
    };
}
function choice(acceptFns) {
    return function accept(parser1) {
        for (const acceptFn of acceptFns){
            const node = acceptFn(parser1);
            if (node) return node;
        }
    };
}
function many(parser1, acceptFn) {
    const nodes = [];
    let node;
    while(node = acceptFn(parser1))nodes.push(node);
    return nodes;
}
function acceptStatements(parser1, acceptStatementFns) {
    const statements = [];
    statements: while(true){
        const leadingComments = skipWsAndSweepComments(parser1);
        for (const acceptStatementFn of acceptStatementFns){
            const statement = acceptStatementFn(parser1, leadingComments);
            if (statement) {
                statements.push(statement);
                continue statements;
            }
        }
        break;
    }
    return statements;
}
const whitespacePattern = /^\s+/;
const multilineCommentPattern = /^\/\*(?:.|\r?\n)*?\*\//;
const singlelineCommentPattern = /^\/\/.*(?:\r?\n|$)/;
const intLitPattern = /^0(?:[0-7]*|x[0-9a-f]+)|^[1-9]\d*/i;
const floatLitPattern = /^\d+\.\d*(?:e[-+]?\d+)?|^\de[-+]?\d+|^\.\d+(?:e[-+]?\d+)?|^inf|^nan/i;
const boolLitPattern = /^true|^false/;
const strLitPattern = /^'(?:\\x[0-9a-f]{2}|\\[0-7]{3}|\\[abfnrtv\\'"]|[^'\0\n\\])*'|^"(?:\\x[0-9a-f]{2}|\\[0-7]{3}|\\[abfnrtv\\'"]|[^"\0\n\\])*"/i;
const identPattern = /^[a-z][a-z0-9_]*/i;
const acceptDot = acceptPatternAndThen(".", (dot)=>({
        type: "dot",
        ...dot
    })
);
const acceptComma = acceptPatternAndThen(",", (comma)=>({
        type: "comma",
        ...comma
    })
);
const acceptSemi = acceptPatternAndThen(";", (semi)=>({
        type: "semi",
        ...semi
    })
);
function expectSemi(parser1) {
    const semi = acceptSemi(parser1);
    if (semi) return semi;
    throw new SyntaxError1(parser1, [
        ";"
    ]);
}
const acceptIdent = acceptPatternAndThen(identPattern, (ident)=>({
        type: "ident",
        ...ident
    })
);
function acceptSpecialToken(parser1, type, pattern = identPattern) {
    const token = parser1.accept(pattern);
    if (!token) return;
    return {
        type,
        ...token
    };
}
function acceptKeyword(parser1, pattern = identPattern) {
    return acceptSpecialToken(parser1, "keyword", pattern);
}
function skipWsAndSweepComments(parser1) {
    const result = [];
    while(true){
        const whitespace = parser1.accept(whitespacePattern);
        if (whitespace) continue;
        const multilineComment = acceptSpecialToken(parser1, "multiline-comment", multilineCommentPattern);
        if (multilineComment) {
            result.push(multilineComment);
            continue;
        }
        const singlelineComment = acceptSpecialToken(parser1, "singleline-comment", singlelineCommentPattern);
        if (singlelineComment) {
            result.push(singlelineComment);
            continue;
        }
        break;
    }
    return result;
}
function skipWsAndComments(parser1) {
    skipWsAndSweepComments(parser1);
    return;
}
function acceptFullIdent(parser1) {
    const identOrDots = many(parser1, choice([
        acceptDot,
        acceptIdent, 
    ]));
    if (identOrDots.length < 1) return;
    const first = identOrDots[0];
    const last = identOrDots[identOrDots.length - 1];
    return {
        start: first.start,
        end: last.end,
        type: "full-ident",
        identOrDots
    };
}
function expectFullIdent(parser1) {
    const fullIdent = acceptFullIdent(parser1);
    if (fullIdent) return fullIdent;
    throw new SyntaxError1(parser1, [
        ".",
        identPattern
    ]);
}
function acceptType(parser1) {
    const identOrDots = many(parser1, choice([
        acceptDot,
        acceptIdent, 
    ]));
    if (identOrDots.length < 1) return;
    const first = identOrDots[0];
    const last = identOrDots[identOrDots.length - 1];
    return {
        start: first.start,
        end: last.end,
        type: "type",
        identOrDots
    };
}
function expectType(parser1) {
    const type = acceptType(parser1);
    if (type) return type;
    throw new SyntaxError1(parser1, [
        ".",
        identPattern
    ]);
}
function acceptIntLit(parser1) {
    const intLit = parser1.accept(intLitPattern);
    if (!intLit) return;
    return {
        type: "int-lit",
        ...intLit
    };
}
function acceptSignedIntLit(parser1) {
    const loc = parser1.loc;
    const sign = parser1.accept("-") ?? parser1.accept("+");
    const intLit = acceptIntLit(parser1);
    if (!intLit) {
        parser1.loc = loc;
        return;
    }
    const start = sign?.start ?? intLit.start;
    const end = intLit.end;
    return {
        start,
        end,
        type: "signed-int-lit",
        sign,
        value: intLit
    };
}
function expectSignedIntLit(parser1) {
    const signedIntLit = acceptSignedIntLit(parser1);
    if (signedIntLit) return signedIntLit;
    throw new SyntaxError1(parser1, [
        "-",
        intLitPattern
    ]);
}
function acceptFloatLit(parser1) {
    const floatLit = parser1.accept(floatLitPattern);
    if (!floatLit) return;
    return {
        type: "float-lit",
        ...floatLit
    };
}
function acceptSignedFloatLit(parser1) {
    const loc = parser1.loc;
    const sign = parser1.accept("-") ?? parser1.accept("+");
    const floatLit = acceptFloatLit(parser1);
    if (!floatLit) {
        parser1.loc = loc;
        return;
    }
    const start = sign?.start ?? floatLit.start;
    const end = floatLit.end;
    return {
        start,
        end,
        type: "signed-float-lit",
        sign,
        value: floatLit
    };
}
function acceptBoolLit(parser1) {
    const boolLit = parser1.accept(boolLitPattern);
    if (!boolLit) return;
    return {
        type: "bool-lit",
        ...boolLit
    };
}
function acceptStrLit(parser1) {
    const strLit = parser1.accept(strLitPattern);
    if (!strLit) return;
    return {
        type: "str-lit",
        ...strLit
    };
}
function expectStrLit(parser1) {
    const strLit = acceptStrLit(parser1);
    if (strLit) return strLit;
    throw new SyntaxError1(parser1, [
        strLitPattern
    ]);
}
function acceptAggregate(parser1) {
    const parenthesisOpen = parser1.accept("{");
    if (!parenthesisOpen) return;
    let character = parenthesisOpen;
    let depth = 1;
    while(character = parser1.expect(/^./)){
        switch(character.text){
            case "{":
                ++depth;
                break;
            case "}":
                --depth;
                break;
        }
        if (depth === 0) {
            break;
        }
    }
    const start = parenthesisOpen.start;
    const end = character.end;
    return {
        type: "aggregate",
        start,
        end
    };
}
function acceptConstant(parser1) {
    return ((((acceptSignedIntLit(parser1) ?? acceptSignedFloatLit(parser1)) ?? acceptStrLit(parser1)) ?? acceptBoolLit(parser1)) ?? acceptFullIdent(parser1)) ?? acceptAggregate(parser1);
}
function expectConstant(parser1) {
    const constant = acceptConstant(parser1);
    if (constant) return constant;
    throw new SyntaxError1(parser1, [
        identPattern,
        "-",
        "+",
        intLitPattern,
        strLitPattern,
        boolLitPattern, 
    ]);
}
function acceptOptionNameSegment(parser1) {
    const bracketOpen = parser1.accept("(");
    const name = acceptFullIdent(parser1);
    if (!name) {
        if (bracketOpen) throw new SyntaxError1(parser1, [
            identPattern
        ]);
        return;
    }
    const bracketClose = parser1[bracketOpen ? "expect" : "accept"](")");
    const start = bracketOpen?.start ?? name.start;
    const end = bracketClose?.end ?? name.end;
    return {
        start,
        end,
        type: "option-name-segment",
        bracketOpen,
        name,
        bracketClose
    };
}
function acceptOptionName(parser1) {
    const optionNameSegmentOrDots = many(parser1, choice([
        acceptDot,
        acceptOptionNameSegment, 
    ]));
    if (optionNameSegmentOrDots.length < 1) return;
    const first = optionNameSegmentOrDots[0];
    const last = optionNameSegmentOrDots[optionNameSegmentOrDots.length - 1];
    return {
        start: first.start,
        end: last.end,
        type: "option-name",
        optionNameSegmentOrDots
    };
}
function expectOptionName(parser1) {
    const optionName = acceptOptionName(parser1);
    if (optionName) return optionName;
    throw new SyntaxError1(parser1, [
        "(",
        identPattern
    ]);
}
function acceptSyntax(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "syntax");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const quoteOpen = parser1.expect(/^['"]/);
    const syntax = parser1.expect(/^[^'"]+/);
    const quoteClose = parser1.expect(/^['"]/);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: keyword.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "syntax",
        keyword,
        eq,
        quoteOpen,
        syntax,
        quoteClose,
        semi
    };
}
function acceptImport(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "import");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const weakOrPublic = parser1.accept(/^weak|^public/);
    skipWsAndComments(parser1);
    const strLit = expectStrLit(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: keyword.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "import",
        keyword,
        weakOrPublic,
        strLit,
        semi
    };
}
function acceptPackage(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "package");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const fullIdent = expectFullIdent(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: keyword.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "package",
        keyword,
        fullIdent,
        semi
    };
}
function acceptOption(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "option");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const optionName = expectOptionName(parser1);
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const constant = expectConstant(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: keyword.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "option",
        keyword,
        optionName,
        eq,
        constant,
        semi
    };
}
function acceptEmpty(parser1, leadingComments) {
    const semi = acceptSemi(parser1);
    if (!semi) return;
    return {
        start: semi.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "empty",
        semi
    };
}
function acceptFieldOption(parser1) {
    const optionName = acceptOptionName(parser1);
    if (!optionName) return;
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const constant = expectConstant(parser1);
    return {
        start: optionName.start,
        end: constant.end,
        type: "field-option",
        optionName,
        eq,
        constant
    };
}
function acceptFieldOptions(parser1) {
    const bracketOpen = parser1.accept("[");
    if (!bracketOpen) return;
    const fieldOptionOrCommas = many(parser1, choice([
        skipWsAndComments,
        acceptComma,
        acceptFieldOption, 
    ]));
    const bracketClose = parser1.expect("]");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        type: "field-options",
        bracketOpen,
        fieldOptionOrCommas,
        bracketClose
    };
}
function acceptEnumField(parser1, leadingComments) {
    const fieldName = parser1.accept(identPattern);
    if (!fieldName) return;
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const fieldNumber = expectSignedIntLit(parser1);
    skipWsAndComments(parser1);
    const fieldOptions = acceptFieldOptions(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: fieldName.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "enum-field",
        fieldName,
        eq,
        fieldNumber,
        fieldOptions,
        semi
    };
}
function expectEnumBody(parser1) {
    const bracketOpen = parser1.expect("{");
    const statements = acceptStatements(parser1, [
        acceptOption,
        acceptEnumField,
        acceptEmpty, 
    ]);
    const bracketClose = parser1.expect("}");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        type: "enum-body",
        bracketOpen,
        statements,
        bracketClose
    };
}
function acceptEnum(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "enum");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const enumName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const enumBody = expectEnumBody(parser1);
    return {
        start: keyword.start,
        end: enumBody.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "enum",
        keyword,
        enumName,
        enumBody
    };
}
function acceptField(parser1, leadingComments) {
    const loc = parser1.loc;
    const fieldLabel = acceptKeyword(parser1, /^required|^optional|^repeated/);
    skipWsAndComments(parser1);
    const fieldType = acceptType(parser1);
    if (!fieldType) {
        parser1.loc = loc;
        return;
    }
    skipWsAndComments(parser1);
    const fieldName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const fieldNumber = parser1.expect(intLitPattern);
    skipWsAndComments(parser1);
    const fieldOptions = acceptFieldOptions(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: (fieldLabel ?? fieldType).start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "field",
        fieldLabel,
        fieldType,
        fieldName,
        eq,
        fieldNumber,
        fieldOptions,
        semi
    };
}
function acceptOneofField(parser1, leadingComments) {
    const fieldType = acceptType(parser1);
    if (!fieldType) return;
    skipWsAndComments(parser1);
    const fieldName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const fieldNumber = parser1.expect(intLitPattern);
    skipWsAndComments(parser1);
    const fieldOptions = acceptFieldOptions(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: fieldType.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "oneof-field",
        fieldType,
        fieldName,
        eq,
        fieldNumber,
        fieldOptions,
        semi
    };
}
function acceptMapField(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "map");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const typeBracketOpen = parser1.expect("<");
    skipWsAndComments(parser1);
    const keyType = expectType(parser1);
    skipWsAndComments(parser1);
    const typeSep = parser1.expect(",");
    skipWsAndComments(parser1);
    const valueType = expectType(parser1);
    skipWsAndComments(parser1);
    const typeBracketClose = parser1.expect(">");
    skipWsAndComments(parser1);
    const mapName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const fieldNumber = parser1.expect(intLitPattern);
    skipWsAndComments(parser1);
    const fieldOptions = acceptFieldOptions(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: keyword.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "map-field",
        keyword,
        typeBracketOpen,
        keyType,
        typeSep,
        valueType,
        typeBracketClose,
        mapName,
        eq,
        fieldNumber,
        fieldOptions,
        semi
    };
}
function expectOneofBody(parser1) {
    const bracketOpen = parser1.expect("{");
    const statements = acceptStatements(parser1, [
        acceptOption,
        acceptOneofField,
        acceptEmpty, 
    ]);
    const bracketClose = parser1.expect("}");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        type: "oneof-body",
        bracketOpen,
        statements,
        bracketClose
    };
}
function acceptOneof(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "oneof");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const oneofName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const oneofBody = expectOneofBody(parser1);
    return {
        start: keyword.start,
        end: oneofBody.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "oneof",
        keyword,
        oneofName,
        oneofBody
    };
}
const acceptMax = acceptPatternAndThen("max", (max)=>({
        type: "max",
        ...max
    })
);
function acceptRange(parser1) {
    const rangeStart = acceptIntLit(parser1);
    if (!rangeStart) return;
    skipWsAndComments(parser1);
    const to = acceptKeyword(parser1, "to");
    if (!to) {
        return {
            start: rangeStart.start,
            end: rangeStart.end,
            type: "range",
            rangeStart
        };
    }
    skipWsAndComments(parser1);
    const rangeEnd = acceptIntLit(parser1) ?? acceptMax(parser1);
    if (!rangeEnd) throw new SyntaxError1(parser1, [
        intLitPattern,
        "max"
    ]);
    return {
        start: rangeStart.start,
        end: rangeEnd.end,
        type: "range",
        rangeStart,
        to,
        rangeEnd
    };
}
function expectRanges(parser1) {
    const rangeOrCommas = many(parser1, choice([
        acceptComma,
        acceptRange, 
    ]));
    const first = rangeOrCommas[0];
    const last = rangeOrCommas[rangeOrCommas.length - 1];
    return {
        start: first.start,
        end: last.end,
        type: "ranges",
        rangeOrCommas
    };
}
function acceptExtensions(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "extensions");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const ranges = expectRanges(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: keyword.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "extensions",
        keyword,
        ranges,
        semi
    };
}
function expectFieldNames(parser1) {
    const strLitOrCommas = many(parser1, choice([
        acceptComma,
        acceptStrLit, 
    ]));
    const first = strLitOrCommas[0];
    const last = strLitOrCommas[strLitOrCommas.length - 1];
    return {
        start: first.start,
        end: last.end,
        type: "field-names",
        strLitOrCommas
    };
}
function acceptReserved(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "reserved");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const reserved = parser1.try(intLitPattern) ? expectRanges(parser1) : expectFieldNames(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: keyword.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "reserved",
        keyword,
        reserved,
        semi
    };
}
function expectExtendBody(parser1) {
    const bracketOpen = parser1.expect("{");
    const statements = acceptStatements(parser1, [
        acceptGroup,
        acceptField,
        acceptEmpty, 
    ]);
    const bracketClose = parser1.expect("}");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        type: "extend-body",
        bracketOpen,
        statements,
        bracketClose
    };
}
function acceptExtend(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "extend");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const messageType = expectType(parser1);
    skipWsAndComments(parser1);
    const extendBody = expectExtendBody(parser1);
    return {
        start: keyword.start,
        end: extendBody.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "extend",
        keyword,
        messageType,
        extendBody
    };
}
function acceptGroup(parser1, leadingComments) {
    const loc = parser1.loc;
    const groupLabel = acceptKeyword(parser1, /^required|^optional|^repeated/);
    if (!groupLabel) {
        parser1.loc = loc;
        return;
    }
    const keyword = acceptKeyword(parser1, "group");
    if (!keyword) {
        parser1.loc = loc;
        return;
    }
    skipWsAndComments(parser1);
    const groupName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const eq = parser1.expect("=");
    skipWsAndComments(parser1);
    const fieldNumber = parser1.expect(intLitPattern);
    skipWsAndComments(parser1);
    const messageBody = expectMessageBody(parser1);
    skipWsAndComments(parser1);
    const semi = expectSemi(parser1);
    return {
        start: groupLabel.start,
        end: semi.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "group",
        groupLabel,
        keyword,
        groupName,
        eq,
        fieldNumber,
        messageBody
    };
}
function expectMessageBody(parser1) {
    const bracketOpen = parser1.expect("{");
    const statements = acceptStatements(parser1, [
        acceptGroup,
        acceptEnum,
        acceptMessage,
        acceptExtend,
        acceptExtensions,
        acceptOption,
        acceptOneof,
        acceptMapField,
        acceptReserved,
        acceptField,
        acceptEmpty, 
    ]);
    const bracketClose = parser1.expect("}");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        type: "message-body",
        bracketOpen,
        statements,
        bracketClose
    };
}
function acceptMessage(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "message");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const messageName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const messageBody = expectMessageBody(parser1);
    return {
        start: keyword.start,
        end: messageBody.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "message",
        keyword,
        messageName,
        messageBody
    };
}
function expectRpcType(parser1) {
    const bracketOpen = parser1.expect("(");
    skipWsAndComments(parser1);
    const stream = acceptKeyword(parser1, "stream");
    skipWsAndComments(parser1);
    const messageType = expectType(parser1);
    skipWsAndComments(parser1);
    const bracketClose = parser1.expect(")");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        bracketOpen,
        stream,
        messageType,
        bracketClose
    };
}
function acceptRpc(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "rpc");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const rpcName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const reqType = expectRpcType(parser1);
    skipWsAndComments(parser1);
    const returns = parser1.expect("returns");
    skipWsAndComments(parser1);
    const resType = expectRpcType(parser1);
    skipWsAndComments(parser1);
    const semiOrRpcBody = acceptSemi(parser1) ?? expectRpcBody(parser1);
    return {
        start: keyword.start,
        end: semiOrRpcBody.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "rpc",
        keyword,
        rpcName,
        reqType,
        returns,
        resType,
        semiOrRpcBody
    };
}
function expectRpcBody(parser1) {
    const bracketOpen = parser1.expect("{");
    const statements = acceptStatements(parser1, [
        acceptOption,
        acceptEmpty, 
    ]);
    const bracketClose = parser1.expect("}");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        type: "rpc-body",
        bracketOpen,
        statements,
        bracketClose
    };
}
function expectServiceBody(parser1) {
    const bracketOpen = parser1.expect("{");
    const statements = acceptStatements(parser1, [
        acceptOption,
        acceptRpc,
        acceptEmpty, 
    ]);
    const bracketClose = parser1.expect("}");
    return {
        start: bracketOpen.start,
        end: bracketClose.end,
        type: "service-body",
        bracketOpen,
        statements,
        bracketClose
    };
}
function acceptService(parser1, leadingComments) {
    const keyword = acceptKeyword(parser1, "service");
    if (!keyword) return;
    skipWsAndComments(parser1);
    const serviceName = parser1.expect(identPattern);
    skipWsAndComments(parser1);
    const serviceBody = expectServiceBody(parser1);
    return {
        start: keyword.start,
        end: serviceBody.end,
        leadingComments,
        trailingComments: [],
        leadingDetachedComments: [],
        type: "service",
        keyword,
        serviceName,
        serviceBody
    };
}
export { parse1 as parse };
export { parseConstant1 as parseConstant };
