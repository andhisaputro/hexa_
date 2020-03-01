import { SETUP } from "../_constants"
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const {
  APP_COLOR_ONE,
  APP_COLOR_TWO,
  FILE_HOST,
  API_URL,
  API_KEY,
  API_SECRET,
} = publicRuntimeConfig

  export function getEnv(name){
    return (dispatch) => {
      return publicRuntimeConfig[name]; 
    }
  }

  export function setLang(id,code){
    return {
      type: SETUP.LANG,
      lang : id
    }
  }

  export function getAppColor(number){
    switch (number) {
      case 1:
        return APP_COLOR_ONE;
        break;
      case 2:
        return APP_COLOR_TWO;
        break;
      default:

    }
  }
