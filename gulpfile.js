const gulp = require('gulp');
const webpack = require('webpack');
const del = require('del');
const PluginError = require('plugin-error');
const log = require('fancy-log');

const electronWebpackConfig = require('./webpack.config.electron');
const rendererWebpackConfig = require('./webpack.config.renderer');

const electron = require('electron-connect').server.create();

gulp.task('kill', (done) => {
  electron.killProcess();
  done();
});

gulp.task('restart', (done) => {
  electron.restart();
  done();
});

gulp.task('reload-page', (done) => {
  electron.reload();
  done();
});

gulp.task('clean', (done) => {
  del([
    './src/main/dist/main/**/*',
    './src/main/dist/renderer/**/*',
  ]);
  done();
})

gulp.task('build:renderer', (done) => {
  webpack(rendererWebpackConfig, (error, stats) => {
    if (error) throw new PluginError('webpack:renderer', error);
    log.info('[webpack:renderer]', stats.toString({ colors: true }));
    done();
  });
});

gulp.task('build:app', (done) => {
  webpack(electronWebpackConfig, (error, stats) => {
    if (error) throw new PluginError('webpack:app', error);
    log.info('[webpack:app]', stats.toString({ colors: true }));
    done();
  });
});

gulp.task('electron-dev', (done) => {
  electron.start();
  gulp.watch(['./src/main/**/*.ts'], gulp.series('kill', 'build:app', 'restart'));
  gulp.watch(['./src/main/index-dev.html'], gulp.series('reload-page'));
  done();
})

gulp.task('start:devwatch', gulp.series('clean', 'build:app', 'electron-dev'));

gulp.task('build', gulp.series('clean', 'build:renderer', 'build:app'));
