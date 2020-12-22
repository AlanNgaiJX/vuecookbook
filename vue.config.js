module.exports = {
    publicPath:'/temp/',
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
            }
        }
    }
};
