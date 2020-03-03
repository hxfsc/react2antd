const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin")

const webpack = require("webpack")

module.exports = {
  entry: [path.resolve(__dirname, "../src/index.tsx")],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },

  module: {
    rule: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            name: "[hash:8].[name].[ext]",
            options: {
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
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html")
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[hash].css"
    }),

    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
    })
  ]
}
