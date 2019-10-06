const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    if (process.env.NODE_ENV === 'production') {
        config.plugins.push(new CopyWebpackPlugin([
            {from: 'api', to: 'api'},
            {from: 'vendor', to: 'vendor'},
            {from: '.env.production', to: '.env', toType: 'file'},
        ]));
    }

    return config;
}
