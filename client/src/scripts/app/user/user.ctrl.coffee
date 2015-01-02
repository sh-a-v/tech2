app.user.controller 'UserCtrl', ($rootScope, $scope, userService) ->
  @initialize = ->
    @setEventListeners()
    userService.checkAuthentication()

  @setEventListeners = ->
    $rootScope.$on('user:activate', @activate)

  @activate = ->
    if userService.isAuthenticated() then @_broadcastUserProfileActivate() else @_broadcastUserAuthActivate()

  @_broadcastUserAuthActivate = ->
    $scope.$broadcast 'user:authActivate'

  @_broadcastUserProfileActivate = ->
    $scope.$broadcast 'user:profileActivate'

  @initialize()
