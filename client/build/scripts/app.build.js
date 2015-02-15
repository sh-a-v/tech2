(function() {
  'use strict';
  var app;

  app = angular.module('engineerium', ['ui.router', 'ngResource', 'ngTouch', 'user', 'filter']);

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
    $httpProvider.interceptors.push('requestsInterceptor');
  });

  app.urls = {
    api: '/api'
  };

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
      this.setEventListeners();
      return this.resize();
    };
    this.setEventListeners = function() {
      return angular.element($window).on('resize', (function(_this) {
        return function() {
          return _this.resize();
        };
      })(this));
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

  app.controller('HeaderControlsCtrl', function($rootScope, $scope, $timeout, appSizeService) {
    var headerControls;
    headerControls = {
      visible: true,
      collapsed: appSizeService.isPhone(),
      initialize: function() {
        return this.setEventListeners();
      },
      setEventListeners: function() {
        $rootScope.$on('app:resized', (function(_this) {
          return function() {
            if (appSizeService.isPhone()) {
              return _this.collapse();
            } else {
              return _this.expand();
            }
          };
        })(this));
        $rootScope.$on('popup:activated', (function(_this) {
          return function() {
            return _this.hide();
          };
        })(this));
        return $rootScope.$on('popup:deactivated', (function(_this) {
          return function() {
            return _this.show();
          };
        })(this));
      },
      expand: function() {
        if (this.isExpanded()) {
          return;
        }
        this.collapsed = false;
        this.broadcastHeaderControlsExpanded();
      },
      collapse: function() {
        if (this.isCollapsed()) {
          return;
        }
        this.collapsed = true;
        this.broadcastHeaderControlsCollapsed();
      },
      show: function() {
        return this.visible = true;
      },
      hide: function() {
        return this.visible = false;
      },
      isVisible: function() {
        return this.visible;
      },
      isExpanded: function() {
        return !this.collapsed;
      },
      isCollapsed: function() {
        return this.collapsed;
      },
      broadcastHeaderControlsExpanded: function() {
        $scope.$broadcast('headerControls:expanded');
        return $rootScope.$broadcast('headerControls:expanded');
      },
      broadcastHeaderControlsCollapsed: function() {
        $scope.$broadcast('headerControls:collapsed');
        return $rootScope.$broadcast('headerControls:collapsed');
      }
    };
    angular.extend(this, headerControls);
    return this.initialize();
  });

  app.directive('headerControls', function() {
    return {
      restrict: 'E',
      controller: 'HeaderControlsCtrl',
      controllerAs: 'headerControls',
      link: function($scope, el, attrs, headerControls) {
        var view;
        view = {
          initialize: function() {
            return this.setEventListeners();
          },
          setEventListeners: function() {
            $scope.$on('headerControls:expanded', (function(_this) {
              return function() {
                return _this.expand();
              };
            })(this));
            return $scope.$on('headerControls:collapsed', (function(_this) {
              return function() {
                return _this.collapse();
              };
            })(this));
          },
          expand: function() {
            if (el.hasClass('collapsed')) {
              return el.removeClass('collapsed').addClass('expanded');
            }
          },
          collapse: function() {
            if (el.hasClass('expanded')) {
              return el.removeClass('expanded').addClass('collapsed');
            }
          },
          hide: function() {
            return el.addClass('invisible');
          }
        };
        return view.initialize();
      }
    };
  });

  app.directive('header', function() {
    return {
      restrict: 'EA',
      link: function($scope, el, attrs) {}
    };
  });

  app.controller('LoadingCtrl', function($rootScope, $scope) {
    this.requestsCount = 0;
    this.initialize = function() {
      return this.setEventListeners();
    };
    this.setEventListeners = function() {
      $rootScope.$on('server:request', (function(_this) {
        return function() {
          return _this.addRequest();
        };
      })(this));
      return $rootScope.$on('server:response', (function(_this) {
        return function() {
          return _this.removeRequest();
        };
      })(this));
    };
    this.addRequest = function() {
      return this.requestsCount += 1;
    };
    this.removeRequest = function() {
      return this.requestsCount -= 1;
    };
    this.isOneRequest = function() {
      return this.requestsCount === 1;
    };
    this.isThereRequests = function() {
      return this.requestsCount;
    };
    return this.initialize();
  });

  app.directive('loading', function() {
    return {
      restrict: 'A',
      controller: 'LoadingCtrl',
      controllerAs: 'loading',
      link: function($scope, el, attrs, loading) {}
    };
  });

  app.controller('MenuCtrl', function($rootScope, $scope, appSizeService) {
    this.collapsed = !appSizeService.isDesktop();
    this.initialize = function() {
      return this.setEventListeners();
    };
    this.setEventListeners = function() {
      return $rootScope.$on('app:resized', (function(_this) {
        return function() {
          if (appSizeService.isDesktop()) {
            return _this.expand();
          } else {
            return _this.collapse();
          }
        };
      })(this));
    };
    this.toggle = function() {
      if (appSizeService.isDesktop()) {
        return;
      }
      if (this.isCollapsed()) {
        return this.expand();
      } else {
        return this.collapse();
      }
    };
    this.expand = function() {
      if (this.isExpanded()) {
        return;
      }
      this.collapsed = false;
      this.broadcastMenuExpanded();
      return this.view.show();
    };
    this.collapse = function() {
      if (this.isCollapsed()) {
        return;
      }
      this.collapsed = true;
      this.broadcastMenuCollapsed();
      return this.view.hide();
    };
    this.isExpanded = function() {
      return !this.collapsed;
    };
    this.isCollapsed = function() {
      return this.collapsed;
    };
    this.broadcastMenuExpanded = function() {
      return $rootScope.$broadcast('menu:expanded');
    };
    this.broadcastMenuCollapsed = function() {
      return $rootScope.$broadcast('menu:collapsed');
    };
    return this.initialize();
  });

  app.directive('menu', function() {
    return {
      restrict: 'EA',
      controller: 'MenuCtrl',
      controllerAs: 'menu',
      link: function($scope, el, attrs, menu) {
        var menuItemEls;
        menuItemEls = el.find('li');
        return menu.view = {
          show: function() {
            var index, menuItemEl, meta, style, _i, _len, _results;
            style = {
              left: 0
            };
            meta = {
              duration: 150,
              display: 'block',
              easing: 'easy-in'
            };
            menuItemEls.css('left', '-100%');
            Velocity(el, style, meta);
            _results = [];
            for (index = _i = 0, _len = menuItemEls.length; _i < _len; index = ++_i) {
              menuItemEl = menuItemEls[index];
              _results.push(Velocity(menuItemEl, style, {
                duration: 150 + (80 * index),
                easing: 'easy-in'
              }));
            }
            return _results;
          },
          hide: function() {
            var meta, style;
            style = {
              left: -200 + 'px'
            };
            meta = {
              duration: 300,
              display: 'none',
              easing: 'easy-out'
            };
            return Velocity(el, style, meta);
          }
        };
      }
    };
  });

  app.controller('PopupCtrl', function($rootScope, $scope) {
    var popup;
    popup = {
      active: false,
      activate: function() {
        this.active = true;
        return this.broadcastPopupActivated();
      },
      deactivate: function() {
        this.active = false;
        return this.broadcastPopupDeactivated();
      },
      stopPropagation: function($event) {
        $event.stopPropagation();
        return $event.preventDefault();
      },
      isActive: function() {
        return this.active;
      },
      broadcastPopupActivated: function() {
        $scope.$broadcast('popup:activated');
        return $rootScope.$broadcast('popup:activated');
      },
      broadcastPopupDeactivated: function() {
        $scope.$broadcast('popup:deactivated');
        return $rootScope.$broadcast('popup:deactivated');
      }
    };
    return angular.extend(this, popup);
  });

  app.directive('popup', function() {
    return {
      restrict: 'EA',
      controller: 'PopupCtrl',
      controllerAs: 'popup',
      scope: {},
      transclude: true,
      templateUrl: 'general/popup.html',
      link: function($scope, el, attrs, popup) {
        var contentEl, popupEl, view;
        popupEl = el.children();
        contentEl = angular.element(popupEl[0].getElementsByClassName('popup-content')[0]);
        view = {
          initialize: function() {
            return this.setEventListeners();
          },
          setEventListeners: function() {
            $scope.$on('popup:activated', (function(_this) {
              return function() {
                return _this.show();
              };
            })(this));
            return $scope.$on('popup:deactivated', (function(_this) {
              return function() {
                return _this.hide();
              };
            })(this));
          },
          show: function() {
            Velocity(contentEl, {
              scaleY: 0.1
            }, {
              duration: 1
            });
            return Velocity(contentEl, {
              scaleY: 1
            }, {
              duration: 250,
              begin: function() {
                return Velocity(el, {
                  opacity: 1
                }, {
                  duration: 80,
                  display: 'block'
                });
              }
            });
          },
          hide: function() {
            return Velocity(contentEl, {
              scaleY: 0
            }, {
              duration: 200,
              complete: function() {
                return Velocity(el, {
                  opacity: 0
                }, {
                  duration: 50,
                  display: 'none'
                });
              }
            });
          }
        };
        return view.initialize();
      }
    };
  });

  app.filter = angular.module('filter', []);

  app.user = angular.module('user', []);

  app.filter.directive('filterControl', function() {
    return {
      restrict: 'EA',
      controller: 'FilterCtrl',
      controllerAs: 'filter',
      link: function($scope, el, attrs) {}
    };
  });

  app.filter.directive('filterGenres', function() {
    return {
      restrict: 'EA',
      require: '^popup',
      link: function($scope, el, attrs, popup) {}
    };
  });

  app.filter.controller('FilterCtrl', function($rootScope, $scope) {
    this.initialize = function() {
      return this.setEventListeners();
    };
    this.setEventListeners = function() {};
    this.activate = function() {};
    return this.initialize();
  });

  app.factory('requestsInterceptor', function($rootScope, $q) {
    var interceptor, serverBroadcast;
    serverBroadcast = {
      broadcastServerRequest: function() {
        return $rootScope.$emit('server:request');
      },
      broadcastServerResponse: function() {
        return $rootScope.$emit('server:response');
      },
      broadcastServerError: function() {
        return $rootScope.$emit('server:error');
      }
    };
    interceptor = {
      request: function(config) {
        serverBroadcast.broadcastServerRequest();
        return config;
      },
      response: function(response) {
        serverBroadcast.broadcastServerResponse();
        return response;
      },
      responseError: function(response) {
        serverBroadcast.broadcastServerResponse();
        serverBroadcast.broadcastServerError();
        return $q.reject(response);
      }
    };
    return interceptor;
  });

  app.user.directive('userAuth', function() {
    return {
      restrict: 'EA',
      require: '^popup',
      link: function($scope, el, attrs, popupCtrl) {
        console.log(popupCtrl);
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
      controllerAs: 'user',
      link: function($scope, el, attrs) {}
    };
  });

  app.user.directive('userProfile', function() {
    return {
      restrict: 'EA',
      require: '^popup',
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
