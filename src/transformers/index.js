const requireTransformer = require.context('./', false, /\.js$/);

const byID = {};

export const transformers =
	requireTransformer.keys()
	.filter(name => name !== './index.js')
	.map(name => {
		let transformer = requireTransformer(name);
		byID[transformer.id] = transformer;
		return transformer;
	});

export function getTransformerByID(id) {
  return byID[id];
}
