
import AntlrParser from '../utils/AntlrParser'


export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...AntlrParser,
  language: "rb",
  id: "antlr-parser-ruby",
  displayName: "antlr-parser-ruby"
}