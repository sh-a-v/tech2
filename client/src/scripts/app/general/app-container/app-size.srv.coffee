app.service 'appSizeService', ($rootScope) ->
  minDesktopWidth: 1025

  minTabletWidth: 600
  maxTabletWidth: 1024

  minPhoneWidth: 0
  maxPhoneWidth: 599

  size:
    width: 0
    height: 0

  updateSize: (width, height) ->
    @size.width = width
    @size.height = height

  getSize: ->
    @size

  isDesktop: ->
    @size.width >= @minDesktopWidth

  isTablet: ->
    @size.width >= @minTabletWidth && @size.width <= @maxTabletWidth

  isPhone: ->
    @size.width <= @maxPhoneWidth
