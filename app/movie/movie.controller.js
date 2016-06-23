

(function() {
    'use strict';

    angular
        .module('routerApp')
        .controller('MovieController', MovieController);

    MovieController.$inject = ['MovieFactory'];

    /* @ngInject */
    function MovieController(MovieFactory) {
        var vm = this;
        vm.title = 'MovieController';
        vm.getMovie = getMovie;

        activate();

        ////////////////

        function activate() {
        	MovieFactory.getMovie('Batman')
				.then(function(response) {

					vm.movieInfo = response.data;

					toastr.success('Movie Data Loaded!');

            },
            function(error){
                if(typeof error === 'object'){
                    toastr.error('There was an error: ' + error.data);  
                } else{
                    toastr.error(error);
                }     
            })

        }

        function getMovie(movieSearch){
        	MovieFactory.getMovie(movieSearch)
				.then(function(response) {

					vm.movieInfo = response.data;

					// if(vm.movieInfo.data.Poster === "N/A"){
					// 	vm.movieInfo.data.Poster = "/../../img/no_poster_available.jpg"
					// }

					toastr.success('Movie Data Loaded!');

            },
            function(error){
                if(typeof error === 'object'){
                    toastr.error('There was an error: ' + error.data);  
                } else{
                    toastr.error(error);
                }     
            })
        }
    }
})();