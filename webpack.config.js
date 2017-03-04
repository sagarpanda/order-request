var path = require("path");

var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "reactjs");

var config = {
    entry: SRC_DIR + "/index.js",
    output: {
        path: DIST_DIR + "/js",
        filename: "bundle.js",
        publicPath: "/js/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    }
};

module.exports = config;