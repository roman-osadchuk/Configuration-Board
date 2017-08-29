import { createStore } from 'redux';
//import preload from '../../preloadTestData.json';
import reducer from './reducers.js';

var store = createStore(reducer);

export default store;
