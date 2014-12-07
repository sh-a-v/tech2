app.popup.controller 'PopupCtrl', ($rootScope, $scope, popupService) ->
  @service = popupService

  @active = @service.active

  @activate = ->
    this.active = true
    this._broadcastPopupActivated()
    console.log 'activate'

  this.deactivate = ->
    this.active = false
    this._broadcastPopupDeactivated()

  this.isActive = ->
    this.active

  this._broadcastPopupActivated = ->
    $scope.$broadcast 'popup:activated'

  this._broadcastPopupDeactivated = ->
    $scope.$broadcast 'popup:deactivated'

  return
