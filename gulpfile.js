var gulp = require('gulp'),
    path = require('path'),
    $ = require('gulp-load-plugins')(),
    es = require('event-stream'),
    WebpackDevServer = require("webpack-dev-server"),
    webpack = require("webpack"),
    del = require("del"),
    webpackStream = require('webpack-stream'),
    runSequence = require('run-sequence'),
    browserify = require('browserify'),
    babelify = require('babelify')
    fs = require('fs'),
    gutil = require('gulp-util');

// set variable via $ gulp --type prod --style games
var environment = $.util.env.t || $.util.env.type || 'dev';
// var style = $.util.env.style || 'games';
var cdnHostname = '//live-chat.dmcdn.net';
var livereloadPort = 35729;

console.log('Environment: ' + environment);
var isProduction = environment === 'prod';

var port = $.util.env.port || 9001;
var app = 'app/';
var build = 'build/';
var build = 'react-component/';
var example = 'example/';
var public = 'public/';

var webpackConfig = require('./webpack.config.js').getConfig(environment, port);

// copy images
gulp.task('images', function(cb) {
  return gulp.src(public + 'images/**/*')
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(build + 'images/'))
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
      // path: path.join(__dirname + '/public'),
      contentBase: 'public/', // where index.html is
      publicPath: '/js/', // js bundle path
      // publicPath: webpackConfig.output.publicPath, // same
      historyApiFallback: true,
      hot: true
    }).listen(port, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        $.util.log("[webpack-dev-server]", "http://localhost:"+port+"/webpack-dev-server/index.html");
        // keep the server alive or continue?
        // callback();
    });

});

gulp.task('scripts', function(cb) {
  return gulp.src("./app/scripts/DmChat.jsx")
    .pipe(webpackStream(webpackConfig))
    .pipe($.uglify())
    .pipe($.size({ title : 'js' }))
    .pipe(gulp.dest(build + 'js/'));
});

gulp.task('serve', function() {
  $.connect.server({
    host: '0.0.0.0',
    root: build,
    port: port
  });
});

var vendorsSources = [
  'node_modules/hint.css/hint.min.css',
  'node_modules/trackpad-scroll-emulator/css/trackpad-scroll-emulator.css',
  'node_modules/react-dailymotion-follow/dist/react-dailymotion-follow.css',
  'node_modules/emojione/assets/css/emojione.min.css'
];

gulp.task('styles', function (cb) {

  var vendorsStream = gulp.src(vendorsSources)
                          .pipe(isProduction ? $.minifyCss({processImport: false}) : $.util.noop());

  var styles = gulp.src([
                        app + 'styles/main.scss'
                      ])
                      .pipe((isProduction ? $.util.noop() : $.sourcemaps.init()))
                      .pipe($.sass({
                        outputStyle: isProduction ? 'compressed' : 'expanded'
                      }).on('error', $.sass.logError))
                      .pipe($.autoprefixer())
                      .pipe(isProduction ? $.util.noop() : $.sourcemaps.write());

  var dest = isProduction ? build + 'css/' : public + 'css/';

  return es.merge([vendorsStream, liveStream])
                      .pipe($.concat('dailymotion-live-chat-live.css'))
                      .pipe($.size({ title : 'css' }))
                      .pipe(gulp.dest(dest))
                      .pipe($.livereload());

});

// copy html from app to dist
gulp.task('html', function(cb) {
  return gulp.src(public + 'index.html')
    .pipe($.size({ title : 'html' }))
    .pipe(gulp.dest(build));
});

gulp.task('copy', function(cb) {
  // no more stuff here
});

// watch styles, html and js file changes
gulp.task('watch', function() {
  $.livereload.listen(livereloadPort);
  gulp.watch(app + 'styles/**/*.scss', ['styles']);
  // gulp.watch(app + 'index.html', ['html']);
  // gulp.watch(app + 'scripts/**/*.js', ['scripts']);
  // gulp.watch(app + 'scripts/**/*';, ['scripts']);
});

// clean dist
gulp.task('clean', function(cb) {
  del([build + '*'], cb);
});

// clean build
gulp.task('clean-build', function(cb) {
  del([build + '*'], cb);
});

gulp.task('cdn', ['rev'], function(callback){

  // index.html
  gulp.src([
    build + 'embed/index.html'
  ])
  .pipe($.cdnizer({
    defaultCDNBase: cdnHostname,
    allowRev: true,
    files: [
      'css/*.css',
      'js/*.js',
      'images/**/*'
    ]
  }))
  .pipe(gulp.dest(build+'embed'));

  // css
  return gulp.src([
            build + 'embed/css/*.css'
          ])
          .pipe($.cdnizer({
            // defaultCDNBase: cdnHostname,
            defaultCDNBase: '../',
            relativeRoot: 'css/',
            allowRev: true,
            files: [
              '**/*.{png,svg,jpg,jpeg,gif}'
            ]
          }))
          .pipe(gulp.dest(build+'embed/css/'));

});

// Before rev, build assets
gulp.task('rev', function(cb){

  var revAll = new $.revAll({
    dontRenameFile: [/^\/index.html/g]
  });

  return gulp.src(build+'**/*')
      .pipe(revAll.revision())
      .pipe(gulp.dest(build + 'embed/'))
      // .pipe(revAll.versionFile())
      .pipe(revAll.manifestFile())
      .pipe(gulp.dest(build + 'embed/'))

});

// gulp.task('dev', ['webpack-dev-server', 'styles', 'watch', 'images'])

// build as react component
gulp.task('dev', function(callback) {
  runSequence(
    ['webpack-dev-server', 'styles', 'watch', 'images'],
    callback
  );
});

// waits until clean is finished then builds the project
gulp.task('build', function(callback){
  runSequence(
    'clean',
    ['images', 'scripts', 'styles', 'html'],
    'rev',
    // 'cdn',
    callback
  );
});

gulp.task('build-serve', function(callback) {
  runSequence(
    'build',
    'serve',
    callback
  );
});

// build as react component
gulp.task('build-react-component', function(callback) {
  runSequence(
    //['images', 'styles', 'html'], // get images and css in build for example-copy
    'scripts-react',
    ['example', 'example-copy'],
    'serve-example',
    callback
  );
});
