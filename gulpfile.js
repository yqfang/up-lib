var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var streamqueue = require('streamqueue');

var config = {
  pkg : JSON.parse(fs.readFileSync('./package.json')),
  banner:
      '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * <%= pkg.author %>\n' +
      ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n\n\n'
};

gulp.task('default', ['build']);
gulp.task('build', ['scripts', 'styles', 'fonts']);
gulp.task('clean', function() {
	del.sync('dist');
})
gulp.task('scripts', ['clean'], function() {
	var buildNg = function() {
		return gulp.src(['ng-pack/jquery.js', 'ng-pack/angular.js', 'ng-pack/!(ngpack)*.js', 'ng-pack/ngpack.js'])
	}
	var buildIE = function() {
		return gulp.src('ie-pack/*.js')
	}
	return streamqueue({ objectMode: true }, buildNg(), buildIE())
		.pipe($.plumber({
			errorHandler: handleError
		}))
		.pipe($.concat('uplib.js'))
		.pipe($.header(config.banner, {
	      timestamp: (new Date()).toISOString(), pkg: config.pkg
	    }))
	    .pipe(gulp.dest('dist'))
	    .pipe($.sourcemaps.init())
	    .pipe($.uglify({preserveComments: 'some'}))
	    .pipe($.concat('uplib.min.js'))
	    .pipe($.sourcemaps.write('./'))
	    .pipe(gulp.dest('dist'));
});
gulp.task('styles', ['clean'], function() {
	return gulp.src(['css-pack/**/*.css'])
		.pipe($.sourcemaps.init())
		.pipe($.header(config.banner, {
		  timestamp: (new Date()).toISOString(), pkg: config.pkg
		}))
		.pipe($.concat('uplib.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe($.minifyCss())
		.pipe($.concat('uplib.min.css'))
		.pipe($.sourcemaps.write('./', {debug: true}))
		.pipe(gulp.dest('dist/css'));
})
gulp.task('fonts', ['clean'], function() {
	return gulp.src('css-pack/fonts/**/*', {base: 'css-pack'})
		.pipe(gulp.dest('dist'))
})

var handleError = function (err) {
  console.log(err.toString());
  this.emit('end');
};