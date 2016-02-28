

app.controller('ctrlStart', ['$scope', '$state', function($scope, $state ) {

    $scope.changeState = function (url) {
        $state.go('wood-of-skills', { class: url });
    };


}]);