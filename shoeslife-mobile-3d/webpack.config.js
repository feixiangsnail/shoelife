
var webpack = require('webpack')
    ,HtmlwebpackPlugin = require('html-webpack-plugin')
    ,packageInfo = require('./package.json')
    ,path = require('path')
    ,ROOT_PATH = path.resolve(__dirname)
    ,APP_PATH = path.resolve(ROOT_PATH, 'src')
    ,BUILD_PATH = path.resolve(ROOT_PATH, 'build/'+packageInfo.version)
    ,serverConfig = require('./dev.server.config.js')
;
module.exports = {
    entry:APP_PATH,
    output:{
        path:BUILD_PATH,
        filename:'assets/bundle.js'
    },
    devServer:serverConfig,
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                include: APP_PATH
            },
            {
                test: /\.less$/, 
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: '400000',
                    name: 'assets/img/[name]_[hash:7].[ext]'
                }
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: APP_PATH,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({
            inject:true,
            hash:true,
            template:'src/index.html',
            minify:{
                removeComments:true,
                collapseWhitespace:false
            }
        }),
        new webpack.ProvidePlugin({
            THREE:APP_PATH+'/assets/js/threeShoe.js',
            'window.THREE':APP_PATH+'/assets/js/threeShoe.js'
        })
    ]
}