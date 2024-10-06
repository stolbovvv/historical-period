import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Configuration } from 'webpack';
import 'webpack-dev-server';

export default function (env: unknown, argv: { mode: 'development' | 'production' }): Configuration {
	const isDev = argv.mode === 'development';
	const isProd = argv.mode === 'production';

	const config: Configuration = {
		mode: argv.mode ?? 'development',
		entry: './src/main.tsx',
		output: {
			filename: 'assets/scripts/[name].[contenthash:8].js',
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
					test: /\.s?[ac]ss$/,
					use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
				{
					test: /\.(png|jpe?g|gif|svg|webp)$/,
					type: 'asset/resource',
					generator: {
						filename: 'assets/images/[name].[contenthash:8][ext]',
					},
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					type: 'asset/resource',
					generator: {
						filename: 'assets/fonts/[name].[contenthash:8][ext]',
					},
				},
			],
		},
		devServer: {
			static: './public',
			port: 3000,
			open: true,
			hot: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
		],
		optimization: {
			minimize: isProd,
			minimizer: [],
			splitChunks: {
				chunks: 'all',
			},
			runtimeChunk: 'single',
		},
	};

	if (isProd) {
		config.plugins?.push(
			new MiniCssExtractPlugin({
				filename: 'assets/styles/[name].[contenthash:8].css',
				chunkFilename: 'assets/styles/[name].[contenthash:8].css',
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						filter: async (path) => !path.includes('index.html'),
						from: 'public',
						to: '.',
					},
				],
			}),
		);

		config.optimization?.minimizer?.push(
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
		);
	}

	return config;
}
