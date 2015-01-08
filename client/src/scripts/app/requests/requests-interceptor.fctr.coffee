app.factory 'requestsInterceptor', ($rootScope, $q) ->
  serverBroadcast =
    broadcastServerRequest: ->
      $rootScope.$emit 'server:request'

    broadcastServerResponse: ->
      $rootScope.$emit 'server:response'

    broadcastServerError: ->
      $rootScope.$emit 'server:error'

  interceptor =
    request: (config) ->
      serverBroadcast.broadcastServerRequest()
      return config

    response: (response) ->
      serverBroadcast.broadcastServerResponse()
      return response

    responseError: (response) ->
      serverBroadcast.broadcastServerResponse()
      serverBroadcast.broadcastServerError()

      return $q.reject response

  return interceptor
