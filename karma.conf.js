module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        'app/bower_components/jquery/dist/jquery.min.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-ui-router/release/angular-ui-router.js',
        'app/bower_components/angular-cookies/angular-cookies.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',

        'app/src/angularRoute.js',
        'app/dist/js/util/util.js',
        'app/dist/js/util/header.js',
        'app/dist/js/util/validateForm.js',
        'app/src/**/*.js',
        'app/appTest/**/*.js',
        'app/views/base/*.html'
    ],
    exclude: [
        'karma.conf.js'
    ],
      plugins: [ 'karma-jasmine', 'karma-chrome-launcher', 'karma-firefox-launcher', 'karma-coverage','karma-ng-html2js-preprocessor'],
      reporters: ['progress','coverage'],
      preprocessors: {
          'app/src/**/*.js':['coverage'],
          'app/views/base/*.html' : ['ng-html2js']
      },
      coverageReporter:{
          type:'html',
          dir:'coverage/'
      },
      ngHtml2JsPreprocessor: {
          stripPrefix: 'views/',
          stripSuffix: '.html',
          moduleName: 'templates'
      },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    //browsers: ['Chrome'],
    browsers: ['Firefox'],
    singleRun: false,
    concurrency: Infinity
  })
};
