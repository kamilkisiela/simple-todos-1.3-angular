import angular from 'angular';
import template from './todosList.html';

import { Tasks } from '../../api/tasks';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      tasks: () => {
        // Show newest tasks at the top
        return Tasks.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    });
  }

  addTask(newTask) {
    Tasks.insert({
      text: newTask,
      createdAt: new Date()
    });
    this.newTask = '';
  };

  removeTask(task) {
    Tasks.remove(task._id);
  }

  setChecked(task) {
    Tasks.update(task._id, {
      $set: {
        checked: !!task.checked
      }
    });
  }
}

export default angular.module('todosList', [])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: TodosListCtrl
  });
