const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Wasvish")
    }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin()
  ]
};
