var path = require('path')

module.exports = {
  pages: {
    page1: {
      path: './src/entries/page1',
      title: '',
      template: 'index.html',
    },
    page2: {
      path: './src/entries/page2',
      title: '支付结果',
      template: 'index.html'
    }
  },
  commonChunk: {
    common: ['page1', 'page2'],
  }
}
