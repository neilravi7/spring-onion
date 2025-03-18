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

  } from "../actions/actionType";


const initialState = {
    cart:[],
    message:null,
    inProgress:false,
    success:false,
    error:false,
}

export default function cart(state=initialState, action){
    switch (action.type){
        case FETCH_CART_START:
        case ADD_ITEM_INTO_CART_START:
        case REMOVE_ITEM_FROM_CART_START:
            return{
                ...state,
                inProgress:true,
                success:false,
            }
        case FETCH_CART_SUCCESS:
        case ADD_ITEM_INTO_CART_SUCCESS:
        case REMOVE_ITEM_FROM_CART_SUCCESS:
            return{
                ...state,
                cart:action.cart,
                inProgress:true,
                success:true,
                message:action.message
            }
        case FETCH_CART_FAILED:
        case ADD_ITEM_INTO_CART_FAILED:
        case REMOVE_ITEM_FROM_CART_FAILED:
            return{
                ...state,
                inProgress:false,
                error:true,
                message:action.message
            }
        case UPDATE_CART:
            return{
                ...state,
                cart:action.cart
            }
        case CLEAR_CART_STATE:
            return{
                ...state,
                message:null,
                inProgress:false,
                success:false,
                error:false,
            }
        default:{
            return{
                ...state
            }
        }
    }
}

