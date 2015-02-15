app.controller 'HeaderControlsCtrl', ($rootScope, $scope, $timeout, appSizeService) ->
  headerControls =
    visible: true
    collapsed: appSizeService.isPhone()
  
    initialize: ->
      @setEventListeners()
  
    setEventListeners: ->
      $rootScope.$on 'app:resized', => if appSizeService.isPhone() then @collapse() else @expand()
      $rootScope.$on 'popup:activated', => @hide()
      $rootScope.$on 'popup:deactivated', => @show()

    expand: ->
      return if @isExpanded()
  
      @collapsed = false
      @broadcastHeaderControlsExpanded()
      return
  
    collapse: ->
      return if @isCollapsed()
  
      @collapsed = true
      @broadcastHeaderControlsCollapsed()
      return

    show: ->
      @visible = true
      #try $scope.$apply()

    hide: ->
      @visible = false
      #try $scope.$apply()

    isVisible: ->
      @visible
  
    isExpanded: ->
      !@collapsed
  
    isCollapsed: ->
      @collapsed
  
    broadcastHeaderControlsExpanded: ->
      $scope.$broadcast 'headerControls:expanded'
      $rootScope.$broadcast 'headerControls:expanded'
  
    broadcastHeaderControlsCollapsed: ->
      $scope.$broadcast 'headerControls:collapsed'
      $rootScope.$broadcast 'headerControls:collapsed'

  angular.extend @, headerControls

  @initialize()
