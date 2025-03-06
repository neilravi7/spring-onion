import { requestOptionCreator, requestMaker } from "../../helpers/request";
import { API_URL } from "../../helpers/urls";

import { 
  SIGN_UP_START, 
  SIGN_UP_SUCCESS, 
  SIGN_UP_FAILED, 
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CLEAR_AUTH_STATE,
  LOGOUT_USER, 
} from "./actionType";


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


export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function successLogin(vendor, customer) {
  console.log("Login success: ", vendor, customer);

  return {
    type: LOGIN_SUCCESS,
    vendor:vendor,
    customer:customer
  };
}

export function failedLogin(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function clearAuthState(){
    return{
      type:CLEAR_AUTH_STATE,
    }
}

export function logoutUser(){
  return{
    type:LOGOUT_USER,
  }
}

export const userSignUp = (requestPayload) => async(dispatch) => {
  dispatch(startSignUp());
  const requestOptions = requestOptionCreator("POST", requestPayload, false)
  const response = await requestMaker(API_URL.signUp(), requestOptions)
  if(response.isError){
    dispatch(failedSignUp(response.message));
  }else{
    dispatch(successSignUp());
  }
  setTimeout(() => {
    dispatch(clearAuthState());
  }, 5000);
}


export const userLogin = (requestPayload) => async(dispatch) => {
  dispatch(startLogin());
  const requestOptions = requestOptionCreator("POST", requestPayload, false)
  const response = await requestMaker(API_URL.signIn(), requestOptions)
  if(response.isError){
    dispatch(failedLogin(response.message));
  }else{
    const {isVendor, isCustomer } = response.data.userInfo.role;

    dispatch(successLogin(isVendor, isCustomer));
    window.localStorage.setItem("access", response.data.access);
    window.localStorage.setItem("refresh", response.data.refresh);
    window.localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo));
  }
  setTimeout(() => {
    dispatch(clearAuthState());
  }, 5000);
}