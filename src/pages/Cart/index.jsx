// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// libraries
import { motion } from 'framer-motion'
import { Minus, Plus, X, ArrowRight } from 'lucide-react'

import Alert from '../../components/Alert/Alert';
// action functions
import { addToCart, removeToCart } from '../../redux/actions/cart';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { requestMaker, requestOptionCreator } from '../../helpers/request';
import { API_URL } from '../../helpers/urls';


export default function CartPage() {
  const {isAuthenticated, isCustomer} = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const { cart, message, error, success } = useSelector((state)=>state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //! Cart Operations:
  const handleQuantityInc = (id, quantity) => {
    
    let itemCount = quantity + 1;

    if(itemCount > 5){
      toast.error("Can't add more then five items.")
    }else{
      const requestPayload = {
        food_item:id,
        quantity:itemCount
      }
      dispatch(addToCart(requestPayload));
    }
    
  }

  const handleQuantityDec = (id, cartItemId, quantity) => {
    let itemCount = quantity - 1;
    if(itemCount < 1){
      dispatch(removeToCart(cartItemId));
    }else{
      const requestPayload = {
        food_item:id,
        quantity:itemCount
      }
      dispatch(addToCart(requestPayload));
    }
  }

  const removeItem = (id) => {
    dispatch(removeToCart(id));
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity)/100, 0)
  }

  //! CART CALCULATION AND VARIABLES
  const deliveryCharges = 5.00
  const taxes = 3.50
  const subtotal = calculateSubtotal()
  const total = subtotal + deliveryCharges + taxes


  const performCheckout = () => {
    const requestOptions = requestOptionCreator("POST", {}, true);
    requestMaker(API_URL.checkout(), requestOptions).then((response) => {
      if(response.isError){
        toast.error("Error During Checkout Process.");
      }else{
        window.location.href = response.data.checkout_url;
      }
    })
  }

  useEffect(() => {
    if(!isAuthenticated && isCustomer){
      navigate('/login')
    }
    setCartItems(cart);
  },[cart])


  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="space-y-4 p-4">
        {success && <Alert type="success" message={message} onClose={() => console.log("Closed")} />}
      </div>
      <div className="space-y-4 p-4">
        {error && <Alert type="error" message={message} onClose={() => console.log("Closed")} />}
      </div>
      <h1 className="text-2xl font-bold mb-8">
        Cart <span className="text-red-500">({cartItems.length})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Side */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <motion.div
              key={item.food_item_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-b"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => handleQuantityDec(item.food_item_id, item.cart_item_id, item.quantity)}
                      className="p-1 hover:bg-gray-200 rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityInc(item.food_item_id, item.quantity)}
                      className="p-1 hover:bg-gray-200 rounded-lg"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-red-500 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)/100}
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.cart_item_id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bill Details - Right Side */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-bold mb-4">Bill Details</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span className="text-red-500">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-red-500">${deliveryCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Govt Taxes & Other Charges</span>
                <span className="text-red-500">${taxes.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-red-500">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
              onClick={() => performCheckout()}
              disabled={cart.length === 0 } //disabled button if no item into cart.
            >
              Order Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}