const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const env = dotenv.config({ path: './build/.private.env' }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
}, {});

//
//
// let handlebars = new HandlebarsPlugin({
//     entry: path.join(process.cwd(), "templates", "lists.handlebars"),
//     output: path.join(process.cwd(), "public", "lists.precompiled.js"),
// });

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
    ]
};
