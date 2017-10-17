import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import auth from './routes/auth';
import data from './routes/data';

let app = express();

app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/data', data);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(8000, () => console.log('Running on localhost:8000'));
