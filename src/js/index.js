import $ from 'jquery';
import gapi from 'GOOGLEAPI'; // eslint-disable-line

import googleInit, { googleLogin } from './googleInit';
import { getPhotosFromAlbum } from './album';

import '../css/index/welcome.css';

googleInit();

$('#btn-sign-in').on('click', () => {
	googleLogin();
});

$('#btn-load-album').on('click', () => {
	getPhotosFromAlbum();
});
