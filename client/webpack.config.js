const HtmlWebpackPlugin = require('html-webpack-plugin');//bundle html and where are the links, java and css links//generating new html page
const WebpackPwaManifest = require('webpack-pwa-manifest');//download to offline
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');//caching 

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E',
      }),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: "TE",
        description: "This is text editor",
        start_url: "/",
        publicPath:"/",
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          }
        ]
      })
      
    ],

    module: {
      rules: [
         {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        }
      
      ],
    },
  };
};