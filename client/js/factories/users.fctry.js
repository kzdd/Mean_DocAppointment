//=======================================================
//usersFactory -- MEAN black belt
//=======================================================
appointmentsModule.factory('usersFactory', function($http)
{
	var factory = {};

	factory.checkUserExists = function (name, callback)
	{
		$http.post('/checkUserExists/'+ name).success(function(output){ callback(output); });
	}

	factory.addUser = function(data, callback)
	{
		$http.post('/addUser', data).success(function(output){ callback(output); });
	}

	return factory;
});