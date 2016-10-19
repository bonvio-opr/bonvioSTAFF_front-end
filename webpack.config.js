const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4100;
const HOST = process.env.HOST || "localhost";

const webpack = require("webpack");
const BowerWebpackPlugin = require("bower-webpack-plugin");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = webpack.DefinePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ProvidePlugin = webpack.ProvidePlugin;
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const rimraf = require("rimraf");

const path = require("path");
var paths = {
    context: path.join(__dirname, "sources"),
    dist: path.join(__dirname, "dist")
};

var webpackConfig = {
    context: paths.context,
    entry: {
        app: "./app/index",
        vendor: "./vendor"
    },
    output: {
        publicPath: "/",
        path: paths.dist,
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(bower_components|node_modules)/,
                loader: "ng-annotate!babel"
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract("style", "css")
            },
            {
                test: /\.(png|jpe|gif|svg|woff|ttf|eot|ico)([?]?.*)$/,
                include: /(bower_components|node_modules)/,
                loader: "url?name=[1][name].[ext]&limit=524288&regExp=(bower_components|node_modules)/(.*)"
            },
            {
                test: /\.(png|jpe|gif|svg|woff|ttf|eot|ico)([?]?.*)$/,
                exclude: /(bower_components|node_modules)/,
                loader: "url?name=[path][name].[ext]&limit=524288"
            },
            {
                test: /\.(html|htm)$/,
                loader: "html"
            },
            {
                test: /angular\.js$/,
                loader: 'exports?angular'
            }

        ]
    },
    resolve: {
        modulesDirectories: ["bower_components", "node_modules"],
        extensions: ["", ".js"]
    },
    plugins: [
        new BowerWebpackPlugin({
            includes: /\.(js|css)$/
        }),
        new CommonsChunkPlugin({
            name: [
                "app", "vendor"
            ],
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.context, "index.html")
        }),
        new DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            "window.jQuery": "jquery"
        }),
        new ExtractTextWebpackPlugin("[name].bundle.css"),
        {
            apply: (compiller) => (rimraf.sync(compiller.options.output.path))
        }

    ]
};

if (NODE_ENV == "development") {
    webpackConfig.devServer = {
        contentBase: paths.dist,
        host: HOST,
        port: PORT,
        inline: true,
        historyApiFallback: true
    };
    webpackConfig.devtool = "cheap-inline-module-source-map";
    webpackConfig.watch = true;
}

if (NODE_ENV == "production") {
    webpackConfig.plugins.push(new UglifyJsPlugin({
        compress: {
            drop_console: true,
            warnings: false
        }

    }));
}


module.exports = webpackConfig;

