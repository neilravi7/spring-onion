import { 
    FETCH_CART_START,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAILED,
    CLEAR_CART_STATE
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
            return{
                ...state,
                inProgress:true,
                success:false,
                message:"Cart is loading"
            }
        case FETCH_CART_SUCCESS:
            return{
                ...state,
                cart:action.cart,
                inProgress:true,
                success:true,
                message:action.message
            }
        case FETCH_CART_FAILED:
            return{
                inProgress:false,
                error:true,
                message:action.message
            }
        case CLEAR_CART_STATE:
            return{
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

