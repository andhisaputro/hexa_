import { AUTH } from "../_constants"
import getConfig from 'next/config'
import axios from "axios"
import 'isomorphic-fetch'
import Router from 'next/router'
import Cookies from 'js-cookie'
import I18n from '../../lib/translations/i18n';
import { snackBarPayload} from '../loader/loaderAction' 

const { publicRuntimeConfig } = getConfig()
const { API_URL , API_KEY , API_SECRET} = publicRuntimeConfig


export function setUserDetail(payload){
  return {
    type: AUTH.SET_USER_DETAIL,
    payload
  }
}

export function setLoginEmail(string){
  return {
    type: AUTH.LOGIN_EMAIL,
    string
  }
}

export function setLoginPassword(string){
  return {
    type: AUTH.LOGIN_PASSWORD,
    string
  }
}

export function handleSubmitLogin(email,password){
  return (dispatch) => {
    // dispatch(isAjaxLoader(true));
    let  endpoint = '/api/login'
    let data = new FormData();
    data.append('email', email)
    data.append('password', password)

    let  headers = {
        headers : { 
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
    }

    axios.post(endpoint,data,headers)
    .then(function (response){
        dispatch(snackBarPayload({'type' : 'success' , 'text' : 'Berhasil Login ! , Mengalihkan...'})) 

      const data = response.data.data

      dispatch(setUserDetail(data)) 

      Cookies.set('user_detail',data,{ expires: 3 })

      setTimeout(() => {
        Router.push('/home')
      },300);

    })
    .catch(function (error) { 
      dispatch(snackBarPayload({'type' : 'warning' , 'text' : 'Email / Password salah'})) 
    })
  }
}

export function isEmailVerified(bool){
  return {
    type: AUTH.EMAIL_VERIFIED,
    bool
  }
}
 