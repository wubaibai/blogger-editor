import $ from 'jquery';
import gapi from 'GOOGLEAPI'; // eslint-disable-line

import googleConfig from './googleConfig';

import '../css/index/welcome.css';

const user = {
	data: null,
	token: null,
};

const getPicasaData = () => {
	console.log('getPicasaData');

	// gapi.client.request({
	// 	path: 'https://picasaweb.google.com/data/feed/api/user/default',
	// 	params: {
	// 		access_token: encodeURIComponent(user.token),
	// 	},
	// }).then((response) => {
	// 	console.log('OK:');
	// 	console.log(response);
	// }, () => {
	// 	console.log('ERR:');
	// });

	// const myHeader = new Headers({
	// 	Authorization: `Bearer ${user.token}`,
	// 	'Access-Control-Allow-Origin': '*',
	// });

	fetch(
		`https://picasaweb.google.com/data/feed/api/user/default?alt=json&access_token=${user.token}`,
	)
		.then((response) => {
			console.log(response);
		});
};

const updateSigninStatus = (isSignedIn) => {
	if (!isSignedIn) {
		return;
	}

	user.data = gapi.auth2.getAuthInstance().currentUser.get();
	user.token = user.data.getAuthResponse().access_token;

	console.log(user.token);

	getPicasaData();
};

const initClient = () => {
	gapi.client.init({
		clientId: googleConfig.clientId,
		apiKey: googleConfig.apiKey,
		scope: 'http://picasaweb.google.com/data/',
	}).then(() => {
		/**
		 *	Listen for sign-in state changes.
		 */
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		/**
		 *	Handle the initial sign-in state.
		 */
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	});
};

gapi.load('client:auth2', initClient);

$('#btn-sign-in').on('click', () => {
	gapi.auth2.getAuthInstance().signIn();
});
