//=======================================================
//client side: appointmentsController MEAN black belt
//=======================================================
appointmentsModule.controller('appointmentsController', function($scope, appointmentsFactory)
{
	//=======================================================
	//FUNCTION TO GET COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function getCookie(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}
	//=======================================================
	//Take the cookiename as parameter (cname).
	//Create a variable (name) with the text to search for (cname + "=").
	//Split document.cookie on semicolons into an array called ca (ca = document.cookie.split(';')).
	//Loop through the ca array (i=0;i<ca.length;i++), and read out each value c=ca[i]).
	//If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length,c.length).
	//If the cookie is not found, return "".
	//=======================================================

	//=======================================================
	//FUNCTION TO CHECK COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function checkCookie()
	{
		var username=getCookie("username");
		if (username == "")
		{
			window.location.assign("/");
		}
		else 
		{
			return username;
		}
	}
	//=======================================================
	//The parameters of the function above are the name of the cookie (cname), 
	//the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays).
	//The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
	//=======================================================
	
	//get current date, to be passed through scope
	//we will use it to compare to remove cancel buttons
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 
	today = mm+'/'+dd+'/'+yyyy;
	$scope.currentDate = today;

	//grabbing user name from cookies
	var user = checkCookie();

	//passing user to $scope to use
	$scope.user = user;

	//logout function
	$scope.logout = function() 
	{
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		window.location.assign("/");
	}

	//jquery methos for datepicker and timepicker used on add new appointment
    $( "#appt-date" ).datepicker({ minDate: 1});
    $('#appt-time').timepicker({ minTime: '8:00am',
								 maxTime: '5:00pm',
								 disableTextInput: true});

    //this will be used to get all appointments.
	$scope.appointments = [];
	
	var getAppointments = function()
	{
		appointmentsFactory.getAppointments(function(data)
		{
			$scope.appointments = data;
		});
	}

	getAppointments();


	//adds new appointments
	$scope.addNewAppt = function()
	{
		//validations before sending data over to factory
		if ($('#appt-date').val() == '')
		{
			$('#error').text('Must pick a date.');
			return;
		}
		if ($('#appt-time').val() == '')
		{
			$('#error').text('Must pick a time.');
			return;
		}
		if (angular.isDefined($scope.newAppt.complain) == false)
		{
			$('#error').text('Complain cannot be blank.');
			return;
		}
		if ($scope.newAppt.complain.length < 9)
		{
			$('#error').text('Complain must be at least 10 characters long. Please describe your complain more.');
			return;
		}

		//storing data to newAppt manually
		//because angular and jquery plugins are not friendly.
		$scope.newAppt.patient = user;
		$scope.newAppt.time = $('#appt-time').val();
		$scope.newAppt.date = $('#appt-date').val();
		appointmentsFactory.addNewAppt($scope.newAppt, function(result)
		{
			if (result.status == 'result')
			{
				$('#error').text(result.result);	
			}
		})
	}

	//function to cancel appointments
	$scope.destroyAppointment = function(appointment_id)
	{
		appointmentsFactory.destroyAppointment(appointment_id, function(result)
		{
			if (result.status == 'result')
			{
				$('#error').text(result.result);	
			}
			getAppointments();
		})
	}


	// setting scope as empty so that I can evaluate for empty items inside the addNewAppt function
	$scope.newAppt = {};
})