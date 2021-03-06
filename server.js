var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
// config.entry.unshift("webpack-dev-server/client?http://localhost:3000/");
var express = require('express');
var app = new express();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {hot:true,noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use('/dev', express.static(__dirname + '/dev/'));
app.use('/build', express.static(__dirname + '/dist/'));

app.get('/',function(req, res){
	res.sendFile(__dirname + '/dev/html/');
});
app.use('/mock',require('./mock/index'));

app.listen(port, function(error){
	if(error){
		console.error(error);
	}else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	}
});