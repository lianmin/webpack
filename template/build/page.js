var config = require('../config')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var chunks = []
var entries = {}
var pageConfig = config.page

function pageChunks(pageName) {
  var ret = [pageName]
  var commonChunk = pageConfig.commonChunk

  Object.keys(commonChunk).forEach(chunkName => {
    if (commonChunk[chunkName].indexOf(pageName) > -1) {
      ret.push(chunkName)
    }
  })

  return ret
}

Object.keys(pageConfig.pages).forEach(page => {
  var entry = pageConfig.pages[page]

  entries[page] = entry.path

  chunks.push(new HtmlWebpackPlugin({
    filename: page + '.html',
    template: entry.template,
    title: entry.title,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks: pageChunks(page),
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  }))
})

var commonChunks = []
if (pageConfig.commonChunk) {
  Object.keys(pageConfig.commonChunk).forEach(chunkName => {
    commonChunks.push(new webpack.optimize.CommonsChunkPlugin({
      name: chunkName,
      chunks: pageConfig.commonChunk[chunkName]
    }))
  })
}

module.exports = {
  entries,
  chunks,
  commonChunks
}
