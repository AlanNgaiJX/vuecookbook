const path = require("path");
const Timestamp = new Date().getTime(); //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳

module.exports = {
    // publicPath:'/temp/',
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: [path.resolve(__dirname, "./src/assets/css/global.scss")]
        }
    },
    chainWebpack(config) {
        config.module
            .rule("images")
            .test(/\.(png|jpeg|jpg|JPG|PNG)$/)
            .use("url-loader")
            .loader("url-loader")
            .options({
                limit: 1024 * 10, // 小于10k的图片采用baseurl，大于和等于8k的就正常打包成图片
                name: "static/[name].[ext]" //图片大于等于10k时，设置打包后图片的存放位置 name是文件名   ext是文件后缀
            });
    },
    configureWebpack: config => {
        config.resolve = {
            // 优先寻找
            extensions: [".js", ".vue", ".json", ".css"],
            // 引用别名
            alias: {
                vue$: "vue/dist/vue.esm.js",
                "@": path.resolve("src")
            }
        };

        return {
            devtool: process.env.NODE_ENV === "development" ? "#eval-source-map" : undefined, // 开发环境使用source-map，防止同名.vue调试出现怪异现象
            // npm run build-and-analyzer 触发
            plugins: process.env.BUILD_ANALYZER === "YES" ? [new BundleAnalyzerPlugin()] : [],
            // 静态资源打包添加时间戳
            output: {
                filename: `[name].${Timestamp}.js`,
                chunkFilename: `[name].${Timestamp}.js`
            }
        };
    },
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
            },
            "/egg": {
                target: "http://127.0.0.1:7001",
                changeOrigin: true,
                pathRewrite: {
                    "^/egg": "/"
                }
            }
        }
    }
};
