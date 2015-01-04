app.controller 'AppSizeCtrl', ($rootScope, $scope, $window, appSizeService) ->
  @initialize = ->
    @setEventListeners()

  @setEventListeners = ->
    angular.element($window).on 'resize', @resize

  @resize = ->
    appSizeService.updateSize($window.innerWidth, $window.innerHeight)
    @_broadcastAppResized()

  @_broadcastAppResized = ->
    $rootScope.$broadcast 'app:resized'

  @initialize()
