module.exports = {
  // 设置打包不生成.map的文件
  productionSourceMap: false,
  // 关闭eslint校验
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        // 只对请求路由以/api开头的请求进行代理转发
        // 转发的目标url
        target: "http://gmall-h5-api.atguigu.cn",
        changeOrigin: true, // 支持跨域
      },
    },
  },
};
