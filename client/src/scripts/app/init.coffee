'use strict'

app = angular.module 'app', ['ui.router', 'ngResource', 'ngTouch']

app.config ($stateProvider, $locationProvider, $resourceProvider, $httpProvider) ->
  $stateProvider
    .state 'index',
      url: '/'
      title: 'Engineerium'

    .state 'catalog',
      url: '/catalog'
      title: 'Каталог'

    .state 'collections',
      url: '/collections'
      title: 'Коллекции'

  $locationProvider
    .html5Mode
      enabled: true
      requireBase: false

  $resourceProvider
    .defaults.stripTrailingSlashes = true

  return
