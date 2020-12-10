import defaultParserInterface from './defaultParserInterface';


const ID = 'antlr-parser';


export default {
    ...defaultParserInterface,

    id : ID,
    displayName : ID,
    version : 1.0,
    homepage : "",

    locationProps : new Set(['startIndex','endIndex','startLineNumber','startColNumber','endLineNumber','endColNumber']),
    typeProps : new Set(['ruleName']),
    _ignoredProperties : new Set([]),

    loadParser(callback) {
        require(['axios'], callback);
    },

    async parse(axios, code) {
        const response = await axios.post("/parse", this.getRequestBody(code))
        try{
            return response.data["responses"][0]["astRoot"];
        }catch (e) {
            console.error(e);
            return response;
        }
    },

    getRequestBody(code) {
        return {
            "codeFiles": [
                {
                    "code":code,
                    "language": this.language
                }
            ]
        }
    },


    getDefaultOptions() {
        return {};
    },

    getNodeName({ruleName}) {
        return ruleName;
    },

    nodeToRange(node) {
        return [node.startIndex, node.endIndex + 1];
    }
};
