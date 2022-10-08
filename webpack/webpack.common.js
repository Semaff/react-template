const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCSSExtractLoader = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    // We can resolve multiple bundles
    main: path.resolve(__dirname, "..", "./src/index.tsx")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@styles": path.resolve(__dirname, "..", "./src/styles")
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        parallel: true
      })
    ]
  },
  module: {
    rules: [
      /*
        For ts/js/tsx/jsx loading
        ============================
      */
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      /*
        For CSS loading
        =================
      */
      {
        test: /\.css$/,
        use: [MiniCSSExtractLoader.loader, "css-loader"]
      },
      /*
        For S[AC]SS loading
        =================
      */
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCSSExtractLoader.loader, "css-loader", "sass-loader"]
      },
      /*
       For Images loading
       ============================
      */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource"
      },
      /*
        For SVG files loading
        ============================
      */
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: "asset/inline"
      },
      /*
        For XML files loading
        ============================
      */
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      }
    ]
  },
  output: {
    // [content-hash] - hashed id for bundle by it's content (if contents are changed, then hash will too)
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "..", "./build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
      minify: "auto",
      cache: true
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "..", "./src/static"),
          to: path.resolve(__dirname, "..", "./build/static")
        }
      ]
    }),
    new MiniCSSExtractLoader({
      filename: "[name].[contenthash].css"
    })
  ]
};
