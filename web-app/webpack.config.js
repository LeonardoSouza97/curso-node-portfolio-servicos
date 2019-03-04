const path = require('path');

/*
 entry: ["babel-polyfill", "./src/index.js"],//irá empacotar em um único arquivo
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
*/

module.exports = {
  entry: {
    babelpolyfill: 'babel-polyfill',
    index: './src/index.js',
    indexController: './src/controller/indexController.js',
    portfolioController: './src/controller/portfolioController.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/bundle'),
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          { loader: "css-loader" }
        ]
      },
      /*{
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }      {
        test: /\.css$/,
        use: [
          { loader: "style-loader/url" },
          { loader: "file-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    }*/
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    port: 9000
  }
};