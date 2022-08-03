module.exports = {
    // 关闭eslint检测
    lintOnSave: false,
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://43.138.152.179:8800/', //后端接口地址
                changeOrigin: true,
            }
        }
    }
}