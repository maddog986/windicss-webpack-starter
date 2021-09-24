const path = require('path');
const WindiCSS = require('windicss-webpack-plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        // save the css to external file
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        },
                    },
                    "css-loader"
                ],
            },
        ],
    },
    plugins: [
        new WindiCSS(),

        new MiniCssExtractPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        }),
    ],

    devServer: {
        host: '0.0.0.0',
        port: 3000,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        liveReload: true,
        hot: true,
        watchFiles: ['src/**/*'],
    },
}
