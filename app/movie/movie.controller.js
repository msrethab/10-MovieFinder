//Creating Movie controller to handle movie search and results

(function() {
    'use strict';

    angular
        .module('routerApp')
        .controller('MovieController', MovieController);

    MovieController.$inject = ['MovieFactory', '$state', '$stateParams'];

    /* @ngInject */
    function MovieController(MovieFactory, $state, $stateParams) {
        var vm = this;
        vm.title = 'MovieController';

        //Defining loading show/hide variable as well as $state parameters being passed into search state
        vm.loading = true;
        var movieSearch = $stateParams.movieSearch;

        vm.state = $state.current;
        vm.params = $stateParams;

        vm.getMovie = getMovie;
        vm.onFormSubmit = onFormSubmit;

        activate();

        ////////////////

        //Initializing each controller state change by searching if there is a search string

        function activate() {
            if (typeof movieSearch === 'string') {
                vm.getMovie(movieSearch);
            }
        }

        //Defining functions for getting movies as well as submitting forms to allow users to hit enter and search

        function getMovie(movieSearch) {
            MovieFactory.getMovie(movieSearch)
                .then(function(response) {

                        vm.movieSearchResult = response.data;
                        vm.loading = false;

                        toastr.success('Movie Data Loaded!');

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

        function onFormSubmit(movieSearch) {
            $state.go('search', { 'movieSearch': movieSearch });
        }
    }
})();
