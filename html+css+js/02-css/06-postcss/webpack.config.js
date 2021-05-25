const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.css$/,
        exclude: /node_modules/,
        // 生成d.ts
        loader: 'typed-css-modules-loader',
      },
      {
        test: /\.css$/i,
        use: [
          // 'style-loader',
          // 提取css
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // 模块支持
              // modules: true,
              importLoaders: 1
            },
          },
          'postcss-loader',
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 本地环境
      // filename: 'styles/[name].css'
      // 上线环境
      filename: 'styles/[name].[contenthash:5].css',
      chunkFilename: 'styles/[name].[contenthash:5].css',
      ignoreOrder: false
    })
  ]
};
