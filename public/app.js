angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};

    // Get all todos
    $http.get('/api/v1/todos')
        .success(function(data) {
          $scope.todoData = data;
          /*data.forEach(function(todo) {
            if (todo.todoComplete==1) {
              todo.todoComplete=true;
            } else {
              todo.todoComplete=false;
            }
            $scope.todoData.push(todo);
        });*/
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

    // Create a new todo
    $scope.createTodo = function(todoID) {
        $http.post('/api/v1/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    $scope.updateTodo = function(todo) {
      console.log("update todo",todo);

      $http.put('api/v1/todos/'+todo.unid,todo)
        .success(function(data) {
          $scope.todoData =data;/*[];
          data.forEach(function(todo) {
              if (todo.todoComplete===1) {
                todo.todoComplete=true;
              } else {
                todo.todoComplete=false;
              }
              $scope.todoData.push(todo);
          });*/

          console.log(data);
      })
      .error(function(error) {
          console.log('Error: ' + error);
      });
    }

    // Delete a todo
    $scope.deleteTodo = function(todoID) {
        $http.delete('/api/v1/todos/' + todoID)
            .success(function(data) {
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});
