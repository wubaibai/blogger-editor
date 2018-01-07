import $ from 'jquery';

import { albums } from './appVariable';
import getPicasaAlbum from './request/getPicasaAlbum';
import getPicasaPhoto from './request/getPicasaPhoto';

export const filterAlbumTitle = (query) => (
	albums.data
		.filter((album) => (
			album.title.$t.indexOf(query) !== -1
		))
);

export const getAlbumsFromPicasa = () => {
	getPicasaAlbum()
		.then(({ feed }) => {
			albums.data = feed.entry;
		})
		.then(() => {
			filterAlbumTitle('@')
				.forEach((album) => {
					console.log(album);
				});
		});
};

const getAlbumId = () => (
	$('.album-id-input').val() || '6472675619536057329'
);

export const getPhotosFromAlbum = () => {
	const albumId = getAlbumId();

	getPicasaPhoto(albumId)
		.then(({ feed }) => feed.entry)
		.then((photos) => {
			console.log(photos);
		});
};

export default 'album';
