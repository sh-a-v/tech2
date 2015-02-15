app.controller 'PopupCtrl', ($rootScope, $scope) ->
  @active = false

  @activate = ->
    @active = true
    @broadcastPopupActivated()

  @deactivate = ->
    @active = false
    @broadcastPopupDeactivated()

  @stopPropagation = ($event) ->
    $event.stopPropagation()
    $event.preventDefault()

  @isActive = ->
    @active

  @broadcastPopupActivated = ->
    $scope.$emit 'popup:activated'

  @broadcastPopupDeactivated = ->
    $scope.$emit 'popup:deactivated'
