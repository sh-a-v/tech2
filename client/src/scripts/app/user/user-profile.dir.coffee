app.user.directive 'userProfile', ->
  restrict: 'EA'
  require: '^popup'
  controller: 'UserProfileCtrl'
  controllerAs: 'userProfileCtrl'
  link: ($scope, el, attrs, popupCtrl) ->
    $scope.$on 'user:profileActivate', => popupCtrl.activate()
    return
