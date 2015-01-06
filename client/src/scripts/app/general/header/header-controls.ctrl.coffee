app.controller 'HeaderControlsCtrl', ($rootScope, $scope, $timeout, appSizeService) ->
  @visible = true
  @collapsed = appSizeService.isPhone()

  @initialize = ->
    @setEventListeners()

  @setEventListeners = ->
    $rootScope.$on 'app:resized', => if appSizeService.isPhone() then @collapse(true) else @expand()

  @expand = ->
    return if @isExpanded()

    @collapsed = false
    @view.expand()
    return

  @collapse = (resize) ->
    return if @isCollapsed()

    @collapsed = true
    @view.collapse()

    try $scope.$apply() if resize

    return

  @isVisible = ->
    @visible

  @isExpanded = ->
    !@collapsed

  @isCollapsed = ->
    @collapsed

  @_broadcastHeaderControlsExpanded = ->
    $rootScope.$broadcast 'headerControls:expanded'

  @_broadcastHeaderControlsCollapsed = ->
    $rootScope.$broadcast 'headerControls:collapsed'

  @initialize()
