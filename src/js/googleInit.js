import $ from 'jquery';
import gapi from 'GOOGLEAPI'; // eslint-disable-line

import { user } from './appVariable';
import googleConfig from './googleConfig';

const updateSigninStatus = (isSignedIn) => {
	if (!isSignedIn) {
		$('.login-wrap').addClass('_show');

		return;
	}

	$('.login-wrap').removeClass('_show');
	user.data = gapi.auth2.getAuthInstance().currentUser.get();
	user.token = user.data.getAuthResponse().access_token;
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

const googleInit = () => {
	gapi.load('client:auth2', initClient);
};

export const googleLogin = () => {
	gapi.auth2.getAuthInstance().signIn();
};

export default googleInit;
