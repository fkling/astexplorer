module.exports = function() {
  this.plugin('resolve', (request, callback) => {
    if (/node_modules/.test(request.path)) {
      // Ignore any requests inside node_modules
      return callback();
    }
    if (/^(?!\.{0,2}\/).+:/.test(request.request)) {
      const [parentModule, childModule] = request.request.split(':');
      const obj = Object.assign({}, request, {
        request: parentModule,
      });
      this.doResolve('resolve', obj, null, (error, result) => {
        const obj = Object.assign({}, result, {
          request: childModule,
        });
        this.doResolve('resolve', obj, null, callback);
      });
    } else {
      callback();
    }
  });
}
