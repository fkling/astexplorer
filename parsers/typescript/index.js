import typescript from 'typescript'
import {version} from 'typescript/package.json'

const syntaxKind = {};

for (const name of Object.keys(typescript.SyntaxKind).filter(x => isNaN(parseInt(x)))) {
    const value = typescript.SyntaxKind[name];
    if (!syntaxKind[value]) {
        syntaxKind[value] = name;
    }
}

export default {
  typescript,
  syntaxKind,
  version
}
