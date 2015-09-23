'strong mode';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';


let lintPath = ['./*.js', './src/**/*.js'];
let jadePath = ['./src/views/**.jade'];
let staticPath = ['./src/public/**/**.*'];
let babelPath = ['./bin/**','./src/**/*.js'];

let watchPath = [...lintPath, ...jadePath, ...staticPath, ...babelPath ];

gulp.task('lint', () => {
  return gulp.src(lintPath)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('build', ['build:jade', 'build:babel', 'build:statics']);

gulp.task('build:jade', () => {
  return gulp.src(jadePath, {base: 'src'})
    .pipe(gulp.dest('dest'));
});

gulp.task('build:statics', () => {
  return gulp.src(staticPath, {base: 'src'})
    .pipe(gulp.dest('dest'));
});

gulp.task('build:babel', () => {
  return gulp.src(babelPath)
    .pipe(babel())
    .pipe(gulp.dest('dest'));
});


gulp.task('watch', () => {
  gulp.watch(watchPath, ['lint','build']);
});
