import angular from 'angular';
import template from './todosList.html';

import { Tasks } from '../../api/tasks';

class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.hideCompleted = false;

    this.helpers({
      tasks() {
        const selector = {};

        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }

        // Show newest tasks at the top
        return Tasks.find(selector, {
          sort: {
            createdAt: -1
          }
        });
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
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
