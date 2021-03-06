// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.mesinfo', {
      url: '/mesinfo',
      views: {
        'menuContent': {
          templateUrl: 'templates/mesinfo.html'
        }
      }
    })
    .state('app.inicial', {
      url: '/inicial',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicial.html',
          //controller: 'PlaylistsCtrl'
        }
      }
    })
/*
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })*/;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicial');

  $("#newUser").on('submit', function (e) {

      // prevent default submit action
      e.preventDefault();

      var serialized = $(this).serializeArray(),
          obj = {};

      // build key-values
      $.each(serialized, function () {
          obj[this.name] = this.value;
      });

      // and the json string
      var json = JSON.stringify(obj);

      console.log(json);
      // send your data here...

  });
});
