import express from 'express';
import { createServer } from 'http';
import { webpack } from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import setSession from 'express-session';
import { PORT } from 'shared/constant';
import setSocket from './socket/socket';

const app = express();
const server = createServer(app);

if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.client.dev');
  const compiler = webpack(config);
  app.use(devMiddleware(compiler, { publicPath: config.output.publicPath }));
  app.use(hotMiddleware(compiler, { path: '/__reload' }));
}
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

const session = setSession({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
});
app.use(session)

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

setSocket(server, session);

server.listen(PORT, () => console.log('SERVER CONNECTED'));
