app.user.controller 'UserCtrl', ($rootScope, $scope, userService) ->
  @activate = ->
    if userService.isAuthenticated() then @_broadcastUserProfileActivate() else @_broadcastUserAuthActivate()

  @_broadcastUserAuthActivate = ->
    console.log 'user:authActivate'
    $scope.$broadcast 'user:authActivate'

  @_broadcastUserProfileActivate = ->
    console.log 'user:profileActivate'
    $scope.$broadcast 'user:profileActivate'

  userService.checkAuthentication();
