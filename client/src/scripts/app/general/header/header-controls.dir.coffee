app.directive 'headerControls', ->
  restrict: 'E'
  controller: 'HeaderControlsCtrl'
  controllerAs: 'headerControls'
  link: ($scope, el, attrs, headerControls) ->
    headerControls.view =
      expand: ->
        el.removeClass('collapsed').addClass('expanded')

      collapse: ->
        el.removeClass('expanded').addClass('collapsed')

      hide: ->
        el.addClass('invisible')
