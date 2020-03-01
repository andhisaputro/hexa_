import { META } from "../_constants"


export function setTitlePage(string){
  return {
    type: META.TITLE,
    string
  }
}

export function metaChange(key,value){
    let data = []
    data['key'] = key
    data['value'] = value
    return {
      type: META.FREE_VALUE,
      data
    }
 }
