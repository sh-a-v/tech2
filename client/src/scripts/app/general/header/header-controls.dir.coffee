app.directive 'headerControls', ->
  restrict: 'E'
  controller: 'HeaderControlsCtrl'
  controllerAs: 'headerControls'
  link: ($scope, el, attrs) ->
    $scope.$on 'headerControls:ready', show
    $scope.$on 'headerControls:expanded', expand
    $scope.$on 'headerControls:collapsed', collapse

    expand = ->
      el.removeClass('collapsed')

    collapse = ->
      el.addClass('collapsed')

    show = ->
      el.addClass('visible')
