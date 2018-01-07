import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import HttpProxy from 'http-proxy';
import config from './webpack.config.dev.babel';
import websiteJson from './config/website.json';

new WebpackDevServer(webpack(config), {
	contentBase: config.output.path,
	publicPath: config.output.publicPath,
	hot: true,
	noInfo: true,
	overlay: true,
}).listen(websiteJson.port.webpackServer, 'localhost', (err, result) => {
	if (err) {
		console.log(result);
		return;
	}

	const proxyServer = HttpProxy.createProxyServer({
		target: 'https://picasaweb.google.com',
		changeOrigin: true,
	});
	proxyServer.on('proxyRes', (proxyRes, req, res) => {
		res.setHeader('Access-Control-Allow-Origin', `http://localhost:${websiteJson.port.browserSyncServer}`);
	});
	proxyServer.listen(websiteJson.port.apiProxyServer);

	console.log(
		'ProxyServer started at \x1b[38;5;5m%s\x1b[0m\n',
		`http://localhost:${websiteJson.port.apiProxyServer}`
	);
});
