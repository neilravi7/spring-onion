import { SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILED, CLEAR_AUTH_STATE } from "./actionType";

export function startSignUp() {
  return {
    type: SIGN_UP_START,
  };
}

export function successSignUp(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user,
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