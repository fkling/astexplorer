export default function loadAndExectue(deps, func) {
  return new Promise((resolve, reject) => {
    loadjs(
      deps,
      (...modules) => {
        try {
          resolve(func(...modules));
        } catch(error) {
          // Assume parse error
          reject(error);
        }
      },
      error => (resolve(null), console.error(error))
    );
  });
}
