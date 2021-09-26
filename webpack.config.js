const path = require("path")
const WindiCSS = require("windicss-webpack-plugin").default
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const isDevelopment = process.env.NODE_ENV !== "production"

module.exports = {
    mode: isDevelopment ? "development" : "production",
    devtool: isDevelopment ? "source-map" : false,

    entry: "./src/index.tsx",

    watchOptions: {
        poll: 1000,
        aggregateTimeout: 600,
        ignored: ["**/dist", "**/node_modules"]
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        sourceMapFilename: "[file].map",
        filename: "main.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],
        modules: ["node_modules"],
    },

    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-transform-modules-commonjs",
                            "@babel/plugin-proposal-object-rest-spread",
                            isDevelopment && "react-refresh/babel",
                        ].filter(Boolean),
                        presets: [
                            ["@babel/preset-env", {
                                targets: {
                                    esmodules: false
                                },
                                modules: false,
                            }],
                            "@babel/preset-typescript",
                            ["@babel/preset-react", { development: isDevelopment, runtime: "automatic" }],
                        ]
                    }
                }
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    isDevelopment ? 'style-loader' : {
                        // save the css to external file
                        // https://www.npmjs.com/package/mini-css-extract-plugin
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        },
                    },
                    {
                        // becombine other css files into one
                        // https://www.npmjs.com/package/css-loader
                        loader: "css-loader",
                        options: {
                            esModule: false,
                            importLoaders: 1, // 1 other loaders used first, sass-loader
                            sourceMap: isDevelopment,
                        }
                    },
                    {
                        // load sass files into css files
                        // https://www.npmjs.com/package/sass-loader
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                ],
            },
        ],
    },

    plugins: [
        // windicss
        // https://www.npmjs.com/package/windicss
        new WindiCSS(),

        // dump css into its own files
        // https://webpack.js.org/plugins/mini-css-extract-plugin/
        new MiniCssExtractPlugin(),

        // HMR for React
        // https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin
        new ReactRefreshWebpackPlugin(),

        // build index.html file in dist folder
        // https://www.npmjs.com/package/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
    ].filter(Boolean),

    // setup for providing a local server for development
    devServer: {
        host: "0.0.0.0",
        port: 3000,
        // static: {
        //     directory: path.join(__dirname, "dist"),
        //     watch: true
        // },
        compress: true,
        liveReload: true,
        hot: true,
        // watchFiles: ["src/**/*"],
    },
}
