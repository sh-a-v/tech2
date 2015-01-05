app.user.directive 'userControl', ->
  restrict: 'EA'
  controller: 'UserCtrl'
  controllerAs: 'user'
  #templateUrl: 'user/user-control.html'
  link: ($scope, el, attrs) ->
