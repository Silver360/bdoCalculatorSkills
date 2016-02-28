

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





app.controller('ctrlStart', ['$scope', '$state', function($scope, $state ) {

    $scope.changeState = function (url) {
        $state.go('wood-of-skills', { class: url });
    };


}]);

app.controller('ctrlWood-of-skills', ['$scope', '$state', '$stateParams', 'factoryGetData', function($scope, $state, $stateParams, factoryGetData ) {


    $scope.skills = {};
    $scope.desc = {};

    var init = function(){

        factoryGetData.getData(function(data){
            $scope.skills = data;
        });

    };

    console.log('Klasa: ', $stateParams.class);

    $scope.changeState = function () {
        $state.go('start');
    };

    $scope.flowDesc = function(data){
        $scope.desc = data;
    };

    init();

}]);

app.factory('factoryGetData', ['$http', function( $http ){

    return {
        getJson : function(callback){
            $http.post('skills/warrior.json')
                .success(function(data){
                    callback(data.skillInfo)
                })
                .error(function(err){
                    callback(err)
                })
        },

        getData: function(callback){

            var skills = [];

            this.getJson( function(data){
                console.log('Data: ', data);

                for( key in data ){
                    skills.push(data.skill);
                }

                callback(skills);


            });

        }

    };

}]);