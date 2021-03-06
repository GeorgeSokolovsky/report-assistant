const { resolve } = require('path');
const AoTPlugin = require('@ngtools/webpack').AotPlugin;
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const html = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const circular = require('circular-dependency-plugin');
const nodeModules = resolve(__dirname, 'node_modules');
const entryPoints = ['inline', 'polyfills', 'vendor', 'app'];

module.exports = function (options, webpackOptions) {
  options = options || {};

  let config = {
    node: {
      __dirname: false,
      fs: "empty"
    },
    target: 'electron-renderer'
  };

  config = webpackMerge({}, config, {
    entry: getEntry(options),
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: ['node_modules', nodeModules]
    },
    resolveLoader: {
      modules: [nodeModules, 'node_modules']
    },
    output: {
      path: root('build')
    },
    module: {
      rules: [
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.(jp?g|png|gif)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'images/[hash].[ext]' } },
        { test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/, loader: 'file-loader', options: { hash: 'sha512', digest: 'hex', name: 'fonts/[hash].[ext]' } }
      ]
    },
    plugins: [
      new copy([{ context: './src/assets/public', from: '**/*' }])
    ]
  });

  config = webpackMerge({}, config, {
    output: {
      path: root('build'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js'
    },
    plugins: [
      new html({
        template: root('src/index.html'),
        output: root('build'),
        chunksSortMode: sort = (left, right) => {
          let leftIndex = entryPoints.indexOf(left.names[0]);
          let rightindex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
            return 1;
          } else if (leftIndex < rightindex) {
            return -1;
          } else {
            return 0;
          }
        }
      })
    ],
    devServer: {
      historyApiFallback: true,
      port: 8000,
      open: true,
      hot: false,
      inline: true,
      stats: { colors: true, chunks: false },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
  });

  if (webpackOptions.p) {
    config = webpackMerge({}, config, getProductionPlugins());
    config = webpackMerge({}, config, getProdStylesConfig());
  } else {
    config = webpackMerge({}, config, getDevelopmentConfig());
    config = webpackMerge({}, config, getDevStylesConfig());
  }

  if (options.aot) {
    console.log(`Running build with AoT compilation...`)

    config = webpackMerge({}, config, {
      module: {
        rules: [{ test: /\.ts$/, loader: '@ngtools/webpack' }]
      },
      plugins: [
        new AoTPlugin({
          mainPath: root('src/main.ts'),
          exclude: [],
          tsConfigPath: root('src/tsconfig.app.json')
        })
      ]
    });
  } else {
    config = webpackMerge({}, config, {
      module: {
        rules: [{ test: /\.ts$/, loader: '@ngtools/webpack' }]
      },
      plugins: [
        new AoTPlugin({
          mainPath: 'main.ts',
          exclude: [],
          tsConfigPath: root('src/tsconfig.app.json'),
          skipCodeGeneration: true
        })
      ]
    });
  }

  return config;
}

function root(path) {
  return resolve(__dirname, path);
}

function getEntry(options) {
  if (options.aot) {
    return { app: root('src/main.ts') };
  } else {
    return { app: root('src/main.ts'), polyfills: root('src/polyfills.ts') };
  }
}

function getDevelopmentConfig() {
  return {
    module: {
      rules: [
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [nodeModules] }
      ]
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map[query]',
        moduleFilenameTemplate: '[resource-path]',
        fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
        sourceRoot: 'webpack:///'
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name: 'inline'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['app'],
        minChunks: module => {
          return module.resource && module.resource.startsWith(nodeModules)
        }
      })
    ]
  };
}

function getProductionPlugins() {
  return {
    plugins: []
  };
}

function getDevStylesConfig() {
  return {
    module: {
      rules: [
        { test: /\.css$/, use: ['to-string-loader', 'style-loader', 'css-loader'] },
        { test: /\.scss$|\.sass$/, use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader'] },
      ]
    }
  };
}

function getProdStylesConfig() {
  return {
    plugins: [
      new extract('css/[name].css')
    ],
    module: {
      rules: [
        { test: /\.css$/, use: ['to-string-loader', 'style-loader', 'css-loader'] },
        { test: /\.scss$|\.sass$/, use: ['to-string-loader', 'style-loader', 'css-loader', 'sass-loader'] },
      ]
    }
  };
}
