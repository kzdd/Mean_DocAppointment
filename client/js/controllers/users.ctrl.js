//=======================================================
//client side: usersController MEAN black belt
//=======================================================
appointmentsModule.controller('usersController', function($scope, usersFactory)
{
	//need to set a cookie to keep track of the user logged in

	//=======================================================
	//FUNCTION TO SET COOKIE (from w3schools)
	//http://www.w3schools.com/js/js_cookies.asp
	//=======================================================
	function setCookie(cname, cvalue, exdays)
	{
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	//=======================================================
	//The parameters of the function above are the name of the cookie (cname), 
	//the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays).
	//The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
	//=======================================================

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
		if (username!="")
		{
			window.location.assign("/#/dashboard");
			// redirectTo('/dashboard');
		}
		else 
		{
			// console.log('no cookie');
		}
	}
	//=======================================================
	//The parameters of the function above are the name of the cookie (cname), 
	//the value of the cookie (cvalue), and the number of days until the cookie should expire (exdays).
	//The function sets a cookie by adding together the cookiename, the cookie value, and the expires string.
	//=======================================================
	
	checkCookie();

	//function used to check if user exists in db
	var checkUserExists = function(name, callback)
	{
		usersFactory.checkUserExists(name, callback);
	}

	//function to add new user
	$scope.addUser = function() 
	{
		var check = $scope.newUser;
		if(angular.isDefined($scope.newUser.username) == false)
		{
			$('#error').text('Name field cannot be empty.');
			return;
		} 
		else
		{
			checkUserExists($scope.newUser.username, function(result)
			{
				var nameToTest = '';
				if(!jQuery.isEmptyObject(result))
				{
					nameToTest = result[0].username;
				}
				if (nameToTest == $scope.newUser.username)
				{
					setCookie("username", $scope.newUser.username, 30);
					window.location.assign("/#/dashboard");
				}
				else 
				{
					usersFactory.addUser($scope.newUser, function(result)
					{
						if(result.status == 'failed')
						{
							$('#error').text(result.err.errors.username.message);
						}
						else 
						{
							setCookie("username", $scope.newUser.username, 30);
							window.location.assign("/#/dashboard");
						}
					});	
				}
			});
		} 
	}

	// setting scope as empty so that I can evaluate for empty items inside the addUser function
	$scope.newUser = {};
})