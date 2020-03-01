import axios from "axios"
import { snackBarPayload} from '../loader/loaderAction' 

const appHeaderProperties = { 
    'Content-Type' : 'application/x-www-form-urlencoded'
}

export const apiCall = async ({ method, url, data = "", baseURL }) => {
  let head = {
    ...appHeaderProperties,
    ...data.headers,
  };
   
  try {
    const response = await axios({
      baseURL: baseURL,
      method: method,
      url: url,
      data: data.data || "",
      headers: head || "",
      params: data.params || "",
      timeout: data.timeout || 0
    });
    
    return response.data

  } catch (error) {
    return error.response.data
  }
};