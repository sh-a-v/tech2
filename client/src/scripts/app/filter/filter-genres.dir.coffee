app.filter.directive 'filterGenres', ->
  restrict: 'EA'
  require: '^popup'
  link: ($scope, el, attrs, popup) ->
