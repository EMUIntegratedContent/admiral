var gulp = require('gulp')
var browserify = require('browserify')
var uglify = require('gulp-uglify')
var es         = require('event-stream')
var source     = require('vinyl-source-stream')
var rename     = require('gulp-rename')

gulp.task('js', function () {
    // we define our input files, which we want to have
    // bundled:
    var files = [
        './src/app.js',
        './src/crap.js'
    ];
    // map them to our stream function
    var tasks = files.map(function(entry) {
        return browserify({ entries: [entry] })
            .bundle()
            .pipe(source(entry))
            // rename them to have "bundle as postfix"
            .pipe(rename({
                extname: '.bundle.js'
            }))
            .pipe(gulp.dest('./public'));
        });
    // create a merged stream
    return es.merge.apply(null, tasks);
});
