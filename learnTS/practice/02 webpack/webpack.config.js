const {resolve} = require('path')

module.exports = {
    entry: {
        main: resolve('src/index.ts')
    },
    module: {
        rules: [
            // swc-loader ts配置
            // {
            //     test: /\.ts$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: "swc-loader"
            //     }
            // }
            // babel-loader ts配置
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}