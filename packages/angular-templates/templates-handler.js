import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
  'angular': '^1.2.27'
});

if (!window.angular) {
  require('angular');
}

export default angular.module('angular-templates', []).config([
  '$provide',
  ($provide) => {
    const templatesFileExtension = ['html', 'tpl', 'tmpl', 'template', 'view'];

    $provide.decorator('$templateCache', ['$delegate', ($delegate) => {
      const originalGet = $delegate.get;

      $delegate.get = (templatePath) => {
        const originalResult = originalGet(templatePath);

        if (angular.isUndefined(originalResult)) {
          const fileExtension = ((templatePath.split('.') || []).pop() || '').toLowerCase();

          if (templatesFileExtension.indexOf(fileExtension) > -1) {
            throw new Error('[angular-meteor][err][404] ' + templatePath + ' - HTML template does not exists!');
          }
        }

        return originalResult;
      };

      return $delegate;
    }]);
  }
]);
