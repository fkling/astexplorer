import defaultParserInterface from '../utils/defaultParserInterface'
const errorHandler = require("../utils/errorHandler")
const builder = require("../utils/buildAst")
const ID = 'amf-jsonschema-parser'

export default {
    ...defaultParserInterface,

    id: ID,
    displayName: 'amf-parser',
    version: '5.1.0',
    homepage: 'https://www.npmjs.com/package/amf-client-js',

    loadParser(callback) {
        require(['amf-client-js', '@aml-org/generic-js-model-adapter'], (parser, adapter) => {
            callback({ parser, adapter });
        });
    },

    async parse({ parser, adapter }, code) {
        let provider = errorHandler.getProvider(parser)
        let client = parser.JsonSchemaConfiguration.JsonSchema().withErrorHandlerProvider(provider).baseUnitClient()
        let parsingResult = await client.parseContent(code)
        return builder.buildAst(parsingResult,adapter,code)
    },

    getNodeName(node) {
        return node.nodeName
    },

    nodeToRange(node) {
        if (node.hasOwnProperty('position')) {
            return [node.position.start.offset,node.position.end.offset]
        }
    },
}
