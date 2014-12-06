'use strict'

app = angular.module 'app', ['ui.router', 'ngResource', 'ngTouch']

app.config ($stateProvider, $locationProvider, $resourceProvider, $httpProvider) ->
  $stateProvider
    .state 'index',
      url: '/'
      title: 'Engineerium'

    .state 'cabinet',
      url: '/cabinet'
      title: 'Кабинет'

    .state 'catalog',
      url: '/catalog'
      title: 'Каталог'

    .state 'search',
      url: '/search'
      title: 'Поиск'

  $locationProvider
    .html5Mode
      enabled: true
      requireBase: false

  $resourceProvider
    .defaults.stripTrailingSlashes = true

  return
