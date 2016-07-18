var path = require('path');
var webpack = require('webpack');

module.exports = {
	// devtool:'cheap-module-eval-source-map',
	entry:{
		'routeInquire':[
			'webpack-hot-middleware/client',
			'./dev/page/routeInquire/'
		],
		'waybillArrive':[
			'webpack-hot-middleware/client',
			'./dev/page/waybill/waybillArrive'
		],
		'address':[
			'webpack-hot-middleware/client',
			'./dev/page/address/'
		],
		'bind':[
			'webpack-hot-middleware/client',
			'./dev/page/bind/'
		],
		'test':[
			'webpack-hot-middleware/client',
			'./dev/page/test/test'
		],
		'vendor': [
            'react',
            'react-dom',
            'redux',
            'react-fastclick',
            'react-redux',
            'react-router',
            'classNames'
        ]
	},
	output: {
	    path: path.join(__dirname, 'dist'),
	    filename: 'page.[name].js',
	    publicPath: '/build/'
	  },
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			query:{
				presets: ['es2015', 'react'],//新版的babel将原来的一些模块拆分开来，通过插件的形式来引用
				plugins: ["transform-object-assign"]
			},
			
			include: __dirname
		},
		{
			test: /\.(less|css)$/,
			loader: 'style!css?minimize&localIdentName=[name]_[local]_[hash:base64:5]!autoprefixer?browsers=last 6 version!less-loader',
			include:__dirname
		},{ 
		    test: /\.(gif|jpg|png)\??.*$/,
		    loader: 'url-loader?limit=2000&name=images/[name].[hash:base64:8].[ext]' 
		},{
			test: /\.(woff|svg|eot|ttf)\??.*$/,
		    loader: 'url-loader?limit=100&name=iconfont/[name].[hash:base64:8].[ext]' 
		}]
	}
}