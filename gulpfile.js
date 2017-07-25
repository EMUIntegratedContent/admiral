const gulp = require('gulp');
const vueify = require('gulp-vueify');
const browserify = require('gulp-browserify');
const minify = require('gulp-minify');
const babel = require('gulp-babel');

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

gulp.task('watch', function(){
  gulp.watch('./src/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);
