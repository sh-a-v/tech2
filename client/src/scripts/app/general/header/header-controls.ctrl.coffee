app.controller 'HeaderControlsCtrl', ($rootScope, $scope, $timeout, appSizeService) ->
  @visible = false
  @collapsed = false

  @initialize = ->
    @setEventListeners()
    @setCollapsed()
    @activate()

  @setEventListeners = ->
    $rootScope.$on 'app:resized', => @setCollapsed(true)

  @setCollapsed = (resize) ->
    @collapsed = appSizeService.isPhone()
    $scope.$apply() if resize

  @activate = ->
    $timeout (=> @visible = true), 400


  @expand = ->
    return if @isExpanded()
    @collapsed = false

  @collapse = ->
    return if @isCollapsed()
    @collapsed = true

  @isVisible = ->
    @visible

  @isExpanded = ->
    !@collapsed

  @isCollapsed = ->
    @collapsed

  @_broadcastHeaderControlsExpanded = ->
    $scope.$broadcast 'headerControls:expanded'

  @_broadcastHeaderControlsCollapsed = ->
    $scope.$broadcast 'headerControls:collapsed'

  @_broadcastHeaderControlsReady = ->
    $scope.$broadcast 'headerControls:ready'

  @initialize()
