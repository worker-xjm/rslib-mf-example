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
                provider: 'mf_provider@http://localhost:4000/mf_provider.js', // lib-mf-rslib 已正常使用
                // provider: 'rsbuild_mf_components@http://localhost:4070/remoteEntry.js', // lib-mf-rsbuild 已正常使用
                // provider: 'remote_mf_webpack@http://localhost:4080/remoteEntry.js', // lib-mf-webpack 已正常使用
                // provider: 'vitemfc@http://localhost:4050/remoteEntry.js', // lib-mf-vite 不能正常使用
                // provider: 'eipReactCommonAssets@http://localhost:9999/remoteEntry.js', // legacy-webpack 已正常使用
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