const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify')

gulp.task('sass', () => {
  return gulp.src('views/assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets'));
})

gulp.task('js', () => {
  return gulp.src(['views/assets/js/gov-uk-module-loader.js', 'views/assets/js/*.js'])
    .pipe(babel({
          presets: ['es2015']
      }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('assets'));
})

gulp.task('test', function () {
  var mocha = require('gulp-mocha');
  return gulp.src("server/tests/*.js", {read:false})
  .pipe(mocha({reporter:'nyan'}));
});

gulp.task('watch', function() {
  gulp.watch('views/assets/sass/**/*.scss', ['sass']);
  gulp.watch('views/assets/js/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch'], () => console.log('gulp running...'))
