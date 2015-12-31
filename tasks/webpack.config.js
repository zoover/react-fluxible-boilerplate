module.exports = {
  entry: './app/client.js',
  output: {
    filename: 'bundle.js',
    path: 'build/'
  },
  module: {
    loaders: [
      // will test all .jsx and .js files using babel to compile ES6 to ES5
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          compact: false,
        },
        exclude: /node_modules/,
      },
      {test: /\.json$/, loaders: ['json-loader']}
    ]
  },
};
