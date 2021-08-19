function buildAst(parsingResult, adapter, code) {
    let model = parsingResult.baseUnit
    let transformers = adapter.TransformerSet.createTransformerSet()
    transformers.addPositionTransformer(code)
    transformers.addNameTransformer()
    let builder = adapter.AstBuilder.createBuilder(model, false, transformers)
    return builder.buildObject()
}

module.exports = {buildAst}