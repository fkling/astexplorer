import defaultParserInterface from '../utils/defaultParserInterface'
const ID = 'amf-raml-parser'

export default {
    ...defaultParserInterface,

    id: ID,
    displayName: 'amf-parser',
    version: '5.0.0-beta.2',
    homepage: 'https://www.npmjs.com/package/amf-client-js',

    loadParser(callback) {
        require(['amf-client-js', 'generic-js-model-adapter'], (parser, adapter) => {
            callback({ parser, adapter });
        });
    },

    async parse({ parser, adapter }, code) {
        let client = parser.RAMLConfiguration.RAML().baseUnitClient()
        let model = (await client.parseContent(code)).baseUnit
        let transformers = adapter.TransformerSet.createTransformerSet()
        transformers.addPositionTransformer(code)
        transformers.addNameTransformer()
        let builder = adapter.AstBuilder.createBuilder(model,false,transformers)
        return builder.buildObject()
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