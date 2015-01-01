app.controller 'PopupCtrl', ($rootScope, $scope) ->
  @active = false

  @activate = ->
    @active = true
    @_broadcastPopupActivated()

  @deactivate = ->
    @active = false
    @_broadcastPopupDeactivated()

  @isActive = ->
    @active

  @_broadcastPopupActivated = ->
    $scope.$broadcast 'popup:activated'

  @_broadcastPopupDeactivated = ->
    $scope.$broadcast 'popup:deactivated'

  return
