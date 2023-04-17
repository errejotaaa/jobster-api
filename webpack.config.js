const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      querystring: false,
      buffer: false,
      os: false,
      util: false,
      url: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./client/build"),
          to: path.resolve(__dirname, "./dist"),
        },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "./client/build", "index.html"),
    // }),
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true,
    port: 8000,
    // proxy: {
    //   "/api": "http://localhost:3000",
    // },
  },
  mode: "production",
};
