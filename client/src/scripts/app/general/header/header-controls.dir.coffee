app.directive 'headerControls', ->
  restrict: 'E'
  controller: 'HeaderControlsCtrl'
  controllerAs: 'headerControls'
  link: ($scope, el, attrs, headerControls) ->
    view =
      initialize: ->
        @setEventListeners()

      setEventListeners: ->
        $scope.$on 'headerControls:expanded', => @expand()
        $scope.$on 'headerControls:collapsed', => @collapse()

      expand: ->
        el.removeClass('collapsed').addClass('expanded') if el.hasClass('collapsed')

      collapse: ->
        el.removeClass('expanded').addClass('collapsed') if el.hasClass('expanded')

      hide: ->
        el.addClass('invisible')

    view.initialize()
