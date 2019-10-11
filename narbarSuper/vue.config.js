const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
// Temporary until we can use https://github.com/webpack/webpack-dev-server/pull/2143
module.exports = {
    // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
  chainWebpack: config => {
    config.devServer.set('inline', false)
    config.devServer.set('hot', false)
    config.externals(['vue', 'vue-router'])
      // config.resolve.alias
      //     .set("@", resolve("src"))
      //     .set("assets", resolve("src/assets"))
      //     .set("components", resolve("src/components"))
      //     .set("views", resolve("src/views"))
      //     .set("styles", resolve("src/styles"))
      //     .set("api", resolve("src/api"))
      //     .set("utils", resolve("src/utilsCom"))
      //     .set("store", resolve("src/store"))
      //     .set("router", resolve("src/router"))
      //     .set("mock", resolve("src/mock"))
      //     .set("static", resolve("static"))
      //     .set("public", resolve("public"))
  },
  filenameHashing: false,
}
