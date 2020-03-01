import { AUTH } from "../../../actions/_constants"
  
const initialState = {
  login_email : '',
  login_password : '',
  email_verified : null,
  user_detail : null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN_EMAIL:
      return Object.assign({}, state, {
        login_email : action.string
      });
    case AUTH.LOGIN_PASSWORD:
      return Object.assign({}, state, {
        login_password : action.string
      });
    case AUTH.SET_USER_DETAIL:
      return Object.assign({}, state, {
        user_detail : action.payload
      });
    default:
    return state
  }
}
