const rspack = require("@rspack/core");
const refreshPlugin = require("@rspack/plugin-react-refresh");
const isDev = process.env.NODE_ENV === "development";
/**
 * @type {import('@rspack/cli').Configuration}
 */


console.log(require.resolve('./test-loader.js'))

module.exports = {
	context: __dirname,
	entry: {
		main: "./src/main.tsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx", ".mdx"]
	},
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
	},
	module: {
		generator: {
			'css/auto': {
				exportsOnly: true,
				exportsConvention: 'camel-case-only',
				esModule: false,
				localIdentName: '[path][name][ext]__[local]',
			},
			css: {
				exportsOnly: true,
				exportsConvention: 'camel-case-only',
				esModule: false,
			},
			'css/module': {
				exportsOnly: true,
				esModule: false,
				exportsConvention: 'camel-case-only',
				localIdentName: '[path][name][ext]__[local]',
			},
		},
		parser: {
			'css/auto': {
				namedExports: false,
			},
			css: {
				namedExports: false,
			},
			'css/module': {
				namedExports: false,
			},
		},
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: {
								targets: [
									"chrome >= 87",
									"edge >= 88",
									"firefox >= 78",
									"safari >= 14"
								]
							}
						}
					}
				]
			},
			{
				test: /\.mdx$/,
				// descriptionData: { componentId: (data) => { console.log('descriptionData', data); return true; } },
				descriptionData: {
					// 1. this works
					// version: (versionData) => {
					// 	console.log("🚀 ~ file: rspack.config.js:97 ~ descriptionData:version", versionData);
					// 	return true;
					// },
					// 2. this doesn't work
					// componentId: (componentIdData) => {
					// 	console.log("🚀 ~ file: rspack.config.js:102 ~ descriptionData:componentId", componentIdData);
					// 	return true;
					// },
					// 3. this doesn't work
					"_custom_key": (customKeyData) => {
						console.log("🚀 ~ file: rspack.config.js:107 ~ descriptionData:_custom_key", customKeyData);
						return true;
					}
				},
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							sourceType: 'unambiguous',
							babelrc: false,
							configFile: false,
							presets: [
								require.resolve('@babel/preset-react'),
								require.resolve('@babel/preset-env'),
							],
							plugins: [],
						},
					},
					{
						loader: require.resolve('@teambit/mdx.modules.mdx-loader'),
					}, 
					{
						loader: require.resolve('./test-loader.js'),
					}
				]
			}
		]
	},
	plugins: [
		new rspack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new rspack.ProgressPlugin({}),
		new rspack.HtmlRspackPlugin({
			template: "./index.html"
		}),
		isDev ? new refreshPlugin() : null
	].filter(Boolean)
};
