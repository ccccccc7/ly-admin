const api_path = process.env.API_ROOT

module.exports = {
  proxyList: {
    '/api': {
      // 测试环境
      target: "http://localhost:9020/api",  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/api': ''   //需要rewrite重写的,
      }
    }
  }
}
