const errorHandling = require("./errorHandling")

function buildAst(parsingResult, adapter, code) {
    let model = parsingResult.baseUnit
    let transformers = adapter.TransformerSet.createTransformerSet()
    transformers.addPositionTransformer(code)
    transformers.addNameTransformer()
    let builder = adapter.AstBuilder.createBuilder(model, false, transformers)
    return builder.buildObject()
}

function throwFirstViolation(parsingResult) {
    let errors = parsingResult.results
    throw new SyntaxError(errorHandling.firstViolationMessage(errors))
}

function getAdaptedParsingResult(parsingResult, code, adapter){
    if(parsingResult.conforms){
        return buildAst(parsingResult, adapter, code);
    }else{
        throwFirstViolation(parsingResult);
    }
}

module.exports = {getAdaptedParsingResult}