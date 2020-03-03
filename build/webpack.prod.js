const common = require("./webpack.common")
const merge = require("webpack-merge")
const webpack = require("webpack")

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        environment: JSON.stringify("prod")
      }
    })
  ]
})
