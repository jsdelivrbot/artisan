﻿/* global angular */

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
