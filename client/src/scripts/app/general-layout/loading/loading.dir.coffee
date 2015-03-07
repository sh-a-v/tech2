app.directive 'loading', ->
  restrict: 'A'
  controller: 'LoadingCtrl'
  controllerAs: 'loading'
  link: ($scope, el, attrs, loading) ->
