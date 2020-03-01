import {
  LOADER
} from "../../../actions/_constants"

const initialState = {
  snack_bar : false
}

export const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER.SNACK_BAR:
      return Object.assign({}, state, {
        snack_bar: action.payload
      });
    break;
    default:
      return state
  }
}
