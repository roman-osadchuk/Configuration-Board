var ReactDOM = require('react-dom');
var React = require('react');
var MainTable = require('./components/MainTable.jsx');

import { Provider } from 'react-redux';
import store from './components/store.js';

ReactDOM.render(
  <Provider store={store}>
    <MainTable />
  </Provider>,
  document.getElementById('root'));
