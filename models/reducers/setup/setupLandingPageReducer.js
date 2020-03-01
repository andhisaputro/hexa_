import { SETUP } from "../../../actions/_constants"

const initialState = {
  lang_list : [
    {"name" : "English", "code" : "EN" },
    {"name" : "Indonesia", "code" : "ID" }
  ],
  lang : 0,
  is_mobile_app : false
}

export const setupLandingPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETUP.LANG:
      return Object.assign({}, state, {
        lang : action.lang
      });
    default:
    return state
  }
}
