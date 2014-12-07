app.popup.factory 'popupService', ($rootScope) ->
  class PopupService
    active: false

    activate: ->
      @active = true

    deactivate: ->
      @active = false

    isActive: ->
      @active

  new PopupService()
