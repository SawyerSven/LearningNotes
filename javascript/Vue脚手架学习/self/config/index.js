"use strict";

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {},

    // Variout Dev Server settings
    host: "localhost",
    port: 8080,
    aoutoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    devtool: "cheap-module-eval-source-map",

    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html

    index: path.resolve(__dirname, "../dist"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * source maps
     */
    productionSourceMap: true,
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport:process.env.npm_config_report
  }
};
