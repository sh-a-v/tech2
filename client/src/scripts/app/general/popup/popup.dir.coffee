app.directive 'popup', ->
  restrict: 'EA'
  controller: 'PopupCtrl'
  controllerAs: 'popupCtrl'
  scope: {}
  transclude: true
  templateUrl: 'general/popup.html'
  link: ($scope, el, attrs) ->
    show = ->
      console.log 'el', el


    $scope.$on('popup:activated', -> show())
    return
