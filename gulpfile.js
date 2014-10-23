var browserify = require('browserify');
var gulp = require('gulp');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var through2 = require('through2');
var reactTransform = require('react-tools').transform;

var SRC = './src/app.js';
var OUT = './app.js';
var DEST = './';

function transform(filename) {
  var code = '';
  return through2(
    function(chunk, _, cb) { code += chunk.toString(); cb(); },
    function(cb) {
      try {
        this.push(reactTransform(code.toString(), {harmony: true}));
      } catch(e) {
        console.log('Error:', filename, e);
      }
      cb();
  });
}

gulp.task('build', function() {
  browserify(SRC)
    .transform(transform)
    .transform('brfs')
    .bundle()
    .pipe(source(OUT))
    .pipe(streamify(uglify({output: {ascii_only:true}})))
    .pipe(gulp.dest(DEST));
});

gulp.task('watch', function() {
  var bundler = watchify(browserify(watchify.args).add(SRC))
    .transform(transform)
    .transform('brfs')
    .on('update', rebundle);

  function rebundle () {
    return bundler.bundle()
    .on('error', function(e) {
      console.log('Browserify Error', e);
    })
    .pipe(source(OUT))
    .pipe(gulp.dest(DEST));
  }

  return rebundle();
});
