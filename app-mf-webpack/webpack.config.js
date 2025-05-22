const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const pkg = require('./package.json');
module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
        port: 4090,
        hot: true,
        historyApiFallback: true,
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
            name: 'webpack_host_app',
            remotes: {
                // 这里可以添加其他微前端的远程模块
                // lib: 'lib@http://localhost:3001/remoteEntry.js',
                // provider: 'mf_provider@http://localhost:4000/mf_provider.js', // worked
                // provider: 'rsbuild_mf_components@http://localhost:4070/remoteEntry.js', // worked
                provider: 'webpack_remote_app@http://localhost:4080/remoteEntry.js', // worked
                // provider: 'eipReactCommonAssets@http://localhost:9999/remoteEntry.js', // can't work
                // provider: 'eipReactCommonAssets@http://sit.coreland.com.cn/common/reactCommon/remoteEntry.js', // can't work
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: pkg.dependencies['react'] },
                'react-dom': { singleton: true, eager: true, requiredVersion: pkg.dependencies['react-dom'] },
            },
        }),
        new HtmlWebpackPlugin({
            title: 'webpack_host_app',
            template: './public/index.html',
        }),
    ],
}; 