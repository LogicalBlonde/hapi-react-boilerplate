const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')

exports.devServer = ({host, port}  = {} ) => ({
  devServer: {
    //Enable history API fallback so HTML5 History API based routing works.  Good for more complex setups
    historyApiFallback:true,
    //Display only errors to reduce the amount of output (or turn it to true, up to you!)
    stats: 'errors-only',
    hot: true,
    host, //defaults to localhost
    port,//defaults to 8080
    overlay:true
  },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
      },
    ],
  },
});

exports.loadImages = ({include, exclude, options} = {} ) =>({
  module:{
    rules: [
      {
        test: /\.(jpg|png|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options
        },

      },
    ]
  }
})

exports.loadSVG = ({include, exclude, options} = {} ) =>({
  module:{
    rules: [
      {
        test: /\.svg$/,
        include,
        exclude,
        use: {
          loader: 'svg-sprite-loader?' + JSON.stringify({
            name: '[name]_[hash]',
            prefixize: true
          })
        },

      },
    ]
  }
})

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavascript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: new ExtractTextPlugin('styles.css').extract({
          use: ['style-loader', 'css-loader'],
        })
      },
    ],
  },
});

exports.loadLess = ()=>({
  module: {
    rules: [
      {
        test:/\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      }
    ]
  }
})

exports.generateSourceMaps = ({type})=>({
  devtool: type,
})

exports.extractBundles = (bundles) => ({
  plugins: bundles.map((bundle) => (
    new webpack.optimize.CommonsChunkPlugin(bundle)
  )),
})

exports.clean = (path)=>({
  plugins: [
    new CleanWebpackPlugin([path])
  ]
})

exports.minifyJavascript = () => ({
  plugins: [
    new BabiliPlugin()
  ]
})