/* eslint-disable prettier/prettier */
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.graphql?$/,
      use: [
        {
          loader: 'webpack-graphql-loader',
        },
      ],
    });
    return config;
  },
  reactStrictMode: true,
};
