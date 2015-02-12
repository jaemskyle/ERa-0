//'use strict';

var baseDir = 'app';

module.exports = {

  //This is the list of file patterns to load into the browser during testing.
  //TODO if you install a new vendor component with bower you have to write the new dependency below
  files: [
    baseDir + '/vendor/jquery/**/*min.js',
    // baseDir + '/vendor/underscore/underscore.js',
    // baseDir + '/vendor/bootstrap/**/*min.js',
    // baseDir + '/vendor/angular/angular.js',
    baseDir + '/vendor/ionic/js/ionic.bundle.js',
    baseDir + '/vendor/angular-mocks/angular-mocks.js',
    baseDir + '/vendor/localforage/dist/localforage.js',
    baseDir + '/vendor/angular-localForage/dist/angular-localForage.js',
    baseDir + '/vendor/firebase/firebase.js',
    baseDir + '/vendor/angularfire/dist/angularfire.js',
    baseDir + '/vendor/angular-strap/dist/angular-strap.js',
    // baseDir + '/vendor/angular-ui-router/release/angular-ui-router.js',
    // baseDir + '/vendor/angular-animate/angular-animate.js',
    // baseDir + '/vendor/angular-resource/angular-resource.js',
    // baseDir + '/vendor/angular-cookies/angular-cookies.js',
    // baseDir + '/vendor/angular-ui-utils/ui-utils.js',
    // baseDir + '/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
    // baseDir + '/vendor/moment/moment.js',
    // baseDir + '/vendor/**/*min.js',
    baseDir + '/app.js',
    baseDir + '/modules/**/*.js',
    '../_dev/build/dist/**/*.js',
    // baseDir + '/service/**/*.js',
    // baseDir + '/directive/**/*.js',
    // baseDir + '/partial/**/*.js',
    baseDir + '/modules/**/*-spec.js',
    // 'build/tmp/*.js',
  ],

  //used framework
  frameworks: ['jasmine'],

  plugins: [
    'karma-chrome-launcher',
    'karma-phantomjs-launcher',
    'karma-jasmine',
    'karma-coverage',
    'karma-html-reporter',
    'karma-mocha-reporter',
    'karma-ng-html2js-preprocessor'
  ],

  preprocessors: {
    'app/**/*.js': 'coverage',
    'app/modules/**/*.html' : 'ng-html2js'
  },
  ngHtml2JsPreprocessor: {
    moduleName: 'templates'
  },

  reporters: ['mocha', 'html', 'coverage'],

  coverageReporter: {
    type: 'html',
    dir: baseDir + '/test/unit-results/coverage',
    file: 'coverage.html'
  },

  htmlReporter: {
    outputDir: baseDir + '//test/unit-results/html'
  },

  logLevel: 'info',

  urlRoot: '/__test/',

  //used browsers (overriddeng in some gulp task)
  browsers: ['Chrome'],

};
