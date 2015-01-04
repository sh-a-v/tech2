app.directive 'appSize', ->
  restrict: 'A'
  controller: 'AppSizeCtrl'
  controllerAs: 'appSize'
  link: ($scope, el, attrs) ->
    return
