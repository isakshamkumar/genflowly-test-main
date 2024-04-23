const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const deps = require("./package.json").dependencies;
console.log(process.env.REACT_APP_VAR);
module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        publicPath: 'https://master.d3nwq8e33o714i.amplifyapp.com/',
        //if doing via serve -g dist
        //or if we do http-server dist---> then we have to change the public path
        //serve -s se horha h if we do in both
    },
    devServer: {
        // port: 3006,
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
            // remotes: {
            //     Host: 'Host@http://127.0.0.1:8081/remoteEntry.js',
            // },
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
