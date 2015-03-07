app.filter.directive 'filterControl', ->
  restrict: 'EA'
  controller: FilterController
  controllerAs: 'filter'
  bindToController: true
  #templateUrl: 'filter/filter-control.html'

class FilterController
  @activate = ->
