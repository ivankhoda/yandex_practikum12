const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const { PORT = 3000 } = process.env;
const app = express();


const routeToCards = require('./routes/cards');
const routeToUsers = require('./routes/users');

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});

app.use(express.static('./public'));
// app.get('*', (req, res) => {
//   res.sendFile(HTML_FILE)
// })


app.use('/', routeToCards, routeToUsers);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// Serve the files on port 3000.
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!\n');
// });