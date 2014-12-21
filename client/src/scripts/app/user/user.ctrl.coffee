app.user.controller 'UserCtrl', ($rootScope, $scope, userService) ->
  userService.checkAuthentication();
