const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const deps = require("./package.json").dependencies;
module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        publicPath: 'http://127.0.0.1:8080/',
       
    },
    devServer: {
        port: 3006,
        historyApiFallback:{
            index:'index.html'
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
          }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),   
        new webpack.ProgressPlugin({
          activeModules: true,
        }),
        new ModuleFederationPlugin({
            name: 'subAppTwo',
            filename: 'remoteEntry.js', // Specify the filename for remoteEntry.js
            remotes: {
                Host: 'Host@http://localhost:3000/remoteEntry.js',
            },
            // shared: { react: { singleton: true, eager: true }, "react-dom": { singleton: true, eager: true } },
            // shared: {
            //     ...deps,
            //     react: {
            //         eager:true,
            //       singleton: true,
            //       requiredVersion: deps.react,
            //     },
            //     // "react-dom": {
            //     //     eager:true,
            //     //   singleton: true,
            //     //   requiredVersion: deps["react-dom"],
            //     // },
            exposes: {
                './Shell': './src/App.jsx',
                // './Contact':'./src/Contact.jsx'
            },
            shared: {
                react: { singleton: true },
                "react-dom": { singleton: true },
                // "react-router-dom": { singleton: true },
             },
            // shared: require("./package.json").dependencies,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins:['@babel/plugin-transform-runtime']
                  },
                },
              },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js','.jsx'],
    },
    
};