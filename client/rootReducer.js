import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import mainStore from './reducers/mainStore';
import auth from './reducers/auth';

export default combineReducers({
    mainStore,
    flashMessages,
    auth
});
