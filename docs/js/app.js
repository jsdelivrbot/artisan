/* global angular */

(function() {
    "use strict";

    var app = angular.module('app', ['ngSanitize', 'artisan', 'jsonFormatter']);

}());
/* global angular */

(function() {
    "use strict";

    var app = angular.module('app');

    app.service('Api', ['WebApi', '$promise',
        function(WebApi, $promise) {

            var service = {
                navs: {
                    main: function() {
                        return WebApi.get('/navs/main.js'); // promise
                    },
                },
                docs: {
                    id: function(id) {
                        return WebApi.get('/docs/' + id + '.js'); // promise
                    },
                    url: function(url) {
                        url = url.split('/').join('-');
                        return WebApi.get('/docs/' + url + '.js'); // promise
                    },
                },
            };

            angular.extend(this, service);

            // var args = Array.prototype.slice.call(arguments);
        }
    ]);

    /*
    app.provider('$api', [function $apiProvider() {

        var routes = {};

        this.routes = routes;
        this.when = when;

        function when(path, callback) {
            var api = this;
            routes[path] = callback;
            return api;
        }

        this.$get = ['$q', '$timeout', function $apiFactory($q, $timeout) {

            var api = {};

            angular.extend(api, routes);

            return api;

        }];

    }]);
    */

}());
/* global angular */

(function() {
    "use strict";

    var app = angular.module('app');

    app.constant('environment', getEnvironment());

    app.config(['$locationProvider', function($locationProvider) {
        // HTML5 MODE url writing method (false: #/anchor/use, true: /html5/url/use)
        $locationProvider.html5Mode(false);
        // $locationProvider.hashPrefix(''); // default '!' hashbang    
    }]);

    app.config(['$httpProvider', 'environment', function($httpProvider, environment) {
        $httpProvider.defaults.headers.common["Accept-Language"] = environment.lang;
        // $httpProvider.defaults.withCredentials = true;
        // $httpProvider.interceptors.push('AuthInterceptorService');
    }]);

    function getEnvironment() {
        var environment = {
            language: 'en',
            urls: {
                api: 'api',
            },
            apis: {
                facebook: {
                    app_id: 156171878319496,
                }
            }
        };
        if (window.environment) {
            angular.extend(environment, window.environment);
        }
        return environment;
    }

}());
/* global angular */

(function() {
    "use strict";

    var app = angular.module('app');

    app.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: function() {
                return 'views/slug.html';
            },
            controller: 'HomeCtrl',

        }).when('/contact-us', {
            templateUrl: function() {
                return 'views/contact-us.html';
            },
            controller: 'ContactUsCtrl',
            // resolve: {
            //    user: ['Users', function(Users) {
            //        return Users.isAuthorizedOrGoTo('/home');
            //    }]
            // },

        }).when('/works/:slug', {
            templateUrl: function() {
                return 'views/slug.html';
            },
            controller: 'SlugCtrl',

        }).when('/works/visuals/:slug', {
            templateUrl: function() {
                return 'views/slug.html';
            },
            controller: 'SlugCtrl',

        }).when('/works/production/:slug', {
            templateUrl: function() {
                return 'views/slug.html';
            },
            controller: 'SlugCtrl',

        }).when('/experiences/:slug', {
            templateUrl: function() {
                return 'views/slug.html';
            },
            controller: 'SlugCtrl',

        }).when('/:slug', {
            templateUrl: function() {
                return 'views/slug.html';
            },
            controller: 'SlugCtrl',

        });

        $routeProvider.otherwise('/');

    }]);

}());
/* global angular */

(function () {
	"use strict";

	var app = angular.module('app');

	app.run(['$rootScope', '$sce', function ($rootScope, $sce) {

		function trustResource(src) {
			return $sce.trustAsResourceUrl(src);
		}

		function cssUrl(src) {
			return 'url(\'' + src + '\')';
		}

		$rootScope.trustResource = trustResource;
		$rootScope.cssUrl = cssUrl;

    }]);

}());

/* global angular */

(function() {
    "use strict";

    var app = angular.module('app');

    app.controller('ContactUsCtrl', ['$scope', 'State', 'View', function($scope, State, View) {
        var state = new State();
        var state2 = new State();

        View.current().then(function(view) {
            $scope.view = view;
            state.ready();

        }, function(error) {
            state.error(error);

        });

        $scope.state = state;
        $scope.state2 = state2;
    }]);

}());
/* global angular */

(function () {
	"use strict";

	var app = angular.module('app');

	app.controller('HomeCtrl', ['$scope', 'State', 'View', function ($scope, State, View) {
		var state = new State();

		View.current().then(function (view) {
			$scope.view = view;
			state.ready();

		}, function (error) {
			state.error(error);

		});

		$scope.state = state;
    }]);

}());

/* global angular */

(function () {
	"use strict";

	var app = angular.module('app');

	app.controller('RootCtrl', ['$scope', '$timeout', '$promise', 'Nav', 'Api', 'Scrollable',
        function ($scope, $timeout, $promise, Nav, Api, Scrollable) {

			var nav = new Nav({
				onLink: onLink,
				onNav: onNav,
			});

			Api.navs.main().then(function (items) {
				nav.setItems(items);

			}, function (error) {
				console.log('RootCtrl.error', error);

			});

			function onLink(item) {
				var link = item.url;
				console.log('RootCtrl.onLink', item.$nav.level, link);
				return link;
			}

			function onNav(item) {
				console.log('RootCtrl.onNav', item.$nav.level, item.$nav.link);
				Nav.path(item.$nav.link);
				return false; // returning false disable default link behaviour;
			}

			function onNavPromise(item) {
				$scope.selected = item;
				return $promise(function (promise) {
					console.log('RootCtrl.onNavPromise', item.$nav.level, item.$nav.link);
					$timeout(function () {
						if (item.items) {
							item.$nav.addItems({
								name: "Item",
							});
						}
						promise.resolve();
					});
				}); // a promise always disable default link behaviour;
			}

			$scope.nav = nav;

			////////////

			var items = new Array(20).fill({
				name: 'Item',
				items: new Array(2).fill({
					name: 'Item',
				}),
			});

			var scrollable = new Scrollable();

			function scrollPrev() {
				scrollable.scrollPrev();
			}

			function scrollNext() {
				scrollable.scrollNext();
			}

			$scope.items = items;
			$scope.scrollPrev = scrollPrev;
			$scope.scrollNext = scrollNext;
			$scope.scrollable = scrollable;

        }
    ]);

}());

/* global angular */

(function () {
	"use strict";

	var app = angular.module('app');

	app.controller('SlugCtrl', ['$scope', 'State', 'View', function ($scope, State, View) {
		var state = new State();

		View.current().then(function (view) {
			$scope.view = view;
			state.ready();

		}, function (error) {
			state.error(error);

		});

		$scope.state = state;
    }]);

}());
