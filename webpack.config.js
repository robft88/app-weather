const HtmlWebpackPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
    entry: {
        js: "./src/index.js"
    },
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        },
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "./"
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/i,
                use: "file-loader?name=assets/img/[name].[ext]"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: "./src/assets/img/favicon.png"
        }),
        new MiniCssExtractPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
};