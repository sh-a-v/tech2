(function() {
  'use strict';
  var app;

  app = angular.module('engineerium', ['ui.router', 'ngResource', 'ngTouch', 'popup', 'user']);

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

  app.urls = {
    api: 'http://api.engineerium.io:1337'
  };

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

  app.user = angular.module('user', []);

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

  app.user.controller('UserControlCtrl', function($rootScope, $scope) {});

  app.user.directive('userControl', function() {
    return {
      restrict: 'EA',
      controller: 'UserCtrl',
      link: function($scope, el, attrs) {}
    };
  });

  app.user.controller('UserCtrl', function($rootScope, $scope, userService) {
    return userService.checkAuthentication();
  });

  app.user.factory('authResource', function($resource) {
    return $resource(app.urls.api + '/auth/', null, {
      update: {
        method: 'PUT'
      }
    });
  });

  app.user.service('userService', function($rootScope, authResource) {
    return {
      user: {
        authentication: false
      },
      updateUser: function(user) {
        return this.user = angular.extend(user, this.user);
      },
      authenticate: function(email, password) {
        return authResource.save().$promise.then((function(_this) {
          return function(res) {
            if (res.success) {
              _this.updateUser(res.user);
            }
            return res;
          };
        })(this));
      },
      deauthenticate: function() {
        return this.user.authentication = false;
      },
      checkAuthentication: function() {
        return authResource.get().$promise.then((function(_this) {
          return function(res) {
            if (res.success) {
              _this.updateUser(res.user);
            }
            return res;
          };
        })(this));
      },
      isAuthenticated: function() {
        return this.user.authentication;
      }
    };
  });

}).call(this);
