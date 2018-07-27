'use strict';

const astTypes = require('ast-types');
const fs = require('fs');
const path = require('path');
const t = require('ast-types/lib/types')();

const types = {};
const builders = {};
const typeCheckers = {};

function sanitizeTypeName(typeName, fieldName, type) {
  switch (fieldName) {
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

function sanitizeParamName(name) {
  const reservedWords = ['extends', 'default', 'static'];
  return reservedWords.includes(name) ? name + '_' : name;
}

function createStringUnionType(type) {
  return type.split('|').map(t => `'${t}'`).join('|');
}

for (const typeName in astTypes.namedTypes) {
  const typeDef = astTypes.Type.def(typeName);
  const definition = {
    proto: 'ASTNode',
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
    let additionalDocs = [];

    if (t.getBuilderName(typeName) === 'exportDeclaration') {
      debugger;
    }
    const args = typeDef.buildParams
      .filter((name) => typeDef.allFields[name])
      .map(name => {
        let type = typeNameToString(typeDef.allFields[name].type.name);

        name = sanitizeParamName(name);

        switch (name) {
          case 'operator':
          case 'kind':
          case 'variance':
          case 'importKind':
            // additionalDocs.push(`@param ${name} one of: ${type}`); // string
            type = createStringUnionType(type);
            break;
          case 'value':
            if (typeName === 'TemplateElement') {
              type = 'TemplateElementValue';
            }
          default:
            let match;
            if ((match = type.match(/number ([><=]+ \d+)/))) {
              additionalDocs.push(`@param ${name} must be ${match[1]}`);
              type = 'number';
              break;
            }
        }

        const testNull = /\|null/;
        const nullable = false; //testNull.test(type);
        //.replace(testNull, '')
        type = type.replace(/\|/g, ' | ').replace('[', 'Array<').replace(']', '>');

        return {name, type, nullable};
      });
    builders[t.getBuilderName(typeName)] = Object.assign(builder, {
      arguments: args,
      returnType: typeName,
      doc: [`Builds an AST node of type '${typeName}'.`],
    });
    if (typeDef.supertypeList.length > 1) {
      builder.doc.push('Super types: ' + typeDef.supertypeList.slice(1).join(', '));
    }
    builder.doc.push(...additionalDocs);
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

function builderTemplate(name, def) {
  const params = def.arguments.map((arg) => `${arg.name}${arg.nullable ? '?' : ''}: ${arg.type}`).join(', ');
  const doc = def.doc.map((line) => `   * ${line}`).join('\n');
  return `
  /** \n${doc}
   */
  ${name}(${params}): ${def.returnType};
  `;
}

function checkerTemplate(name, type) {
  return `
  ${name}: ${type};`;
}

function typeTemplate(name, proto) {
  return `interface ${name} extends ${proto} {} \n`;
}

let result = 'interface Jscodeshift {\r';

// typeCheckers
Object.keys(typeCheckers).forEach(name => {
  result += checkerTemplate(name, typeCheckers[name]);
});

result += '\r';

// builders
Object.keys(builders).forEach(name => {
  result += builderTemplate(name, builders[name]);
});

result += '\r}';

result += '\r';

// types
Object.keys(types).forEach(name => {
  result += typeTemplate(name, types[name].proto);
});


const template = fs.readFileSync(path.join(__dirname, './defs/jscodeshift.template.d.ts'), 'utf-8');


const target = path.resolve(__dirname, '../website/src/defs/jscodeshift.d.ts');
fs.writeFileSync(
  target,
  template + result,
);
process.stdout.write(`Written to "${path.relative(process.cwd(), target)}"...`);
