import gapi from 'GOOGLEAPI'; // eslint-disable-line

import { user, albums } from './appVariable';
import googleConfig from './googleConfig';
import getPicasaData from './request/getPicasaData';
import { filterAlbumTitle } from './album';

const updateSigninStatus = (isSignedIn) => {
	if (!isSignedIn) {
		return;
	}

	user.data = gapi.auth2.getAuthInstance().currentUser.get();
	user.token = user.data.getAuthResponse().access_token;

	getPicasaData()
		.then(({ feed }) => {
			albums.data = feed.entry;
		})
		.then(() => {
			filterAlbumTitle('@')
				.forEach((album) => {
					console.log(album.title.$t);
				});
		});
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
