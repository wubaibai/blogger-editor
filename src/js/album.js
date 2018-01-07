import { albums } from './appVariable';

export const filterAlbumTitle = (query) => (
	albums.data
		.filter((album) => (
			album.title.$t.indexOf(query) !== -1
		))
);

export default 'album';
