app.controller 'PopupCtrl', ($rootScope, $scope) ->
  @active = false

  @activate = ->
    @active = true
    @view.show()
    @broadcastPopupActivated()

  @deactivate = ->
    @active = false
    @view.hide()
    @broadcastPopupDeactivated()

  @stopPropagation = ($event) ->
    $event.stopPropagation()
    $event.preventDefault()

  @isActive = ->
    @active

  @broadcastPopupActivated = ->
    $rootScope.$broadcast 'popup:activated'

  @broadcastPopupDeactivated = ->
    $rootScope.$broadcast 'popup:deactivated'

  return
