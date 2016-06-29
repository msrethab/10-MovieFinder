
// Creating routerApp module to house movie and other routing controllers

(function() {
    'use strict';

    var routerApp = angular.module('routerApp', ['ui.router','angularSpinner']);

    routerApp.config(function($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/home');
	    
	    $stateProvider
	        
	        // HOME STATES AND NESTED VIEWS ========================================
	        .state('home', {
	            url: '/home',
	            templateUrl: '../partials/partial-home.html',
	            controller: function(){
	            	$('.carousel').carousel({
	            		interval: 3000
	            	})

	            }
	        })
	        
	        // MULTIPLE ADDITIONAL STATES AND NESTED VIEWS =========================
	        .state('search', {
	            url: '/search/:movieSearch',
	            templateUrl: '../partials/partial-search.html',
	            controller: 'MovieController',
	            controllerAs: 'vm'
	        })

	        .state('detail', {
	            url: '/detail/:movieTitle?:movieYear',
	            templateUrl: '../partials/partial-detail.html',
	            controller: 'MovieDetailController',
	            controllerAs: 'vm'
	        })
	        
	});

})();