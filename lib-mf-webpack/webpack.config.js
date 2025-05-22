const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const pkg = require('./package.json');
module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
        port: 4080,
        hot: true,
        historyApiFallback: true,
        // open: true, // 自动打开浏览器
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
            name: 'webpack_remote_app',
            filename: 'remoteEntry.js',
            exposes: {
                // 这里可以添加其他微前端的远程模块
                // lib: 'lib@http://localhost:3001/remoteEntry.js',
                './app': './src/App.tsx',
                '.': './src/App.tsx',
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: pkg.dependencies['react'] },
                'react-dom': { singleton: true, eager: true, requiredVersion: pkg.dependencies['react-dom'] },
            },
        }),
        new HtmlWebpackPlugin({
            title: 'webpack_remote_app',
            template: './public/index.html',
        }),
    ],
}; 