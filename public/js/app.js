

var app = angular.module('bdo', [
    'ui.router',
	'ngAnimate'
])

.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'views/start.html',
                controller: 'ctrlStart'
            })
            .state('wood-of-skills', {
                url: '/skills',
                templateUrl: 'views/wood-of-skills.html',
                controller: 'ctrlWood-of-skills',
                params: {
                    class: null
                }
            });

        $urlRouterProvider.otherwise("/start");
    }
]);


