//@ts-check
const path = require('path');
const nodeExternals = require('webpack-node-externals');

/**
 * @type { import('webpack').Configuration }
 */
const config = {
    mode: 'development',
    entry: './src/index.ts',
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [{ use: 'ts-loader', test: /\.ts$/ }],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    externals: [nodeExternals()],
};

module.exports = config;
