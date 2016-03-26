'use strict';

const astTypes = require('ast-types');
const fs = require('fs');
const path = require('path');
const t = require('ast-types/lib/types');

const types = {};
const builders = {};
const typeCheckers = {};

function sanitizeTypeName(typeName, fieldName, type) {
  if (type === 'boolean') {
    return 'bool';
  }

  switch(fieldName) {
    case 'operator':
    case 'kind':
      return 'string';
    case 'value':
      if (typeName === 'TemplateElement') {
        return 'TemplateElementValue';
      }
    default:
      if (/number [><=]+ \d+/.test(type)) {
        return 'number';
      }
      return type;
  }
}

function typeNameToString(name) {
  return typeof name === 'function' ? name().replace(/\s+/g, '') : name;
}

for (const typeName in astTypes.namedTypes) {
  const typeDef = astTypes.Type.def(typeName);
  const definition = {
    '!proto': 'ASTNode',
  };
  const builder = {};

  // Type check function
  typeCheckers[typeName] = 'TypeDefinition';

  // Type definition
  typeDef.fieldNames.forEach(fieldName => {
    definition[fieldName] = sanitizeTypeName(
      typeNameToString(typeName, fieldName, typeDef.allFields[fieldName].type.name)
    );
  });

  // Builder
  if (t.getBuilderName(typeName) in astTypes.builders) {
    let additionalDocs = '';

    const args = typeDef.buildParams.map(name => {
      let type = typeNameToString(typeDef.allFields[name].type.name);
      switch(name) {
        case 'operator':
        case 'kind':
          additionalDocs += `${name} (string) one of: ${type}\n`;
          type = 'string';
          break;
        case 'value':
          if (typeName === 'TemplateElement') {
            additionalDocs += `${name} (object) has form {cooked: string, raw: string}`;
            type = 'TemplateElementValue';
          }
        default:
          let match;
          if ((match = type.match(/number ([><=]+ \d+)/))) {
            additionalDocs += '${name} (number) must be ' + match[1];
            type = 'number';
            break;
          }
      }
      return `${name}: ${type}`;
    });
    builders[t.getBuilderName(typeName)] = Object.assign(builder, {
      '!type': `fn(${args.join(', ')}) -> ${typeName}`,
      '!doc': `Builds an AST node of type '${typeName}'.`,
    });
    if (typeDef.supertypeList.length > 1) {
      builder['!doc'] += '\nSuper types: ' + typeDef.supertypeList.slice(1).join(', ');
    }
    if (additionalDocs) {
      builder['!doc'] += '\n\n ' + additionalDocs;
    }
  }

  types[typeName] = definition;
}

const extraTypes = {
  TemplateElementValue: {
    cooked: 'string',
    raw: 'string',
  },
  TypeDefinition: {
    name: 'string',
    check: 'fn(node: Node, deep: ?) -> bool',
  },
};

var ternDefinition = require('js-yaml').safeLoad(
  fs.readFileSync(path.join(__dirname, './defs/jscodeshift.yaml'), 'utf-8')
);
Object.assign(ternDefinition['!define'], types, extraTypes);
Object.assign(
  ternDefinition['!define'].apiObject.jscodeshift,
  typeCheckers,
  builders
);

const target = path.resolve(__dirname, '../src/defs/jscodeshift.json');
fs.writeFileSync(
  target,
  JSON.stringify(ternDefinition, null, 2)
);
process.stdout.write(`Written to "${path.relative(process.cwd(), target)}"...`);
