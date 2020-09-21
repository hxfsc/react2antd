const path = require("path")
const os = require("os")
//html文件模板
const HtmlWebpackPlugin = require("html-webpack-plugin")
//抽离样式文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
//过滤抽离样式文件警告信息
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin")
//清除生成项目文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

//antd 按需配置设置
const tsAntdConfig = require("./antd.common")

//win平台下 node_modules目录下less文件不作排除操作
const isWin32 = os.platform() === "win32"

const webpack = require("webpack")

module.exports = {
  entry: [path.resolve(__dirname, "../src/index.tsx")],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@/": path.resolve(__dirname, "../src"),
      "@/utils": path.resolve(__dirname, "../src/utils"),
      "@/routers": path.resolve(__dirname, "../src/routers"),
      "@/pages": path.resolve(__dirname, "../src/pages"),
      "@/net": path.resolve(__dirname, "../src/net"),
      "@/reducers": path.resolve(__dirname, "../src/reducers"),
      "@/epics": path.resolve(__dirname, "../src/epics")
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              experimentalWatchApi: true,
              transpileOnly: true,
              /* antd 按需加载 */
              getCustomTransformers: () => tsAntdConfig()
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: () => !isWin32 && "/node_modules/antd",
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-modules-typescript-loader", //生成css @types文件
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[local]_[hash:base64:5]"
              },
              sourceMap: true
            }
          },
          { loader: "postcss-loader" },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:8].[name].[ext]",
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: ["file-loader"]
      }
    ]
  },

  plugins: [
    //生成 css @types文件
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html")
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[hash].css"
    }),

    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order/
    })
  ]
}
