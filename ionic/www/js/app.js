(function() {

var app = angular.module('wingme', ['ionic', 'wingme.config', 'wingme.authentication', 'wingme.controllers', 'wingme.services', 'firebase']);

app.run(run);
app.config(routes);

// register dependencies
angular.module('wingme.config', []);
angular.module('wingme.authentication', []);
angular.module('wingme.controllers', []);
angular.module('wingme.services', []);

// --------------------------------------
// --------------------------------------

function run($ionicPlatform, $rootScope, $state, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // default view to tab.addWing
    // if user has no token, it will go to login.
    $state.go('tab.addWing');
  });

  // on state changes, we check for authentication!
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if (toState.url === '/findMatch' || toState.url === '/myMatches') {
      console.log('broadcasting event');
      $rootScope.$broadcast('rerender');
    }

    if (toState.authenticate && !Auth.isAuthed()) {
      // User isn’t authenticated
      event.preventDefault();
      $state.go('login');

    }
  });

}

function routes($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('landing', {
    cache: false,
    url: '/landing',
    templateUrl: 'templates/page-landing.html',
    controller: 'LandingCtrl as landing'
  })

  .state('signup', {
    cache: false,
    url: '/signup',
    templateUrl: 'templates/page-signup.html',
    controller: 'SignUpCtrl as signup'
  })

  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/page-login.html',
    controller: 'LoginCtrl as login'
  })

  .state('chat', {
    cache: false,
    url: '/chat',
    templateUrl: 'templates/page-chat.html',
    controller: 'ChatCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    cache: false,
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.profile',{
    cache: false,
    url: '/profile',
    authenticate: true,
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl as profile'
      }
    }
  })

  .state('tab.addWing', {
    cache: false,
    url: '/addWing',
    authenticate: true,
    views: {
      'tab-addWing': {
        templateUrl: 'templates/tab-addWing.html',
        controller: 'AddWingCtrl as addWing'
      }
    }
  })

  .state('tab.myWings', { // my wings
      cache: false,
      url: '/myWings',
      authenticate: true,
      views: {
        'tab-myWings': {
          templateUrl: 'templates/tab-myWings.html',
          controller: 'WingRequestsCtrl as myWings'
        }
      }
    })

  .state('tab.findMatch', {
    cache: false,
    url: '/findMatch',
    authenticate: true,
    views: {
      'tab-findMatch': {
        templateUrl: 'templates/tab-findMatch.html',
        controller: 'FindMatchCtrl as findMatch'
      }
    }
  })

  .state('tab.myMatches', {
    cache: false,
    url: '/myMatches',
    authenticate: true,
    views: {
      'tab-myMatches': {
        templateUrl: 'templates/tab-myMatches.html',
        controller: 'MyMatchesCtrl as myMatches'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');

}

})(); // end
