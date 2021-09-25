"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackConfig = void 0;
const path_1 = __importDefault(require("path"));
const remotion_1 = require("remotion");
const webpack_1 = __importStar(require("webpack"));
const webpack_cache_1 = require("./webpack-cache");
const ErrorOverlayPlugin = require('@webhotelier/webpack-fast-refresh/error-overlay');
const ReactRefreshPlugin = require('@webhotelier/webpack-fast-refresh');
function truthy(value) {
    return Boolean(value);
}
const webpackConfig = ({ entry, userDefinedComponent, outDir, environment, webpackOverride = (f) => f, onProgressUpdate, enableCaching = remotion_1.Internals.DEFAULT_WEBPACK_CACHE_ENABLED, inputProps, envVariables, maxTimelineTracks, }) => {
    return webpackOverride({
        optimization: {
            minimize: false,
        },
        experiments: {
            lazyCompilation: environment === 'production'
                ? false
                : {
                    entries: false,
                },
        },
        cache: enableCaching
            ? {
                type: 'filesystem',
                name: (0, webpack_cache_1.getWebpackCacheName)(environment, inputProps !== null && inputProps !== void 0 ? inputProps : {}),
            }
            : false,
        devtool: 'cheap-module-source-map',
        entry: [
            require.resolve('./setup-environment'),
            environment === 'development'
                ? require.resolve('webpack-hot-middleware/client') + '?overlay=true'
                : null,
            environment === 'development'
                ? require.resolve('@webhotelier/webpack-fast-refresh/runtime.js')
                : null,
            userDefinedComponent,
            require.resolve('../react-shim.js'),
            entry,
        ].filter(Boolean),
        mode: environment,
        plugins: environment === 'development'
            ? [
                new ErrorOverlayPlugin(),
                new ReactRefreshPlugin(),
                new webpack_1.default.HotModuleReplacementPlugin(),
                new webpack_1.default.DefinePlugin({
                    'process.env.MAX_TIMELINE_TRACKS': maxTimelineTracks,
                    'process.env.INPUT_PROPS': JSON.stringify(inputProps !== null && inputProps !== void 0 ? inputProps : {}),
                    [`process.env.${remotion_1.Internals.ENV_VARIABLES_ENV_NAME}`]: JSON.stringify(envVariables !== null && envVariables !== void 0 ? envVariables : {}),
                }),
            ]
            : [
                new webpack_1.ProgressPlugin((p) => {
                    if (onProgressUpdate) {
                        onProgressUpdate(Number((p * 100).toFixed(2)));
                    }
                }),
            ],
        output: {
            globalObject: 'this',
            filename: 'bundle.js',
            path: outDir,
        },
        devServer: {
            contentBase: path_1.default.resolve(__dirname, '..', 'web'),
            historyApiFallback: true,
            hot: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            alias: {
                // Only one version of react
                'react/jsx-runtime': require.resolve('react/jsx-runtime'),
                react: require.resolve('react'),
                remotion: require.resolve('remotion'),
                'styled-components': require.resolve('styled-components'),
                'react-native$': 'react-native-web',
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [require.resolve('style-loader'), require.resolve('css-loader')],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|webp|gif|bmp|webm|mp4|mp3|m4a|wav|aac)$/,
                    use: [
                        {
                            loader: require.resolve('file-loader'),
                            options: {
                                // So you can do require('hi.png')
                                // instead of require('hi.png').default
                                esModule: false,
                                name: () => {
                                    // Don't rename files in development
                                    // so we can show the filename in the timeline
                                    if (environment === 'development') {
                                        return '[path][name].[ext]';
                                    }
                                    return '[contenthash].[ext]';
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('esbuild-loader'),
                            options: {
                                loader: 'tsx',
                                target: 'chrome85',
                            },
                        },
                        environment === 'development'
                            ? {
                                loader: require.resolve('@webhotelier/webpack-fast-refresh/loader.js'),
                            }
                            : null,
                    ].filter(truthy),
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: require.resolve('file-loader'),
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/',
                            },
                        },
                    ],
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: require.resolve('esbuild-loader'),
                            options: {
                                loader: 'jsx',
                                target: 'chrome85',
                            },
                        },
                        environment === 'development'
                            ? {
                                loader: require.resolve('@webhotelier/webpack-fast-refresh/loader.js'),
                            }
                            : null,
                    ].filter(truthy),
                },
            ],
        },
    });
};
exports.webpackConfig = webpackConfig;
//# sourceMappingURL=webpack-config.js.map