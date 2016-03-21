import angularMeteor from 'angular-meteor';

import '../imports/startup/accounts-config.js';
import todosList from '../imports/components/todosList/todosList';

angular.module('simple-todos', [
  'angular-meteor',
  todosList.name,
  'accounts.ui'
]);

function onReady() {
  angular.bootstrap(document, ['simple-todos']);
}

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
