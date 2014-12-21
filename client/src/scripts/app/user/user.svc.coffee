app.user.service 'userService', ($rootScope, authResource) ->
  user:
    authentication: false

  updateUser: (user) ->
    @user = angular.extend user, @user

  authenticate: (email, password) ->
    authResource.save().$promise.then (res) =>
      if res.success
        @updateUser(res.user)

      return res

  deauthenticate: ->
    @user.authentication = false

  checkAuthentication: ->
    authResource.get().$promise.then (res) =>
      if res.success
        @updateUser(res.user)

      return res

  isAuthenticated: ->
    @user.authentication
