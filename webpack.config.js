const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'js'),
  },

  // I'm trying here to convert ES6 to ES5 (arrows, const, let)
  // the output is too complicated

  // module: {
  //   rules: [{
  //     test: /\.m?js$/,
  //     include: [
  //       path.resolve(__dirname, 'js/src/'),
  //     ],
  //     exclude: /(node_modules|bower_components)/,
  //     use: {
  //       loader: 'babel-loader',
  //       options: {
  //         presets: ['@babel/preset-env'],
  //       },
  //     },
  //   }],
  // },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: false,
          mangle: false,
          // module: false,
          output: {
            beautify: true,
            braces: true,
            comments: false,
            ecma: 5,
            indent_level: 2,
            max_line_len: 80,
            quote_style: 3,
          },
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
    namedModules: true,
    moduleIds: 'natural',
  },
};
