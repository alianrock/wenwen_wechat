var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// devtool:'cheap-module-eval-source-map',
	entry:{
		'routeInquire':[
			'./dev/page/routeInquire/'
		],
		'waybillArrive':[
			'./dev/page/waybill/waybillArrive'
		],
		'address':[
			'./dev/page/address/'
		],
		'bind':[
			'./dev/page/bind/'
		],
		'test':[
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
	    filename: 'page.[name].[hash:8].js',
	    publicPath: '../'
	  },
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.[hash:8].js"),
		new webpack.optimize.UglifyJsPlugin({
	      output: {
	        comments: false,  // remove all comments
	      },
	      compress: {
	        warnings: false
	      }
	    }),
	    new webpack.DefinePlugin({
	      'process.env': {
	          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
	      },
	    }),
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new ExtractTextPlugin("style/[name].[contenthash:8].css"),
		new HtmlWebpackPlugin({
			filename:'html/bind.html',
			template:'./dev/html/template.html',
			chunks: ['vendor','bind'],
			title:'手机绑定'
		}),
		new HtmlWebpackPlugin({
			filename:'html/address.html',
			template:'./dev/html/template.html',
			chunks: ['vendor','address'],
			title:'地址簿'
		}),
		new HtmlWebpackPlugin({
			filename:'html/routeInquire.html',
			template:'./dev/html/template.html',
			chunks: ['vendor','routeInquire'],
			title:'路由查询'
		}),
		new HtmlWebpackPlugin({
			filename:'html/waybillArrive.html',
			template:'./dev/html/template.html',
			chunks: ['vendor','waybillArrive'],
			title:'我的收件'
		})
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
			loader: ExtractTextPlugin.extract(['css','autoprefixer','less']),
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