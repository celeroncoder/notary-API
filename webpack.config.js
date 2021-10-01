const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin")
const webpackNodeExternals = require("webpack-node-externals")

module.exports = function(options, webpack) {
	return {
		...options,
		entry: ['webpack/hot/poll?100', options.entry],
		externals: [
			webpackNodeExternals({
				allowlist: ['webpack/hot/poll?100'],
			}),
		],
		plugins: [
			...options.plugins,
			new webpack.HotModuleReplacementPlugin(),
			new webpack.WatchIgnorePlugin({
				paths: [/\.js$/, /\.d\.ts$/]
			}),
			new RunScriptWebpackPlugin({ name: options.output.filename }),
		],
	};
};