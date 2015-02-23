app.user.controller 'UserAuthCtrl', ($rootScope, $scope, userService) ->
  @initialize = ->
    @setEventListeners()

  @setEventListeners = ->

  @authenticate = ->
    userService.authenticate(@email, @password).then (res) =>
      @broadcastUserDeactivate() if userService.isAuthenticated()

      return res

  @broadcastUserDeactivate = ->
    $scope.$broadcast('user:deactivate')

  @initialize()
