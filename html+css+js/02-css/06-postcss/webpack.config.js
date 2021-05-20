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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 模块支持
              modules: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
