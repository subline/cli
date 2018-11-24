'use strict'
const path = require('path')
const glob = require('glob')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const svgoConfig = require('../config/svgo.config.json')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getCommonPath(name){
    return path.resolve(__dirname, '../src/common/'+name);
}

function getFilemap() {
    let res = {}
    let reg = /\/(\w+).js/
    glob.sync(resolve("src/common/*.js")).forEach(file => {
        if (reg.test(file)) {
            res[RegExp.$1] = file
        }
    })
    return res
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'svg': resolve("src/assets/svg/index.vue"),
            ...getFilemap()
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                },
                exclude:[resolve('src/assets/svg/icon')]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [resolve('src')], // 指定检查的目录
                options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
                    formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                }
            },
            {
                test: /\.svg$/,
                include:[resolve('src/assets/svg/icon')],
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: 'svg-[name]'
                        }
                    },
                    {
                        loader: 'svgo-loader',
                        options: svgoConfig
                    }
                ]
            }
        ]
    },
    plugins: [
        new StyleLintPlugin({
            files: ['./src/**/*.{less,vue}']
        }),
        new SpritesmithPlugin({
            src: {
                cwd: resolve("src/assets/images/icon"),
                glob: 'icon-*.png'
            },
            target: {
                image: path.resolve(__dirname, '../src/assets/images/sprite.png'),
                css: [
                    [path.resolve(__dirname, '../src/assets/less/icon.less'),{format:'handlebars_based_template'}]
                ]
            },
            apiOptions: {
                cssImageRef: "../images/sprite.png"
            },
            customTemplates:{
                handlebars_based_template:function (data) {
                    if(data.sprites.length){
                        var shared = ".icon { background-image: url('I'); }".replace('I', data.sprites[0].image);

                        var perSprite = data.sprites.map(function (sprite) {
                            return '.N { display: inline-block; width: Wpx; height: Hpx; background-position: Xpx Ypx; vertical-align: top; }'
                                .replace('N', sprite.name)
                                .replace('W', sprite.width)
                                .replace('H', sprite.height)
                                .replace('X', sprite.offset_x)
                                .replace('Y', sprite.offset_y);
                        }).join('\r\n');

                        return shared + '\r\n' + perSprite;
                    } else {
                        return '#no-css { background-position: 0 0; }'

                }
            }
        }
        })
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
