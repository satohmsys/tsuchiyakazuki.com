/*******************

weback config
for static website

update : 201803

- webpack4 x sass
@link: https://ics.media/entry/17376
@link: https://gist.github.com/mburakerman/629783c16acf5e5f03de60528d3139af

- optimization.splitChunks
@link: https://qiita.com/soarflat/items/1b5aa7163c087a91877d
@link: http://webdesign-dackel.com/2015/09/10/webpack-multiple-output/

-autoprefixer
@link: https://blog.funxion.jp/314/

-webpack
@link: http://dackdive.hateblo.jp/entry/2016/05/07/183335
@link: http://dackdive.hateblo.jp/entry/2016/04/13/123000

*******************/

const 	webpack = require( 'webpack' ),
		path = require( 'path' ),
		ExtractTextPlugin = require( 'extract-text-webpack-plugin' ), 
		HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
		CopyWebpackPlugin = require( 'copy-webpack-plugin' );

let vars  = require( './webpack.variables.js' );


let config = {
	
	entry: path.resolve( __dirname, './main.js'),

	output: {
		path: vars.PATHS.output.path,
		publicPath: '/',
		filename: vars.PATHS.dir.output + '/js/[name].js',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['env', {
								'modules': false,
								"useBuiltIns": true							
								}
							],
							'es2015'
						]
					}
				}]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								url: true,
								minimize: true,
								sourceMap: vars.enabledSourceMap,
								importLoaders: 2,
								exclude: path.resolve( __dirname, 'scss/loading.scss')
							}

						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: ( loader )=>[ require( 'autoprefixer') ],
								sourceMap: vars.enabledSourceMap,
									exclude: path.resolve(__dirname, 'scss/loading.scss')
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: vars.enabledSourceMap,
								minimize: true,
									exclude: path.resolve(__dirname, 'scss/loading.scss')
							}
						}
					]
				})
			},
			{
				test: /\.ejs$/,
				exclude : /node_modules/,
				use: [
					{
						loader: 'html-loader'
					},
					{
						loader: 'ejs-html-loader'
					}
				]
			}
		]
	},

	// optimization: {

	// },

	plugins: [
		new ExtractTextPlugin({
			filename: vars.PATHS.dir.output + '/css/style.css',
			allChunks: true
		}) ,
	    new CopyWebpackPlugin([{
	      from: './src/img/',
	      to: vars.PATHS.dir.output + '/img'
	    }]),			
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/ejs/index.ejs',
			// inject: 'head',
		}),									
		new HtmlWebpackPlugin({
			filename: 'gallery.html',
			template: './src/ejs/gallery.ejs',
			// inject: 'head',
		}),									
		new HtmlWebpackPlugin({
			filename: 'manifest.html',
			template: './src/ejs/manifest.ejs',
			// inject: 'head',
		}),									
		new HtmlWebpackPlugin({
			filename: 'profile.html',
			template: './src/ejs/profile.ejs',
			// inject: 'head',
		}),									
	],
	resolve: {
		extensions: ['.js', '.jsx', '.css', '.scss' ]
	}
}

module.exports = config;