var gulp = require('gulp');
var nodemon = require('nodemon');

// sass compilation
gulp.task('sass', function() {
  console.log('-> bundling CSS...');
  gulp.src('./app/scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./app/build'));
});

// backend watch
gulp.task('watch', function() {
  nodemon({
    script: './src/server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
})

// TODO: add sass once using css
gulp.task('default', ['watch']);