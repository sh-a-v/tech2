app.controller 'MenuCtrl', ($rootScope, $scope, appSizeService) ->
  @collapsed = !appSizeService.isDesktop()

  @initialize = ->
    @setEventListeners()

  @setEventListeners = ->
    $rootScope.$on 'app:resized', => if appSizeService.isDesktop() then @expand() else @collapse()

  @toggle = ->
    return if appSizeService.isDesktop()

    if @isCollapsed() then @expand() else @collapse()

  @expand = ->
    return if @isExpanded()

    @collapsed = false
    @broadcastMenuExpanded()
    @view.show()

  @collapse = ->
    return if @isCollapsed()

    @collapsed = true
    @broadcastMenuCollapsed()
    @view.hide()

  @isExpanded = ->
    !@collapsed

  @isCollapsed = ->
    @collapsed

  @broadcastMenuExpanded = ->
    $rootScope.$broadcast 'menu:expanded'

  @broadcastMenuCollapsed = ->
    $rootScope.$broadcast 'menu:collapsed'

  @initialize()
