import websiteJson from '../../config/website.json';

export const apiDomain = process.env.DEV ?
	`http://localhost:${websiteJson.port.apiProxyServer}`
	:
	'https://picasaweb.google.com';

export default "this is app config";
