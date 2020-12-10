
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "js",
  id: "antlr-parser-js",
  displayName: "antlr-parser-js"
}