var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var gulpTS = require('gulp-typescript');
var tsProject = gulpTS.createProject({
    "noImplicitAny": false,
    "noEmitOnError": true,
    "removeComments": true,
    "sourceMap": false,
    "module": "system",
    "target": "es5",
    "outFile": "fibonacci.js"
});

var bundleJs = function (files, outputPath) {
    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(concat(outputPath + '.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
}

gulp.task('FiboTSCompile', function () {
    return gulp.src(["./Fibonacci/js/**/*.ts"])
        .pipe(tsProject())
        .pipe(gulp.dest("./Fibonacci/js/"));
});

gulp.task('FiboBundle', ['FiboTSCompile'], function () {
    var files = ['./Fibonacci/js/fibonacci.js'];
    var outputPathBase = './Fibonacci/js/fibonacci';
    return bundleJs(files, outputPathBase)
});

gulp.task('WeatherTSCompile', function () {
    return gulp.src(["./Weather/js/**/*.ts"])
        .pipe(tsProject())
        .pipe(gulp.dest("./Weather/js/"));
});

gulp.task('weatherBundle', ['weatherTSCompile'], function () {
    var files = ['./Weather/js/weather.js'];
    var outputPathBase = './Weather/js/weather';
    return bundleJs(files, outputPathBase)
});

gulp.task('default', ['FiboBundle', 'weatherBundle']);