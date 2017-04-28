var LoquiApp = angular.module( 'Loqui', [ 'ngRoute', 'ngResource'] );

beersBeatsApp.config( [ '$routeProvider',
    function( $routeProvider ) {
        $routeProvider.
        when( '/', { // INITAL PAGE LOAD ONLY
            templateUrl: 'partials/landingView.html',
            controller: 'homeCtrl'
        } ).
        when( '/home', {
            templateUrl: 'partials/landingView.html',
            controller: 'searchCtrl'
        } ).
        when( '/search', {
            templateUrl: 'partials/searchView.html',
            controller: 'searchCtrl'
        } ).
        when( '/profile', {
            templateUrl: 'partials/profileView.html',
            controller: 'profileCtrl'
        } ).
        otherwise( {
            redirectTo: '/home'
        } );
    }
] );