import $ from 'jquery';
import gapi from 'GOOGLEAPI'; // eslint-disable-line

import googleConfig from './googleConfig';
import handleErrorRequest from './handleErrorRequest';

import '../css/index/welcome.css';

const user = {
	data: null,
	token: null,
};

const getPicasaData = () => {
	fetch(
		`https://picasaweb.google.com/data/feed/api/user/default?alt=json&access_token=${user.token}`,
	)
		.then((response) => handleErrorRequest(response))
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
