
(function() {
    'use strict';

    angular
        .module('routerApp')
        .factory('MovieFactory', MovieFactory);

    MovieFactory.$inject = ['$http','$q'];

    /* @ngInject */
    function MovieFactory($http, $q) {
        var service = {
            getMovie: getMovie
        };
        return service;

        ////////////////

        function getMovie(movieSearch) {

        	var defer = $q.defer();

        	$http({
                method: 'GET',
                url: 'http://www.omdbapi.com/',
                params:{ 
                	s: movieSearch,
                	plot: 'short',
                	type: 'movie',
                }
            }).then(function(response){
                if (response.status === 200 && response.data.Response ==='True'){
                    defer.resolve(response);
                } else{
                    defer.reject("Movie search returned no results!");
                }              
            },
            function(error){
                defer.reject(error);
            });

            return defer.promise;
        }
    }
})();