const gulp = require('gulp');
const vueify = require('gulp-vueify');
const browserify = require('gulp-browserify');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
var $  = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('scripts', function() {
  gulp.src('./src/**/*.js')
    .pipe(babel({
			presets: ['env'],
		}))
    .pipe(browserify({
      transform: ['vueify'],
      extensions: ['.vue']
    }))
    .pipe(minify())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('sass', function() {
  return gulp.src('./public/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.+(js|vue)', ['scripts']);
  gulp.watch(['./public/scss/**/*.scss'], ['sass']);
});

gulp.task('default', ['watch', 'scripts', 'sass']);
