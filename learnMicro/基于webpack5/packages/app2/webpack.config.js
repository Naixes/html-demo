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
    // runtimeChunk: {
    //   name: 'runtime',
    // },
  },
  plugins: [
    // 联邦模块
    new ModuleFederationPlugin({
      name: 'app2',
      // app2全局变量
      library: { type: 'var', name: 'app2' },
      // 对外暴露
      exposes: {
        './Button': './src/Button',
      },
      // 打包出的文件名，供别人引入
      filename: 'remoteEntry.js',
      // 提供共享，依赖
      shared: {
        react: {
          // 独立的
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
