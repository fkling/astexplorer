import defaultParserInterface from './utils/defaultJqlAstParserInterface';
import pkg from '@atlassianlabs/jql-ast/package.json';

export default {
    ...defaultParserInterface(pkg),
    loadParser(callback) {
        require(['@atlassianlabs/jql-ast'], callback);
    },
}
