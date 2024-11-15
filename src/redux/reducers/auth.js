import { SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILED, CLEAR_AUTH_STATE } from "../actions/actionType";
import { getUserDetails, isUserAuthenticated } from "../../helpers/utils";

const userInfo = getUserDetails();
const isAuthenticated = isUserAuthenticated()

const initialState = { 
    user:userInfo,
    error:null,
    success:false,
    isAuthenticated:isAuthenticated,
    inProgress:false,
}


export default function auth(state=initialState, action){
    switch (action.type){
        case SIGN_UP_START:
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
            return{
                ...state,
                inProgress:true,
                success:false,
                error:action.error
            }
        case CLEAR_AUTH_STATE:
            return{
                ...state,
                inProgress:false,
                success:true,
                error:null,
            }
        default:{
            return{
                ...state
            }
        }
    }
}