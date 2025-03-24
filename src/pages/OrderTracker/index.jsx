import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Clock, ChefHat, Bike, Package, MapPin, Navigation } from "lucide-react"
import { requestMaker, requestOptionCreator } from "../../helpers/request";
import { API_URL } from "../../helpers/urls";
import { Link } from "react-router-dom";
import DeliveryGuy from "../../components/Loader/DeliveryGuy";

// Firebase
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {db} from "../../firebase";


// Sample order data - in real app this would come from your backend
const sampleOrder = {
  id: "ORD12345",
  items: [
    { name: "Chicken Biryani", quantity: 1, price: 15.99 },
    { name: "Garlic Naan", quantity: 2, price: 3.99 },
    { name: "Mango Lassi", quantity: 1, price: 4.99 },
  ],
  total: 28.96,
  restaurant: "Spice Garden",
  deliveryAddress: "123 Main St, Apartment 4B",
  estimatedDelivery: "30-40 min",
}

export default function OrderTracker({ orderStatus = "Placed", isSuccess = true }) {
  // In a real app, you'd get these from props or API
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState({});
  const [currentStatus, setCurrentStatus] = useState(orderStatus)
  const [orderSuccess, setOrderSuccess] = useState(isSuccess)
  const [isLoading, setIsLoading] = useState(true);


  // For demo purposes - allows cycling through statuses
  const statusPhases = ["Placed", "Pending", "Accepted", "Preparing", "Out for Delivery", "Completed"]

  const handleNextStatus = () => {
    const currentIndex = statusPhases.indexOf(currentStatus)
    if (currentIndex < statusPhases.length - 1) {
      setCurrentStatus(statusPhases[currentIndex + 1])
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Placed":
        return <Package className="w-6 h-6" />
      case "Pending":
        return <Clock className="w-6 h-6" />
      case "Accepted":
        return <Check className="w-6 h-6" />
      case "Preparing":
        return <ChefHat className="w-6 h-6" />
      case "Out for Delivery":
        return <Bike className="w-6 h-6" />
      case "Completed":
        return <Check className="w-6 h-6" />
      default:
        return <Clock className="w-6 h-6" />
    }
  }

  const getOrderDetails = async (id) => {
    const requestOptions = requestOptionCreator("POST", { order_id: id }, true);
    const response = await requestMaker(API_URL.orderStatus(), requestOptions);
    return response;
  };

  const updatePaymentStatus = async (orderId, status) => {
    const docRef = doc(db, "orders", orderId);
    
    await updateDoc(docRef, {
      payment_status: status
    });
  
    console.log("Payment status updated!");
  };
  
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getOrderDetails(orderId);
      console.log("response.success", response.data.success)
      if (!response.data.success) {
        setOrderSuccess(false);
        setIsLoading(false);

      } else {
        const firebaseOrderId = response.data.order.firebase_order_id;
        await updatePaymentStatus(firebaseOrderId, response.data.order.payment_status);
        const orderRef = doc(db, "orders", firebaseOrderId);
        const unsubscribe = onSnapshot(orderRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setOrder(data);
            setCurrentStatus(data.real_time_status);
            setIsLoading(false);
          }
        });
        // Cleanup on unmount
        return () => unsubscribe();
      }
    };
  
    fetchOrder();
  }, [orderId]);
  

  // Loader
  if(isLoading){
    return <DeliveryGuy/>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      {/* Order Status Header */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <AnimatePresence mode="wait">
            {orderSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h2>
                <p className="text-gray-600 text-center">Your order #{order.id} has been placed successfully.</p>
              </motion.div>
            ) : (
              <motion.div
                key="failed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Failed</h2>
                <p className="text-gray-600 text-center">We couldn't process your order. Please try again.</p>
                
                <Link to={'/customer/profile'}>
                <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                  Try Again
                </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Only show tracker if order is successful */}
      {orderSuccess && (
        <>
          {/* Order Details */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurant</span>
                  <span className="font-medium">{order.restaurant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="font-medium">{order.estimatedDelivery}</span>
                </div>
                <div className="pt-3 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>₹ {(item.price/100).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>₹ {order.total.toFixed(2)}*inc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Tracker */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>

              <div className="relative">
                {/* Status Line */}
                <div className="absolute left-4 top-0 w-0.5 h-full bg-gray-200 z-0"></div>

                {/* Status Steps */}
                <div className="space-y-8 relative z-10">
                  {statusPhases.map((status, index) => {
                    const isActive = statusPhases.indexOf(currentStatus) >= index
                    const isPast = statusPhases.indexOf(currentStatus) > index

                    return (
                      <motion.div
                        key={status}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className={`relative flex items-center justify-center w-8 h-8 rounded-full z-10 ${
                            isActive ? "bg-orange-500" : "bg-gray-200"
                          }`}
                          animate={{
                            scale: isActive ? [1, 1.2, 1] : 1,
                            backgroundColor: isActive ? "#f97316" : "#e5e7eb",
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {isPast ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <div className={`${isActive ? "text-white" : "text-gray-400"}`}>
                              {getStatusIcon(status)}
                            </div>
                          )}
                        </motion.div>

                        <div className="ml-4">
                          <span className={`font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                            {status}
                          </span>
                          <p className="text-sm text-gray-500">
                            {status === "Placed" && "Your order has been received"}
                            {status === "Pending" && "Restaurant is reviewing your order"}
                            {status === "Accepted" && "Restaurant has accepted your order"}
                            {status === "Preparing" && "Your food is being prepared"}
                            {status === "Out for Delivery" && "Your food is on the way"}
                            {status === "Completed" && "Your order has been delivered"}
                          </p>

                          {status === currentStatus && (
                            <motion.div
                              className="h-1 w-16 bg-orange-500 mt-2 rounded"
                              initial={{ width: 0 }}
                              animate={{ width: "4rem" }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                            />
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Map Widget - Only show when status is "Out for Delivery" */}
          {currentStatus === "Out for Delivery" && (
            <motion.div
              className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Tracking</h3>
                <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Fake Map */}
                  <div className="absolute inset-0 bg-gray-300 opacity-50">
                    {/* Map grid lines */}
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-gray-200 opacity-30"></div>
                      ))}
                    </div>
                  </div>

                  {/* Restaurant Location */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                      <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow-sm">
                        {order.restaurant}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <MapPin className="w-6 h-6 text-red-500" />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                      <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow-sm">Your Location</span>
                    </div>
                  </div>

                  {/* Delivery Person */}
                  <motion.div
                    className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      top: ["33%", "40%", "50%", "60%", "70%"],
                      left: ["33%", "40%", "50%", "60%", "70%"],
                    }}
                    transition={{
                      duration: 10,
                      ease: "linear",
                      times: [0, 0.2, 0.5, 0.8, 1],
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Bike className="w-5 h-5 text-white" />
                      </div>
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                  </motion.div>

                  {/* Navigation Path */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                    <motion.path
                      d="M 25% 25% Q 40% 40%, 50% 50% T 70% 70%"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </svg>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Estimated arrival</p>
                    <p className="font-medium">{order.estimatedDelivery}</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm flex items-center gap-2 hover:bg-orange-600 transition-colors">
                    <Navigation className="w-4 h-4" />
                    Contact Driver
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Demo Controls - Remove in production */}
          {/* <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Demo Controls</h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setOrderSuccess(true)}
                    className={`flex-1 py-2 px-4 rounded-md ${orderSuccess ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    Success
                  </button>
                  <button
                    onClick={() => setOrderSuccess(false)}
                    className={`flex-1 py-2 px-4 rounded-md ${!orderSuccess ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    Failed
                  </button>
                </div>

                {orderSuccess && (
                  <button
                    onClick={handleNextStatus}
                    className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    Next Status
                  </button>
                )}
              </div>
            </div>
          </div> */}
        </>
      )}
    </div>
  )
}