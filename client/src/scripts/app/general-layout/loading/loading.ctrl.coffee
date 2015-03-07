app.controller 'LoadingCtrl', ($rootScope, $scope) ->
  @requestsCount = 0

  @initialize = ->
    @setEventListeners()

  @setEventListeners = ->
    $rootScope.$on 'server:request', => @addRequest()
    $rootScope.$on 'server:response', => @removeRequest()

  @addRequest = ->
    @requestsCount += 1

  @removeRequest = ->
    @requestsCount -= 1

  @isOneRequest = ->
    @requestsCount == 1

  @isThereRequests = ->
    @requestsCount

  @initialize()
