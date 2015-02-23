app.user.controller 'UserCtrl', ($rootScope, $scope, userService) ->
  @initialize = ->
    @setEventListeners()
    userService.checkAuthentication()

  @setEventListeners = ->
    $rootScope.$on 'user:activate', => @activate()

  @activate = ->
    if userService.isAuthenticated() then @broadcastUserProfileActivate() else @broadcastUserAuthActivate()

  @isAuthenticated = ->
    userService.isAuthenticated()

  @broadcastUserAuthActivate = ->
    $scope.$broadcast 'user:authActivate'

  @broadcastUserProfileActivate = ->
    $scope.$broadcast 'user:profileActivate'

  @initialize()
