app.controller 'PopupCtrl', ($rootScope, $scope) ->
  popup =
    active: false

    activate: ->
      @active = true
      @broadcastPopupActivated()

    deactivate: ->
      @active = false
      @broadcastPopupDeactivated()

    stopPropagation: ($event) ->
      $event.stopPropagation()
      $event.preventDefault()

    isActive: ->
      @active

    broadcastPopupActivated: ->
      $scope.$broadcast 'popup:activated'
      $rootScope.$broadcast 'popup:activated'

    broadcastPopupDeactivated: ->
      $scope.$broadcast 'popup:deactivated'
      $rootScope.$broadcast 'popup:deactivated'

  angular.extend @, popup
