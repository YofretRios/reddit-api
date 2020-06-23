const { series, src } = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');

function lint() {
  return src(['./**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function build() {
  let stream = nodemon({
    script: './src/index.js',
    ext: 'json js',
    ignore: ['node_modules/**'],
    tasks: () => ['lint'],
    env: { 'NODE_ENV': 'development' }
  });

  stream
    .on('restart', () => {
      console.log('Server has restarted'); // eslint-disable-line
    })
    .on('crash', () => {
      console.error('Application has crashed!\n'); // eslint-disable-line
      stream.emit('restart', 10);  // restart the server in 10 seconds
    });
}

exports.lint = lint;
exports.build = build;
exports.default = series(lint, build);
