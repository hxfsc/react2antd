const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const webpack = require("webpack")

module.exports = {
  entry: [path.resolve(__dirname, "../src/index.tsx")],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }]
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
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
    })
  ]
}
