const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

let cssConfig = {  
  test: /\.scss$/i,  
  use: [
    'css-loader',  
    'sass-loader' 
  ] 
} 

let pages = fse.readdirSync('./app')
                .filter(function(file){  
                  return file.endsWith('.html')
                }) 
                .map(function(page){
                  return new HtmlWebpackPlugin({ 
                    filename: page,
                    template: `./app/${page}`
                  })
                })
  
 
// for both "dev" and "build"
let config = {
  entry: './app/src/scripts/app.js',          
  plugins : pages,
  module: {                                                
    rules: [  
      cssConfig
    ]
  }   
}


// for "dev"
if(currentTask == 'dev'){
    config.mode = 'development'
 
    config.output = { 
      filename: 'bundled.js',
      path: path.resolve(__dirname, 'app')
    }    
    
    config.devServer = {      
      before: function(app, server){
        server._watch('./app/**/*.html')  
      },
      contentBase: path.join(__dirname, 'app'),
      hot: true,   
      port: 3000,   
      host: '0.0.0.0'     
    }

    cssConfig.use.unshift('style-loader')
}


// for "build"
if(currentTask == 'build'){
    config.mode = 'production' 

    config.module.rules.push({
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    })

    config.output = { 
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'docs')
    }   

    config.optimization = {
      splitChunks: {chunks: 'all'}
    }
 
    cssConfig.use.unshift(MiniCssExtractPlugin.loader)

    config.plugins.push(
        new CleanWebpackPlugin(), 
        new MiniCssExtractPlugin({filename:'styles.[chunkhash].css' }),
        )
}   
   

module.exports = config