angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('hyperLoop', {
    url: '/Home',
    templateUrl: 'templates/hyperLoop.html',
    controller: 'hyperLoopCtrl'
  })

  .state('result', {
    url: '/result',
    templateUrl: 'templates/result.html',
    controller: 'resultCtrl'
  })

$urlRouterProvider.otherwise('/Home')

  

});