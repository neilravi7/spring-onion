import { requestMaker, requestOptionCreator } from "../../helpers/request";
import { API_URL } from "../../helpers/urls";

import {
    FETCH_CART_START,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILED,
    CLEAR_CART_STATE,
    ADD_ITEM_INTO_CART_START,
    ADD_ITEM_INTO_CART_SUCCESS,
    ADD_ITEM_INTO_CART_FAILED,
    REMOVE_ITEM_FROM_CART_START,
    REMOVE_ITEM_FROM_CART_SUCCESS,
    REMOVE_ITEM_FROM_CART_FAILED,
    UPDATE_CART,
} from "./actionType";


//! Fetch Cart Actions 
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

//! Add to cart actions

export function AddItemToCartStart(){
    return{
        type:ADD_ITEM_INTO_CART_START
    };
}

export function AddItemToCartSuccess(cart, message){
    return{
        type:ADD_ITEM_INTO_CART_SUCCESS,
        cart:cart,
        message:message
    };
}

export function AddItemToCartFailed(){
    return{
        type:ADD_ITEM_INTO_CART_FAILED
    };
}

//! Remove Item actions

export function removeItemToCartStart(){
    return{
        type:REMOVE_ITEM_FROM_CART_START
    };
}

export function removeItemToCartSuccess(cart, message){
    return{
        type:REMOVE_ITEM_FROM_CART_SUCCESS,
        cart:cart,
        message:message
    };
}

export function removeItemToCartFailed(){
    return{
        type:REMOVE_ITEM_FROM_CART_FAILED
    };
}

//! UPDATE CART
export function updateCart(cart){
    return{
        type:REMOVE_ITEM_FROM_CART_FAILED,
        cart:cart
    };
}


//! Server Actions

export const fetchUserCart = (requestPayload) => async(dispatch) =>{
    dispatch(fetchCartStart);
    const requestOptions = requestOptionCreator("GET", requestPayload, true);
    requestMaker(API_URL.getCart(), requestOptions).then((response) => {
        if(response.isError){
            dispatch(fetchCartFailed("Unable to fetch cart details."));
        }else{
            dispatch(fetchCartSuccess(response.data, "Cart data loaded successfully."))
        }
        setTimeout(() => {
            dispatch(clearCartState());
          }, 3000);
    })
}

export const addToCart = (requestPayload) => async(dispatch) => {
    dispatch(AddItemToCartStart());
    const requestOptions = requestOptionCreator("POST", requestPayload, true);
    requestMaker(API_URL.addItemToCart(), requestOptions).then((response) => {
        if(response.isError){
            dispatch(AddItemToCartFailed("Error while add item into cart."));
        }else{
            dispatch(AddItemToCartSuccess(response.data, "Added Item in to Cart."));
        }
        setTimeout(() => {
            dispatch(clearCartState());
          }, 3000);
    })
}

export const removeToCart = (id) => async(dispatch) => {
    dispatch(removeItemToCartStart());
    const requestOptions = requestOptionCreator("DELETE", {}, true);
    requestMaker(API_URL.removeItemToCart(id), requestOptions).then((response) => {
        if(response.isError){
            dispatch(AddItemToCartFailed("Error while remove item"));
        }else{
            console.log("response.data in action: ", response.data);
            dispatch(AddItemToCartSuccess(response.data, "Item removed from cart."));
        }
        setTimeout(() => {
            dispatch(clearCartState());
          }, 3000);
    })
}