const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        index: __dirname + '/src/index.js'
    },
    output: {
        path: __dirname + '/dist/',
        filename: '[name].js',
        libraryTarget: "umd"
    },
    plugins: [
        new UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: [
                                "transform-class-properties",
                                ['transform-object-rest-spread', {'useBuiltIns': true}],
                                'transform-decorators-legacy'
                            ]
                        }
                    }
                ]
            }
        ]
    }
};
