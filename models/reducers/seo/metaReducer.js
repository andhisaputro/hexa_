import { META } from "../../../actions/_constants"


const initialState = {
  title : "Home Page",
  description : "saputroandhi.com",
  keywords : "saputroandhi.com",
  image :  "saputroandhi.com",
  og_description : "saputroandhi.com",
  og_title : "saputroandhi.com",
  og_image : "saputroandhi.com",
  og_url : "saputroandhi.com",
  og_type : "website"
}

export const metaReducer = (state = initialState, action) => {
  switch (action.type) {
    case META.TITLE:
      return Object.assign({}, state, {
        title : action.string
      });
    case META.FREE_VALUE :
      let data = action.data;
      return Object.assign({}, state, {
        [data.key] : data.value,
      });
    default:
    return state
  }
}
