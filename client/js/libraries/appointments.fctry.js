//=======================================================
//appointmentsFactory -- MEAN black belt
//=======================================================
appointmentsModule.factory('appointmentsFactory', function($http)
{
	var factory = {};

	factory.checkUserExists = function (name, callback)
	{
		$http.post('/checkUserExists/'+ name).success(function(output){ callback(output); });
	}

	factory.addNewAppt = function(data, callback)
	{
		$http.post('/addNewAppt', data).success(function(output){ callback(output); });
	}

	factory.getAppointments = function(callback)
	{
		$http.get('/getAppointments').success(function(output){ callback(output); });
	}

	factory.destroyAppointment = function(id, callback)
	{
		$http.delete('/destroyAppointment/' + id).success(function(output){ callback(output); });
	}

	return factory;
});