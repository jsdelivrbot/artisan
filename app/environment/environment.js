/* global angular */

(function () {
	"use strict";

	var app = angular.module('app');

	app.config(['environmentProvider', function (environmentProvider) {

		environmentProvider.add('environment', {
			addons: {
				facebook: {
					app_id: 340008479796111,
					fields: 'id,name,first_name,last_name,email,gender,picture,cover,link',
					scope: 'public_profile, email', // publish_stream
					version: 'v2.10',
				},
				googlemaps: {
					apiKey: 'AIzaSyCn6O-j_8pipy-ErGxg4bM1juGesiyM28U',
					styles: '/googlemaps/applemapesque.json',
					options: {
						center: {
							lat: 43.9023386, // latitude
							lng: 12.8505094, // longitude
						},
						zoom: 4.0,
					}
				},
				mapbox: {
					accessToken: 'pk.eyJ1IjoiYWN0YXJpYW4iLCJhIjoiY2lqNWU3MnBzMDAyZndnbTM1cjMyd2N2MiJ9.CbuEGSvOAfIYggQv854pRQ',
					options: {
						center: [
							12.8505094, // longitude
							43.9023386, // latitude
						],
						zoom: 4.0,
					},
					style: 'mapbox://styles/actarian/cja82nadj07sn2rmty6n1n5pk',
					version: 'v0.42.0',
				},
			},
			http: {
				interceptors: [], // ['AuthInterceptorService'],
				withCredentials: false,
			},
			language: {
				code: 'en',
				culture: 'en_US',
				iso: 'ENU',
				name: 'English',
			},
			location: {
				hash: '!',
				html5: false,
			},
		});

    }]);

}());