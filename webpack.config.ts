import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";
import nodeExternals from "webpack-node-externals";
import { Configuration } from "webpack";
import WebpackShellPluginNext from "webpack-shell-plugin-next";
import { config } from "dotenv";

const getConfig = (
  env: { [key: string]: string },
  argv: { [key: string]: string }
): Configuration => {
  config({
    path: path.resolve(__dirname, `.env.${env.mode}`),
  });
  return {
    entry: "./app.ts",
    target: "node",
    mode: argv.mode === "production" ? "production" : "development",
    externals: [nodeExternals()],
    plugins: [
      new WebpackShellPluginNext({
        onBuildStart: {
          scripts: ["npm run clean:dev && npm run clean:prod"],
          blocking: true,
          parallel: false,
        },
        onBuildEnd: {
          //scripts: ["npm run prod"],
          blocking: false,
          parallel: true,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: "client/build", to: "client/build" }],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: "ts-loader",
          options: {},
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        src: path.resolve(__dirname, "./"),
      },
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js",
    },
    optimization: {
      moduleIds: "deterministic",
      splitChunks: {
        chunks: "all",
      },
    },
  };
};

export default getConfig;
