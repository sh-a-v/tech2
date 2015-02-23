app.user.directive 'userProfile', ->
  restrict: 'EA'
  require: '^popup'
  link: ($scope, el, attrs, popupCtrl) ->
    $scope.$on 'user:profileActivate', => popupCtrl.activate()
    $scope.$on 'user:deactivate', => popupCtrl.deactivate()
    return
