app.user.directive 'userControl', ->
  restrict: 'EA'
  controller: 'UserCtrl'
  controllerAs: 'userCtrl'
  templateUrl: 'user/user-control.html'
  link: ($scope, el, attrs) ->
