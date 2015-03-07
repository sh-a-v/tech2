app.directive 'menu', () ->
  restrict: 'EA'
  controller: 'MenuCtrl'
  controllerAs: 'menu'
  link: ($scope, el, attrs, menu) ->
    menuItemEls = el.find 'li'

    menu.view =
      show: ->
        style =
          left: 0

        meta =
          duration: 150
          display: 'block'
          easing: 'easy-in'

        menuItemEls.css 'left', '-100%'
        Velocity el, style, meta

        for menuItemEl, index in menuItemEls
          Velocity menuItemEl, style, {duration: 150 + (80 * index), easing: 'easy-in'}


      hide: ->
        style =
          left: -200 + 'px'

        meta =
          duration: 300
          display: 'none'
          easing: 'easy-out'

        Velocity el, style, meta
