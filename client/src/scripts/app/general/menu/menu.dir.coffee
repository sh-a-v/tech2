app.directive 'menu', () ->
  restrict: 'EA'
  templateUrl: 'menu.html'
  controller: 'MenuCtrl'
  link: (scope, el, attrs) ->
    return
