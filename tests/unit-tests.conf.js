// Karma configuration
// Generated on Tue Mar 22 2016 22:47:27 GMT-0400 (Est (heure d’été))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../www/lib/ionic/js/ionic.bundle.js',
      //'../www/lib/angular/angular.js', //include in ionic.bundle.js

      //'../www/lib/angular/angular.js',
      //'../www/lib/angular/angular-*.js',
      //'../node_modules/angular-mocks/angular-mocks.js',
      '../www/lib/ngCordova/dist/ng-cordova.js',
      '../www/lib/ionic/js/angular-ui/angular-ui-router.js',
      '../www/lib/angular-animate/angular-animate.js',
      '../www/lib/angular-sanitize/angular-sanitize.js',
      '../www/lib/angular-resource/angular-resource.js',
      '../www/lib/angular-mocks/angular-mocks.js',
      '../www/lib/ngMockHttp.js',

      '../www/js/app.js',
      '../www/songs/*.js',
      '../www/services/*.js',
      '../www/draws/*.js',
      '../www/events/*.js',
      '../www/layout/*.js',
      //'../www/services/*.js',

      './Constants.js',
      './Services/*.js',
      './Controllers/*.js'
      //'../www/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
