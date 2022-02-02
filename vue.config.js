// 引入绝对地址
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
 
// 设置自定义路径
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
        'assets': '@/assets',
        // 'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'plugin': '@/plugin',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://netease-cloud-music-api-two-woad.vercel.app/',
        // pathRewrite:{'^/api':''},
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     'api': {
  //       target: 'http://www.codeman.ink:3000',
  //       pathRewrite:{'^/api':''},
  //     }
  //   }
  // }
}
