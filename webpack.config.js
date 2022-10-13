const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: "/src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath}/[name][ext]`;
        }
    },
    devServer: {
        port: 8080,
        static: "./dist",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    "autoprefixer": {},
                                },
                            },
                        },
                    },
                    {
                        loader: 'sass-loader', options: { sourceMap: true }
                    },
                ],
            },
            {
                test: /\.svg/,
                type: 'asset/resource'
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },

        ],

    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
};