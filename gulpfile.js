var gulp = require('gulp');
var webpack = require('webpack');
var nodemon = require('nodemon');

// frontend
var frontendConfig = {
  entry: './src/app.js',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      }
    ]
  }
};

function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    // else {
    //   console.log(stats.toString());
    // }
    if(done) {
      done();
    }
  }
}

// front-end build with webpack
gulp.task('build', function(done) {
  webpack(frontendConfig).run(onBuild(done));
  console.log('webpack build done')
})

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

gulp.task('default', ['build', 'watch']);


