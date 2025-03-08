import { requestMaker, requestOptionCreator } from "../../helpers/request";
import { API_URL } from "../../helpers/urls";

import {
    FETCH_CART_START,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILED,
    CLEAR_CART_STATE
} from "./actionType";

export function fetchCartStart(){
    return{
        type:FETCH_CART_START
    };
}

export function fetchCartSuccess(cart, successMessage){
    return{
        type:FETCH_CART_SUCCESS,
        cart:cart,
        message:successMessage
    };
}

export function fetchCartFailed(errorMessage){
    return{
        type:FETCH_CART_FAILED,
        message:errorMessage
    };
}

export function clearCartState(){
    return{
        type:CLEAR_CART_STATE
    }
}

export const fetchUserCart = (requestPayload) => async(dispatch) =>{
    dispatch(fetchCartStart);
    const requestOptions = requestOptionCreator("GET", requestPayload, true);
    requestMaker(API_URL.getAllVendor(), requestOptions).then((response) => {
        if(response.isError){
            dispatch(fetchCartFailed("Unable to fetch Cart Details"));
        }else{
            dispatch(fetchCartSuccess(response.data, "Cart data loaded successfully"))
        }
        setTimeout(() => {
            dispatch(clearCartState());
          }, 3000);
    })
}