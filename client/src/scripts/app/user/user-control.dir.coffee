app.user.directive 'userControl', ->
  restrict: 'EA'
  controller: 'UserCtrl'
  link: ($scope, el, attrs) ->
