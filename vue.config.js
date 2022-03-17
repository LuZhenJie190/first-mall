
module.exports={
    // 关闭eslint检测
    lintOnSave:false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8082/',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': ''//重写,
                }
            }
        }
}
}