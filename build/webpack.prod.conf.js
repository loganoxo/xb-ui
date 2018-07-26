'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    vendors: ['vue', 'vuex', 'vue-router'],
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: '/'
  },
  optimization: {
    // minimizer: true,                   // production mode下面自动为true
    providedExports: true,
    usedExports: true,
    //识别package.json中的sideEffects以剔除无用的模块，用来做tree-shake
    //依赖于optimization.providedExports和optimization.usedExports
    sideEffects: true,
    //取代 new webpack.optimize.ModuleConcatenationPlugin()
    concatenateModules: true,
    //取代 new webpack.NoEmitOnErrorsPlugin()，编译错误时不打印输出资源。
    noEmitOnErrors: true,
    splitChunks: {
      // maxAsyncRequests: 1,                     // 最大异步请求数， 默认1
      // maxInitialRequests: 1,                   // 最大初始化请求数，默认1
      cacheGroups: {
        // test: path.resolve(__dirname, '../node_modules'),
        commons: {
          chunks: 'all',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        }
      }
    },
    //提取webpack运行时的代码
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        parser: require("postcss-safe-parser"),
        discardComments: {removeAll: true}
      }
    }),

    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      hash: true,// 防止缓存
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'none'
    }),
    new webpack.HashedModuleIdsPlugin(),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
