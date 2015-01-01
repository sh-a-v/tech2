app.user.factory 'authResource', ($resource) ->
  $resource app.urls.api + '/auth/',
    null,
    update:
      method: 'PUT'
