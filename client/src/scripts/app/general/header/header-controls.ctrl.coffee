app.controller 'HeaderControlsCtrl', ($rootScope, $scope, $timeout, appSizeService) ->
  @visible = true
  @collapsed = appSizeService.isPhone()

  @initialize = ->
    @setEventListeners()

  @setEventListeners = ->
    $rootScope.$on 'app:resized', => if appSizeService.isPhone() then @collapse() else @expand()
    $rootScope.$on 'popup:activated', => @hide()
    $rootScope.$on 'popup:deactivated', => @show()

  @expand = ->
    return if @isExpanded()

    @collapsed = false
    @broadcastHeaderControlsExpanded()
    return

  @collapse = ->
    return if @isCollapsed()

    @collapsed = true
    @broadcastHeaderControlsCollapsed()
    return

  @show = ->
    @visible = true

  @hide = ->
    @visible = false

  @isVisible = ->
    @visible

  @isExpanded = ->
    !@collapsed

  @isCollapsed = ->
    @collapsed

  @broadcastHeaderControlsExpanded = ->
    $scope.$emit 'headerControls:expanded'

  @broadcastHeaderControlsCollapsed = ->
    $scope.$emit 'headerControls:collapsed'

  @initialize()
