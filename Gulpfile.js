/* global require */
var gulp 		= require('gulp');
var umd 		= require('gulp-umd');
var rename 		= require("gulp-rename");
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

gulp.task('build', ['scripts'], function () {
	return gulp.src('./release/js/camljs.js')
				.pipe(umd({
			      exports: function() {
			          return 'CamlBuilder';
			        },
			        namespace: function() {
			          return 'CamlBuilder';
			        }
			    }))
				.pipe(rename('camljs-umd.js'))
				.pipe(gulp.dest('./release/js'));
});

gulp.task('copy', function () {
	return gulp.src('./release/js/camljs.js')
				.pipe(gulp.dest('./Nuget/content/Scripts'));
});

//ald copy.cmd file
//done -> gulp-typescript
//"C:\Program Files (x86)\Microsoft SDKs\TypeScript\1.0\tsc" --declaration CamlJs\camljs.ts --out camljs.d.ts
//copy CamlJs\camljs.js Nuget\content\Scripts
//copy CamlJs\camljs.js CamlJs.TestApp\Scripts
//copy camljs.d.ts ..\DefinitelyTyped\camljs
//copy CamlJs\camljs.js ..\camljs-console\Scripts\
//copy camljs.d.ts ..\camljs-console\Scripts\typings\camljs