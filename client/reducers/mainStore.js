import { NEW_DATA, UPDATE_SITE_PREF, UPDATE_SITE_INFO } from '../actions/types';

const DEFAULT_STATE = {
    preferenceGroups: [],
    sitePreferences: []
};


export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {

        case NEW_DATA:
            state = action.data;
            return state;

        case UPDATE_SITE_PREF:
            state.sitePreferences[action.index].values = action.data;
            return state;

        case UPDATE_SITE_INFO:
            state.sitePreferences[action.index].values = action.data;
            return state;

        default:
            return state;
    }
}
