import { SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILED, CLEAR_AUTH_STATE, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_USER } from "../actions/actionType";
import { getUserDetails, isUserAuthenticated, isUserCustomer, isUserVendor } from "../../helpers/utils";

const userInfo = getUserDetails();
const isAuthenticated = isUserAuthenticated();
const isVendor = isUserVendor();
const isCustomer = isUserCustomer();

const initialState = { 
    user:userInfo,
    isAuthenticated:isAuthenticated,
    isVendor:isVendor,
    isCustomer:isCustomer,
    isLocated:false,
    error:null,
    success:false,
    inProgress:false
}

export default function auth(state=initialState, action){
    switch (action.type){
        case SIGN_UP_START:
        case LOGIN_START:
            return{
                ...state,
                inProgress:true,
                success:false,
            }
        case SIGN_UP_SUCCESS:
            return{
                ...state,
                inProgress:false,
                success:true,
            }
        case SIGN_UP_FAILED:
        case LOGIN_FAILED:
            return{
                ...state,
                inProgress:true,
                success:false,
                error:action.error
            }
        case LOGIN_SUCCESS:
            console.log("LOGIN_SUCCESS : ", action.vendor, action.customer);
            return{
                ...state,
                inProgress:false,
                success:true,
                isAuthenticated:true,
                isLocated:false,
                isVendor:action.vendor,
                isCustomer:action.customer,
            }
        case LOGOUT_USER:
            return{
                ...state,
                isAuthenticated:false,
                isVendor:null,
                isCustomer:null,
                isLocated:false,
            }
        case CLEAR_AUTH_STATE:
            return{
                ...state,
                inProgress:false,
                success:false,
                error:null,

            }
        default:{
            return{
                ...state
            }
        }
    }
}