(function() {
  'use strict';
  var app;

  app = angular.module('engineerium', ['ui.router', 'ngResource', 'ngTouch', 'popup']);

  app.config(function($stateProvider, $locationProvider, $resourceProvider, $httpProvider) {
    $stateProvider.state('index', {
      url: '/',
      title: 'Engineerium'
    }).state('cabinet', {
      url: '/cabinet',
      title: 'Кабинет'
    }).state('catalog', {
      url: '/catalog',
      title: 'Каталог'
    }).state('search', {
      url: '/search',
      title: 'Поиск'
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

  app.controller('MenuCtrl', function($scope) {});

  app.directive('menu', function() {
    return {
      restrict: 'EA',
      controller: 'MenuCtrl',
      scope: {},
      link: function(scope, el, attrs) {}
    };
  });

  app.controller('HeaderControlsCtrl', function($rootScope, $scope) {});

  app.directive('HeaderControls', function() {
    return {
      restrict: 'E',
      controller: 'HeaderControlsCtrl',
      link: function(scope, el, attrs) {}
    };
  });

  app.popup = angular.module('popup', []);

  app.popup.controller('PopupCtrl', function($rootScope, $scope, popupService) {
    this.service = popupService;
    this.active = this.service.active;
    this.activate = function() {
      this.active = true;
      this._broadcastPopupActivated();
      return console.log('activate');
    };
    this.deactivate = function() {
      this.active = false;
      return this._broadcastPopupDeactivated();
    };
    this.isActive = function() {
      return this.active;
    };
    this._broadcastPopupActivated = function() {
      return $scope.$broadcast('popup:activated');
    };
    this._broadcastPopupDeactivated = function() {
      return $scope.$broadcast('popup:deactivated');
    };
  });

  app.popup.directive('popup', function() {
    return {
      restrict: 'E',
      controller: 'PopupCtrl',
      link: function(scope, el, attrs) {}
    };
  });

  app.popup.factory('popupService', function($rootScope) {
    var PopupService;
    PopupService = (function() {
      function PopupService() {}

      PopupService.prototype.active = false;

      PopupService.prototype.activate = function() {
        return this.active = true;
      };

      PopupService.prototype.deactivate = function() {
        return this.active = false;
      };

      PopupService.prototype.isActive = function() {
        return this.active;
      };

      return PopupService;

    })();
    return new PopupService();
  });

}).call(this);
