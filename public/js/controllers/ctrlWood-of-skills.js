
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