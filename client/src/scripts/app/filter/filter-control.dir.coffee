app.filter.directive 'filterControl', ->
  restrict: 'EA'
  controller: 'FilterCtrl'
  controllerAs: 'filter'
  #templateUrl: 'filter/filter-control.html'
  link: ($scope, el, attrs) ->
