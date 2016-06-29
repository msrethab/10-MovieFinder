//Creating Movie Details Controller to handle pulling up specific movie descriptions

(function() {
    'use strict';

    angular
        .module('routerApp')
        .controller('MovieDetailController', MovieDetailController);

    MovieDetailController.$inject = ['MovieFactory', '$state', '$stateParams'];

    /* @ngInject */
    function MovieDetailController(MovieFactory, $state, $stateParams) {
        var vm = this;
        vm.title = 'MovieDetailController';

        //Defining loading show/hide variable as well as $state parameters being passed into search state
        vm.loading = true;
        var movieTitle = $stateParams.movieTitle;
        var movieYear = $stateParams.movieYear;

        vm.state = $state.current
        vm.params = $stateParams;

        vm.getMovieDetail = getMovieDetail;

        activate();

        ////////////////

        //Initializing each state change by attempting to search for the particular movieTitle passed in through $stateParams
        function activate() {
            MovieFactory.getMovieDetail(movieTitle, movieYear)
                .then(function(response) {

                        vm.movieDetail = response.data;
                        vm.loading = false;
                        toastr.success('Movie Details Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                            vm.loading = false;
                        } else {
                            toastr.error(error);
                            vm.loading = false;
                        }
                    })
        }

        //Defining function to get Movie Details when passed a specific title
        function getMovieDetail(movieTitle, movieYear) {
            MovieFactory.getMovieDetail(movieTitle, movieYear)
                .then(function(response) {

                        vm.movieDetail = response.data;

                        toastr.success('Movie Details Loaded!');

                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.error(error);
                        }
                    })

        }
    }
})();
