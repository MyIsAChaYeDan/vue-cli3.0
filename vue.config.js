// const querystring = require("querystring");
module.exports = {
    //基本路径
    publicPath: './',
    //输出打包目录
    outputDir:'dist',
    //静态资源目录
    assetsDir:'static',
    //html输出路径
    indexPath:'index.html',
    //文件名是否hash
    filenameHashing:false,
    //多页模式 默认''单页
    // pages:{
    //     index:{
    //         entry:'src/index/main.js',//page的入口文件
    //         template:'public/index.html',//模板文件
    //         filename:'index.html',//在dist/index.html的输出文件
    //         title:'Index page',//网站title
    //         chunks:['chunk-vendors','chunk-common','index'] //提取出来的chunk 和 vendors-chunk
    //     }
    // },
    lintOnSave:false,//是否开启eslint校验
    runtimeCompiler:false,//是否使用包含运行时编译器的 Vue 构建版本
    transpileDependencies:[],//是否让babel-loader转译 node_modules 中的文件 [element ui]
    productionSourceMap:false,//是否需要打包后产生source map 生产环境不需要
    crossorigin:'',//设置生成html的中 script的 crossorigin 属性 <script crossorigin src="http://127.0.0.1:8081/index.js"></script>
    integrity:false,//设置生成html的中 script的  Subresource Integrity 属性 增加安全性
    configureWebpack:config => { //是否合并配置
        // config.entry.app = ["babel-polyfill", "./src/main.js"]; //ie兼容es6
        if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
        } else {
          // 为开发环境修改配置...
        }
        // resolve: {
        //     alias: {
        //         querystring: 'querystring-browser'
        //     }
        // }
    },
    chainWebpack: config => { //是否修改config配置
        // config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
        //     // 修改它的选项...
        //     return options
        // })
        // config.resolve.alias.set('querystring', 'querystring-browser')
        if (process.env.npm_config_report) {
            config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin) //webpack可视化
        }
    },
    css:{
        // requireModuleExtension:false, //项目中引入css import styles from './foo.module.css' 需加入 '.module' 如不想加 则设置为false 会影响第三方插件样式
        extract:false,//是否将组件中css代码提取到一个独立的css文件夹中 开发环境false 生产环境true
        sourceMap:false,//是否需要打包后产生source map 生产环境不需要
        loaderOptions:{
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        }
    },
    devServer:{ //代理
        proxy:{
            '/api': {
                target: 'http://192.168.0.213:9126/',
                // target: 'https://sms.puxinwangxiao.com/api/',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': ''
                // }
            }
        }
    },
    // parallel:false,//？？？？
    pwa:{},//项目缓存 无网络也可访问
    pluginOptions:{ //插件配置

    },
  }