
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  devServer: {
    port: 8084
  },
  productionSourceMap: false,
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // transpileDependencies: ['vuetify']
  configureWebpack: {
    performance: {//打包文件大小配置
      "maxEntrypointSize": 10000000,
      "maxAssetSize": 30000000
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    }
  },
}
