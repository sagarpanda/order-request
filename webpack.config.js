var path = require("path");

var DIST_DIR = path.resolve(__dirname, "public");
var SRC_DIR = path.resolve(__dirname, "reactjs");

var config = {
    entry: {
        l1: SRC_DIR + "/L1Index.js",
        l2: SRC_DIR + "/L2Index.js",
        l3: SRC_DIR + "/L3Index.js"
    },
    output: {
        path: DIST_DIR + "/js",
        filename: "[name].bundle.js",
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