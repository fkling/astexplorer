
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "ts",
  id: "antlr-parser-ts",
  displayName: "antlr-parser-ts"
}