(function() {
  'use strict';
  var app;

  app = angular.module('app', ['ui.router', 'ngResource', 'ngTouch']);

  app.config(function($stateProvider, $locationProvider, $resourceProvider, $httpProvider) {
    $stateProvider.state('index', {
      url: '/',
      title: 'Engineerium'
    }).state('catalog', {
      url: '/catalog',
      title: 'Каталог'
    }).state('collections', {
      url: '/collections',
      title: 'Коллекции'
    });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $resourceProvider.defaults.stripTrailingSlashes = true;
  });

  app.controller('AppContainerCtrl', function($scope) {});

  app.directive('appContainer', function() {
    return {
      restrict: 'EA',
      controller: 'AppContainerCtrl',
      link: function(scope, el, attrs) {}
    };
  });

}).call(this);
