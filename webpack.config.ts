import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration } from 'webpack';
import 'webpack-dev-server';

const config = (
	env: unknown,
	argv: {
		mode: 'development' | 'production';
		open: boolean;
	},
): Configuration => {
	const isDev = argv.mode === 'development';
	const isProd = argv.mode === 'production';

	return {
		mode: argv.mode ?? 'development',

		entry: './src/main.tsx',

		output: {
			filename: '[name].[contenthash:8].js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
		},

		resolve: {
			extensions: ['.tsx', '.ts', '.jsx', '.js'],
		},

		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.scss$/,
					use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
				{
					test: /\.(png|jpe?g|gif|svg|webp)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'images/[name].[hash][ext]',
					},
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name].[hash][ext]',
					},
				},
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			isProd &&
				new MiniCssExtractPlugin({
					filename: '[name].[contenthash:8].css',
					chunkFilename: '[name].[contenthash:8].css',
				}),
		].filter(Boolean),

		devServer: {
			static: './public',
			port: 3000,
			open: true,
			hot: true,
		},

		optimization: {
			minimize: isProd,
			minimizer: isProd
				? [
						new TerserPlugin({
							terserOptions: {
								compress: {
									drop_console: true,
								},
							},
						}),
					]
				: [],
			splitChunks: {
				chunks: 'all',
			},
			runtimeChunk: 'single',
		},
	};
};

export default config;
