app.user.directive 'userAuth', ->
  restrict: 'EA'
  require: '^popup'
  controller: 'UserAuthCtrl'
  controllerAs: 'userAuthCtrl'
  link: ($scope, el, attrs, popupCtrl) ->
    $scope.$on 'user:authActivate', => popupCtrl.activate()
    return
