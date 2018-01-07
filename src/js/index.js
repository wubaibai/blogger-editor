import $ from 'jquery';
import gapi from 'GOOGLEAPI'; // eslint-disable-line

import googleInit, { googleLogin } from './googleInit';

import '../css/index/welcome.css';

googleInit();

$('#btn-sign-in').on('click', () => {
	googleLogin();
});
