import { apiDomain } from '../appConfig';
import { user } from '../appVariable';

import handleErrorRequest from './handleErrorRequest';

const getPicasaAlbum = () => (
	fetch(
		`${apiDomain}
		/data/feed/api/user/default
		?alt=json
		&kind=album
		&v=3.0
		&access=private
		&access_token=${user.token}
	`)
		.then((response) => handleErrorRequest(response))
);

export default getPicasaAlbum;
