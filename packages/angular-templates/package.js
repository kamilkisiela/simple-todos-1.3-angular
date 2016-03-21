Package.describe({
  name: 'angular-templates',
  summary: 'Compile angular templates into the template cache',
  version: '1.1.0',
  git: 'https://github.com/Urigo/angular-meteor.git',
  documentation: null
});

Package.registerBuildPlugin({
  name: 'compileNGTemplate',
  sources: [
    'plugin/ng-caching-html-compiler.js',
    'plugin/ng-html-scanner.js',
    'plugin/ng-template-compiler.js'
  ],
  use: [
    'caching-html-compiler@1.0.2',
    'ecmascript',
    'templating-tools@1.0.0',
    'underscore@1.0.4',
    'html-tools@1.0.5'
  ],
  npmDependencies : {
    'cheerio': '0.19.0',
    'html-minifier' : '0.6.9',
    'uglify-js': '2.4.24'
  }
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.3-rc.4');
  api.use('isobuild:compiler-plugin');
  api.use('ecmascript@0.4.0-beta.11');
  api.use('tmeasday:check-npm-versions@0.1.1');
  api.use('angular:angular@1.4.7', 'client', { weak: true });

  api.mainModule('templates-handler.js', 'client');
});
