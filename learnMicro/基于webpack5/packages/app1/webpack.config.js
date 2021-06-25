const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      library: { type: 'var', name: 'app1' },
      // 用到的远程
      remotes: { app2: 'app2' },
      // 保持对共有库的引用
      shared: {
        react: {
          singleton: true,
          eager: true,
        },
        'react-dom': {
          singleton: true,
          eager: true,
        },
      },
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
