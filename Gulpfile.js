/* global require */
var gulp 		= require('gulp');
var ts 			= require('gulp-typescript');

var eventStream = require('event-stream');

gulp.task('scripts', function() {
    var tsResult = gulp.src('./CamlJs/camljs.ts')
                       .pipe(ts({
                           declarationFiles: true,
                           noExternalResolve: true
                       }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    );
});