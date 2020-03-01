import { LOADER } from "../_constants"

export function snackBarPayload(payload){ 
  return {
    type: LOADER.SNACK_BAR,
    payload
  }
}
