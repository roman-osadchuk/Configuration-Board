import { NEW_DATA, UPDATE_SITE_PREF, UPDATE_SITE_INFO } from './types';

export const newData = data => {
    return {
        type: NEW_DATA,
        data
    }
};

export const updateBodyPref = (data, index) => {
    return {
        type: UPDATE_SITE_PREF,
        data,
        index
    }
};

export const updateInfo = (data, index) => {
    return {
      type: UPDATE_SITE_INFO,
      data,
      index
    }
};
