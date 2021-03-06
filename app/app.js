(function() {
	'use strict';

	angular
		.module('app', ['ui.router', 'ngMaterial', 'ui.bootstrap'])
		.config(config)
		.run(run);

	function config($stateProvider, $urlRouterProvider) {
		//default route
		$urlRouterProvider.otherwise("/internships");

		$stateProvider
			.state('calendar', {
				url: '/calendar',
				templateUrl: 'calendar/index.html',
				controller: 'Calendar.IndexController',
				controllerAs: 'vm',
				data: { activeTab: 'calendar' }
			})
			.state('account', {
				url: '/account',
				templateUrl: 'account/index.html',
				controller: 'Account.IndexController',
				controllerAs: 'vm',
				data: { activeTab: 'account' }
			})
			.state('internships', {
				url: '/internships',
				templateUrl: 'internships/index.html',
				controller: 'Internships.IndexController',
				controllerAs : 'vm',
				data: { activeTab: 'internships' }
			})
			.state('offers', {
				url: '/offers',
				templateUrl: 'offers/index.html',
				controller: 'Offers.IndexController',
				controllerAs : 'vm',
				data: { activeTab: 'offers' }
			})
			.state('discover', {
				url: '/discover',
				templateUrl: 'discover/index.html',
				controller: 'Discover.IndexController',
				controllerAs : 'vm',
				data: { activeTab: 'discover' }
			});
	}
	function run($http, $rootScope, $window) {
		// add JWT token as default auth header
		$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

		//update active tab on state change
		$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			$rootScope.activeTab = toState.data.activeTab;
		});
	}
	$(function () {
		// get JWT token from server
		$.get('/app/token', function(token) {
			window.jwtToken = token;
			angular.bootstrap(document, ['app']);
		});
	});
})();