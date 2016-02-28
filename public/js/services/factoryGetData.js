
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