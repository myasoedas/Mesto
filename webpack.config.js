const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './scripts/index.js' },
  output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'index.js',
      publicPath: ''
},
  mode: 'development',
devServer: {
  contentBase: path.resolve(__dirname, './dist'),
  compress: true,
  port: 8080,
  open: true
},
  module: {
  rules: [ // rules — это массив правил
    // добавим в него объект правил для бабеля
    {
      // регулярное выражение, которое ищет все js файлы
      test: /\.js$/,
      // при обработке этих файлов нужно использовать babel-loader
      use: 'babel-loader',
      // исключает папку node_modules, файлы в ней обрабатывать не нужно
      exclude: '/node_modules/'
    },
    {
      // регулярное выражение, которое ищет все файлы с такими расширениями
      test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|ico)$/,
      type: 'asset/resource'
    },
    {
      // применять это правило только к CSS-файлам
      test: /\.css$/,
      // при обработке этих файлов нужно использовать
      // MiniCssExtractPlugin.loader и css-loader
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader'
      }]
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(), // использовали плагин
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ]
};
