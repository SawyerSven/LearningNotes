//  单入口文件

// "use strict";

// const path = require("path");

// module.exports = {
//   entry: "./src/index.js", // 入口文件
//   output: {
//     filename: "bundle.js", // 打包后的文件名称
//     path: path.resolve("dist") // 打包后的目录，必须是绝对路径
//   },
//   module: {}, // 处理对应模块
//   plugins: [], // 对应的插件
//   devServer: {}, // 开发服务器配置
//   mode: "development" //模式配置
// };

/* "use strict";

const path = require("path");

module.exports = {
  // 1. 写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
  // entry:['./src/index.js','./src/login.js'],
  // 2. 真正实现多入口和多出口需要写成对象的方式
  entry: {
    index: "./src/index.js",
    login: "./src/login.js"
  },
  output: {
    // 1.filename:'bundle.js',
    // 2. [name]就可以将出口文件名和入口文件名一一对应
    filename: "[name].js",
    path: path.resolve("dist")
  },
  module: {}, // 处理对应模块
  plugins: [], // 对应的插件
  devServer: {}, // 开发服务器配置
  mode: "development" //模式配置
};
 */

/* "use strict";

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    // 添加hash可以防止文件缓存，每次都会生成四位的hash串
    filename: "bundle.[chunkhash].js",
    path: path.resolve("dist")
  },
  module: {},
  plugins: [
    new HtmlWebpackPlugin({
      // 用哪个html作为模板
      template: './src/index.html',
      hash:true, // 会在打包好的bundle.js后面加上hash串
    })
  ],
  devServer: {},
  mode: "development"
};
 */

// "use strict";

// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// const styleLess = new ExtractTextWebpackPlugin('css/style.css');
// const resetCss = new ExtractTextWebpackPlugin('css/reset.css');

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "[name].js",
//     path: path.resolve("dist")
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/, // 解析css
//         use: ExtractTextWebpackPlugin.extract({
//           use: "css-loader"
//         }) // 从右向左解析
//         /*
//           也可以这样写，这种方式方便写一些配置参数

//           use:[
//             {loader:'style-loader'},
//             {loader:'css-loader'},
//             {loader:'less-loader'}
//           ]
//          */
//       },
//       {
//         test: /\.less$/,
//         use:ExtractTextWebpackPlugin.extract({
//           use:['css-loader','less-loader']
//         })
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       // 用哪个html作为模板
//       template: "./src/index.html",
//       hash: true
//     }),
//    styleLess,
//    resetCss
//   ],
//   devServer: {},
//   mode: "development"
// };

"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist")
  },
  resolve:{
    // 别名
    alias:{
      $:'./src/'
    },
    //省略后缀
    extensions:['.js','.json','.css']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback:"style-loader",
          use:['css-loader','postcss-loader']
        })
      },
      {
        test:'/\.js$/',
        use:'babel-loader',
        include:/src/,  //只转化src目录下的js
        exclude:/node_modules/  // 排除掉node_modules,优化打包速度
      },
      {
        test: /\.(jpeg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: "images" // 存放图片的目录
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(eot||ttf||woff||svg)$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist'),

    new ExtractTextWebpackPlugin({
      filename:'style.css'
    }),

    new HtmlWebpackPlugin({
      template:'./src/index.html',
      hash:true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase:'./dist',
    host:'localhost',
    port:3000,
    open:true,
    hot:true
  },
  mode: "development"
};
