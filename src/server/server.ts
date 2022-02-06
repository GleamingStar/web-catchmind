import express from 'express';
import { webpack } from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import session from 'express-session';

const PORT = 8080;

const app = express();

if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.client.dev');
  const compiler = webpack(config);
  app.use(devMiddleware(compiler, { publicPath: config.output.publicPath }));
  app.use(hotMiddleware(compiler, { path: '/__reload' }));
}
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log('SERVER CONNECTED'));
