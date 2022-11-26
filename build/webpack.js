const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const env = dotenv.config({ path: './build/.private.env' }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
}, {});

module.exports = {
    entry: './src/app.js',
    mode: `${process.env.ENV}`,
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
    ]
};
