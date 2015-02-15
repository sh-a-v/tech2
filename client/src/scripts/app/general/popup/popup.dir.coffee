app.directive 'popup', ->
  restrict: 'EA'
  controller: 'PopupCtrl'
  controllerAs: 'popup'
  scope: {}
  transclude: true
  templateUrl: 'general/popup.html'
  link: ($scope, el, attrs, popup) ->
    popupEl = el.children()
    contentEl = angular.element(popupEl[0].getElementsByClassName('popup-content-wrapper')[0])

    popup.view =
      initialize: ->
        @setEventListeners()

      setEventListeners: ->
        $scope.$on 'popup:activated', => @show()
        $scope.$on 'popup:deactivated', => @hide()

      show: ->
        Velocity contentEl, {scaleY: 0.1}, {duration: 1}

        Velocity contentEl, {
            scaleY: 1
          }, {
            duration: 250,
            begin: ->
              Velocity el, {opacity: 1}, {duration: 80, display: 'block'}
          }

      hide: ->
        Velocity contentEl, {
            scaleY: 0
          }, {
            duration: 200,
            complete: ->
              Velocity el, {opacity: 0}, {duration: 50, display: 'none'}
          }

    popup.view.initialize()
