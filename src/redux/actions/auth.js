import { SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILED, CLEAR_AUTH_STATE } from "./actionType";
import { requestOptionCreator, requestMaker } from "../../helpers/request";
import { API_URL } from "../../helpers/urls";

export function startSignUp() {
  return {
    type: SIGN_UP_START,
  };
}

export function successSignUp() {
  return {
    type: SIGN_UP_SUCCESS,
  };
}

export function failedSignUp(errorMessage) {
  return {
    type: SIGN_UP_FAILED,
    error: errorMessage,
  };
}

export function clearAuthState(){
    return{
      type:CLEAR_AUTH_STATE,
    }
}

export const userSignUp = (requestPayload) => async(dispatch) => {
  dispatch(startSignUp());
  const requestOptions = requestOptionCreator("POST", requestPayload, false)
  const response = await requestMaker(API_URL.signUp(), requestOptions)
  if(response.isError){
    dispatch(failedSignUp("some error occurred"));
  }else{
    dispatch(successSignUp());
  }
  dispatch(clearAuthState());
}

