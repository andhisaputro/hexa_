import { combineReducers } from 'redux';

import { metaReducer } from './seo/metaReducer';
import { setupLandingPageReducer } from './setup/setupLandingPageReducer';
import { authReducer } from './auth/authReducer';
import { loaderReducer } from './loader/loaderReducer';
       
export default combineReducers({
  metaReducer,
  setupLandingPageReducer, 
  authReducer,
  loaderReducer
});
