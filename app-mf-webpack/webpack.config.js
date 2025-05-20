const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
        port: 4080,
        hot: true,
        historyApiFallback: true,
        open: true, // 自动打开浏览器
    },
    output: {
        publicPath: 'auto', // 自动处理公共路径
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'app',

            // filename: 'remoteEntry.js',
            remotes: {
                // 这里可以添加其他微前端的远程模块
                // lib: 'lib@http://localhost:3001/remoteEntry.js',
                'provider': 'mf_provider@http://localhost:4000/mf_provider.js',
            },
            shared: {
                react: { singleton: true, },
                'react-dom': { singleton: true, },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
}; 