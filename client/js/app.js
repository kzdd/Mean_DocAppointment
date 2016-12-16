var appointmentsModule = angular.module('myApp', ['ngRoute']);

appointmentsModule.config(function($routeProvider){
	$routeProvider
	.when('/', {
		title: "Doctor's Appointments - Login",
		templateUrl: 'partials/login.html'
	})
	.when('/dashboard', {
		title: "Doctor's Appointments",
		templateUrl: 'partials/dashboard.html'
	})
	.when('/newAppointment', {
		title: "New Appointment",
		templateUrl: 'partials/newAppointment.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});


appointmentsModule.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
