app.controller 'PopupCtrl', ($rootScope, $scope) ->
  @active = false

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
    $scope.$emit 'popup:activated'

  @broadcastPopupDeactivated = ->
    $scope.$emit 'popup:deactivated'
