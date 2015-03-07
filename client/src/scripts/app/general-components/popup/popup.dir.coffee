app.directive 'popup', ->
  restrict: 'EA'
  controller: PopupController
  controllerAs: 'popup'
  scope: {}
  bindToController: true
  transclude: true
  templateUrl: 'general/popup.html'


class PopupController
  @active = false

  constructor: ($scope) ->
    @scope = $scope

  @activate = ->
    return if @isActive()

    @active = true
    @broadcastPopupActivated()

  @deactivate = ->
    return if !@isActive()

    @active = false
    @broadcastPopupDeactivated()

  @stopPropagation = ($event) ->
    $event.stopPropagation()
    $event.preventDefault()

  @isActive = ->
    @active

  @broadcastPopupActivated = ->
    @scope.$emit 'popup:activated'

  @broadcastPopupDeactivated = ->
    @scope.$emit 'popup:deactivated'

  ###link: ($scope, el, attrs, popup) ->
    popupEl = el.children()
    contentEl = angular.element(popupEl[0].getElementsByClassName('popup-content-wrapper')[0])

    popup.view =
      initialize: ->
        @setEventListeners()

      setEventListeners: ->
        $scope.$on 'popup:activated', => @show()
        $scope.$on 'popup:deactivated', => @hide()

      show: ->
        Velocity contentEl, {scaleY: 0.1}, {duration: 1}

        Velocity contentEl, {
            scaleY: 1
          }, {
            duration: 250,
            begin: ->
              Velocity el, {opacity: 1}, {duration: 80, display: 'block'}
          }

      hide: ->
        Velocity contentEl, {
            scaleY: 0
          }, {
            duration: 200,
            complete: ->
              Velocity el, {opacity: 0}, {duration: 50, display: 'none'}
          }

    popup.view.initialize()###
