import { apiDomain } from '../appConfig';
import { user } from '../appVariable';

import handleErrorRequest from './handleErrorRequest';

const getPicasaPhoto = (albumId) => (
	fetch(
		`${apiDomain}
		/data/feed/api/user/default/albumid/${albumId}
		?alt=json
		&v=3.0
		&access_token=${user.token}
	`)
		.then((response) => handleErrorRequest(response))
);

export default getPicasaPhoto;
