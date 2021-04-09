module.exports = {
    // publicPath:'/temp/',
    devServer: {
        port: 8080,
        proxy: {
            "/youdao": {
                target: "https://openapi.youdao.com",
                ws: true,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/youdao": "/"
                }
            },
            "/juejin": {
                target: "https://api.juejin.cn",
                changeOrigin: true,
                headers: {
                    refer: "https://juejin.cn/",
                    origin: "https://juejin.cn"
                },
                pathRewrite: {
                    "^/juejin": "/"
                }
            }
        }
    }
};
