import preload from '../../preloadTestData.json';

var DEFAULT_STATE = {
  preload: preload
}

// var rootReducer = function() {
//   return DEFAULT_STATE;
//   if(!state) state = DEFAULT_STATE;
//
//   switch(action.type) {
//     default:
//       return state;
//   }
//
// }

export default function rootReducer(state=DEFAULT_STATE, action) {
  return state;
}
