app.user.directive 'userAuth', ->
  restrict: 'EA'
  require: '^popup'
  link: ($scope, el, attrs, popupCtrl) ->
    $scope.$on 'user:authActivate', => popupCtrl.activate()
    return
