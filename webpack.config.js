const path = require("path")
const webpack = require("webpack")

const sourceDir = "./src"
const outDir = path.join(__dirname, "./public")
//const dllManifest = path.join(outDir, 'vendor-manifest.json')

module.exports = {

  devtool: "cheap-module-source-map",

  entry: [
    //"webpack-dev-server/client?http://localhost:8000/",
    //"webpack/hot/dev-server",
    path.join(__dirname, "./src/index")
  ],

  output: {
    path: outDir,
    filename: "bundle.js",
    publicPath: "/public/"
  },

  resolve: {
    extensions: ["", ".js", ".ts", ".tsx"],
    root: path.join(__dirname, sourceDir),
    modulesDirectories: ['node_modules']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"' + process.env.NODE_ENV + '"'
      }
    }),
    new webpack.NoErrorsPlugin()
    /*new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, ".."),
      manifest: require(dllManifest)
    })*/
  ],

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ["ts-loader"],
        include: path.join(__dirname, sourceDir),
        exclude: /node_modules/
      }
    ]
  }

}
