const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './client/src/index.js',
    // resolve: {
    //     extensions: ['.js', '.jsx', '.json', '.wasm'] // Add '.jsx' if you are using React JSX
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        //if i wnat to add images, i have to add another rules
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'], 
                        plugins: ['@babel/plugin-transform-runtime'] 
                    }
                }
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'] 
            }
        ]
    },

    // Plugins configuration
    plugins: [ //naviagte one folder up to the template directory, the base folder is webpack config 
        new HtmlWebpackPlugin({
            template: 'template/index.html',
            filename: 'index.html'
        })
    ],

    // Development server configuration
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), 
        },
        compress: true, 
        port: 8080, 
        open: true,
        hot: true, 
        historyApiFallback: true, 
        proxy: {
            '/api': {
                target: 'http://localhost:3000', 
                secure: false, 
                changeOrigin: true, 
                pathRewrite: { '^/api': '' }, 
            }
        }
    }
};
