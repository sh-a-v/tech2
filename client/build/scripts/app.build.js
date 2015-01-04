(function() {
  'use strict';
  var app;

  app = angular.module('engineerium', ['ui.router', 'ngResource', 'ngTouch', 'user']);

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

  app.controller('HeaderControlsCtrl', function($rootScope, $scope) {});

  app.directive('HeaderControls', function() {
    return {
      restrict: 'E',
      controller: 'HeaderControlsCtrl',
      link: function(scope, el, attrs) {}
    };
  });

  app.controller('AppContainerCtrl', function($rootScope, $scope, $window) {
    this.initialize = function() {
      return this.setEventListeners();
    };
    this.setEventListeners = function() {};
    return this.initialize();
  });

  app.directive('appContainer', function() {
    return {
      restrict: 'EA',
      controller: 'AppContainerCtrl',
      controllerAs: 'app',
      link: function(scope, el, attrs) {}
    };
  });

  app.controller('AppSizeCtrl', function($rootScope, $scope, $window, appSizeService) {
    this.initialize = function() {
      return this.setEventListeners();
    };
    this.setEventListeners = function() {
      return angular.element($window).on('resize', this.resize);
    };
    this.resize = function() {
      appSizeService.updateSize($window.innerWidth, $window.innerHeight);
      return this._broadcastAppResized();
    };
    this._broadcastAppResized = function() {
      return $rootScope.$broadcast('app:resized');
    };
    return this.initialize();
  });

  app.directive('appSize', function() {
    return {
      restrict: 'A',
      controller: 'AppSizeCtrl',
      controllerAs: 'appSize',
      link: function($scope, el, attrs) {}
    };
  });

  app.service('appSizeService', function($rootScope) {
    return {
      minDesktopWidth: 1025,
      minTabletWidth: 600,
      maxTabletWidth: 1024,
      minPhoneWidth: 0,
      maxPhoneWidth: 599,
      size: {
        width: 0,
        height: 0
      },
      updateSize: function(width, height) {
        this.size.width = width;
        return this.size.height = height;
      },
      getSize: function() {
        return this.size;
      },
      isDesktop: function() {
        return this.size.width >= this.minDesktopWidth;
      },
      isTablet: function() {
        return this.size.width >= this.minTabletWidth && this.size.width <= this.maxTabletWidth;
      },
      isPhone: function() {
        return this.size.width <= this.maxPhoneWidth;
      }
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

  app.controller('PopupCtrl', function($rootScope, $scope) {
    this.active = false;
    this.activate = function() {
      this.active = true;
      return this._broadcastPopupActivated();
    };
    this.deactivate = function() {
      this.active = false;
      return this._broadcastPopupDeactivated();
    };
    this.stopPropagation = function($event) {
      $event.stopPropagation();
      return $event.preventDefault();
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

  app.directive('popup', function() {
    return {
      restrict: 'EA',
      controller: 'PopupCtrl',
      controllerAs: 'popup',
      scope: {},
      transclude: true,
      templateUrl: 'general/popup.html',
      link: function($scope, el, attrs) {
        var show;
        show = function() {
          return console.log('el', el);
        };
        $scope.$on('popup:activated', show);
      }
    };
  });

  app.user = angular.module('user', []);

  app.user.controller('UserAuthCtrl', function($rootScope, $scope) {
    return this.activate = function() {
      return console.log('yeeeeee');
    };
  });

  app.user.directive('userAuth', function() {
    return {
      restrict: 'EA',
      require: '^popup',
      controller: 'UserAuthCtrl',
      controllerAs: 'userAuthCtrl',
      link: function($scope, el, attrs, popupCtrl) {
        $scope.$on('user:authActivate', (function(_this) {
          return function() {
            return popupCtrl.activate();
          };
        })(this));
      }
    };
  });

  app.user.directive('userControl', function() {
    return {
      restrict: 'EA',
      controller: 'UserCtrl',
      controllerAs: 'userCtrl',
      templateUrl: 'user/user-control.html',
      link: function($scope, el, attrs) {}
    };
  });

  app.user.controller('UserProfileCtrl', function($rootScope, $scope) {});

  app.user.directive('userProfile', function() {
    return {
      restrict: 'EA',
      require: '^popup',
      controller: 'UserProfileCtrl',
      controllerAs: 'userProfileCtrl',
      link: function($scope, el, attrs, popupCtrl) {
        $scope.$on('user:profileActivate', (function(_this) {
          return function() {
            return popupCtrl.activate();
          };
        })(this));
      }
    };
  });

  app.user.controller('UserCtrl', function($rootScope, $scope, userService) {
    this.initialize = function() {
      this.setEventListeners();
      return userService.checkAuthentication();
    };
    this.setEventListeners = function() {
      return $rootScope.$on('user:activate', this.activate);
    };
    this.activate = function() {
      if (userService.isAuthenticated()) {
        return this._broadcastUserProfileActivate();
      } else {
        return this._broadcastUserAuthActivate();
      }
    };
    this._broadcastUserAuthActivate = function() {
      return $scope.$broadcast('user:authActivate');
    };
    this._broadcastUserProfileActivate = function() {
      return $scope.$broadcast('user:profileActivate');
    };
    return this.initialize();
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
