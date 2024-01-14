const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['next-codecraftinglab.s3.amazonaws.com'],
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      })
    );

    return config;
  },
};
