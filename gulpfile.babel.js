'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import del from 'del';

const DIR = {
    SRC: 'src',
    DEST: 'dist'
};

const SRC = {
    JS: DIR.SRC + '/js/*.js',
    CSS: DIR.SRC + '/css/*.css',
    HTML: DIR.SRC + '/*.html'
};

const DEST = {
    JS: DIR.DEST + '/js',
    CSS: DIR.DEST + '/css',
    HTML: DIR.DEST + '/'
};

gulp.task('default', ['clean', 'js', 'css', 'html', 'watch'], () => {
	gutil.log('Gulp is running');
});
gulp.task('js', () => {
	return gulp.src(SRC.JS)
						.pipe(uglify())
						.pipe(gulp.dest(DEST.JS));
});
gulp.task('css', () => {
	return gulp.src(SRC.CSS)
						.pipe(cleanCSS({
							compatibility: 'ie8'
						}))
						.pipe(gulp.dest(DEST.CSS));
});
gulp.task('html', () => {
	return gulp.src(SRC.HTML)
						.pipe(htmlmin({
							collapseWhitespace: true
						}))
						.pipe(gulp.dest(DEST.HTML));
});
gulp.task('clean', () => {
	return del.sync([DIR.DEST]);
});
gulp.task('watch', () => {
    let watcher = {
        js: gulp.watch(SRC.JS, ['js']),
        css: gulp.watch(SRC.CSS, ['css']),
        html: gulp.watch(SRC.HTML, ['html'])
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});
