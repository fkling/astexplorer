/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : jeefo.js
* Created at  : 2022-05-11
* Updated at  : 2022-05-12
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

import pkg                    from "@jeefo/ecma_parser/package.json";
import defaultParserInterface from "../utils/defaultParserInterface";

export default {
  ...defaultParserInterface,

  id: "jeefo",
  displayName: pkg.name,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(["start", "end"]),
  typeProps: new Set(["_id", "_type", "_precedence"]),

  loadParser(callback) {
    require(["@jeefo/ecma_parser/dist/jeefo_parser"], async jeefo => {
      const parser = await jeefo.require("./es8/parser");
      callback(parser);
    });
  },

  parse(parser, code) {
    return parser.parse(code);
  },

  getNodeName(node) {
    return node.id;
  },

  nodeToRange(node) {
    if (node.start) {
      return [node.start.index, node.end.index + 1];
    }
  },
};