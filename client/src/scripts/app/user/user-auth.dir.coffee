app.user.directive 'userAuth', ->
  restrict: 'EA'
  require: '^popup'
  controller: 'UserAuthCtrl'
  controllerAs: 'userAuth'
  link: ($scope, el, attrs, popupCtrl) ->


    $scope.$on 'user:authActivate', => popupCtrl.activate()
    $scope.$on 'user:deactivate', => popupCtrl.deactivate()
    return
