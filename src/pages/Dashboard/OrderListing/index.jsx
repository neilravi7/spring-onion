"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, Edit2, ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";
import { getUserID } from "../../../helpers/utils";
import DeliveryGuy from "../../../components/Loader/DeliveryGuy";
import toast from "react-hot-toast";

// Firebase imports
import { collection, doc, query, where, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";



// Sample data - in a real app, this would come from your API
// const sampleOrders = [
//   {
//     id: "0939638779",
//     customer: "cc9e2b6f-ded3-4c5e-a292-2a71792544c7",
//     customer_name: "John Doe",
//     customer_email: "john.doe@example.com",
//     customer_phone: "+1 (555) 123-4567",
//     vendor: "ec490580-4c10-4cd8-b8a2-5d38a5e35bc3",
//     items: [
//       {
//         id: "09ae1ed1-82f7-470a-9e7d-e23ad09b2a7a",
//         name: "Carrot Sauce Pasta Recipe",
//         image: "https://i.ibb.co/XwGspvK/carrot-pasta-recipe-530x700.jpg",
//         price: 170,
//         quantity: 1,
//       },
//       {
//         id: "88ed3356-a418-4e13-add8-04ac6fc1b10d",
//         name: "CUCUMBER IDLI",
//         image: "https://i.ibb.co/YFzRyZY3/cucumber-idli-recipe-2-530x700.jpg",
//         price: 150,
//         quantity: 1,
//       },
//     ],
//     total: 332.85,
//     restaurant: "Utsav Food",
//     deliveryAddress: "452, Pecific Avenue",
//     estimatedDelivery: "30-40 min",
//     real_time_status: "Preparing",
//     order_success: true,
//     payment_status: "paid",
//     firebase_order_id: "sda",
//     date: "Mar 20, 2025",
//   },
//   {
//     id: "0939638780",
//     customer: "dd9e2b6f-ded3-4c5e-a292-2a71792544c8",
//     customer_name: "Jane Smith",
//     customer_email: "jane.smith@example.com",
//     customer_phone: "+1 (555) 987-6543",
//     vendor: "fc490580-4c10-4cd8-b8a2-5d38a5e35bc4",
//     items: [
//       {
//         id: "19ae1ed1-82f7-470a-9e7d-e23ad09b2a7b",
//         name: "Margherita Pizza",
//         image: "https://i.ibb.co/XwGspvK/carrot-pasta-recipe-530x700.jpg",
//         price: 220,
//         quantity: 1,
//       },
//       {
//         id: "98ed3356-a418-4e13-add8-04ac6fc1b10e",
//         name: "Garlic Bread",
//         image: "https://i.ibb.co/YFzRyZY3/cucumber-idli-recipe-2-530x700.jpg",
//         price: 80,
//         quantity: 2,
//       },
//     ],
//     total: 396.9,
//     restaurant: "Pizza Palace",
//     deliveryAddress: "789, Oak Street",
//     estimatedDelivery: "20-30 min",
//     real_time_status: "Out for Delivery",
//     order_success: true,
//     payment_status: "paid",
//     firebase_order_id: "sdda",
//     date: "Mar 20, 2025",
//   },
//   {
//     id: "0939638781",
//     customer: "ee9e2b6f-ded3-4c5e-a292-2a71792544c9",
//     customer_name: "Robert Johnson",
//     customer_email: "robert.johnson@example.com",
//     customer_phone: "+1 (555) 456-7890",
//     vendor: "gc490580-4c10-4cd8-b8a2-5d38a5e35bc5",
//     items: [
//       {
//         id: "29ae1ed1-82f7-470a-9e7d-e23ad09b2a7c",
//         name: "Chicken Biryani",
//         image: "https://i.ibb.co/XwGspvK/carrot-pasta-recipe-530x700.jpg",
//         price: 250,
//         quantity: 2,
//       },
//     ],
//     total: 525.0,
//     restaurant: "Spice Garden",
//     deliveryAddress: "123, Pine Avenue",
//     estimatedDelivery: "40-50 min",
//     real_time_status: "Accepted",
//     order_success: true,
//     payment_status: "paid",
//     firebase_order_id: "sddc",
//     date: "Mar 19, 2025",
//   },
//   {
//     id: "0939638782",
//     customer: "ff9e2b6f-ded3-4c5e-a292-2a71792544d0",
//     customer_name: "Emily Davis",
//     customer_email: "emily.davis@example.com",
//     customer_phone: "+1 (555) 234-5678",
//     vendor: "hc490580-4c10-4cd8-b8a2-5d38a5e35bc6",
//     items: [
//       {
//         id: "39ae1ed1-82f7-470a-9e7d-e23ad09b2a7d",
//         name: "Vegetable Fried Rice",
//         image: "https://i.ibb.co/XwGspvK/carrot-pasta-recipe-530x700.jpg",
//         price: 180,
//         quantity: 1,
//       },
//       {
//         id: "48ed3356-a418-4e13-add8-04ac6fc1b10f",
//         name: "Spring Rolls",
//         image: "https://i.ibb.co/YFzRyZY3/cucumber-idli-recipe-2-530x700.jpg",
//         price: 120,
//         quantity: 2,
//       },
//     ],
//     total: 441.0,
//     restaurant: "Asian Delights",
//     deliveryAddress: "567, Maple Road",
//     estimatedDelivery: "25-35 min",
//     real_time_status: "Placed",
//     order_success: true,
//     payment_status: "pending",
//     firebase_order_id: "sdde",
//     date: "Mar 19, 2025",
//   },
//   {
//     id: "0939638783",
//     customer: "gg9e2b6f-ded3-4c5e-a292-2a71792544d1",
//     customer_name: "Michael Wilson",
//     customer_email: "michael.wilson@example.com",
//     customer_phone: "+1 (555) 876-5432",
//     vendor: "ic490580-4c10-4cd8-b8a2-5d38a5e35bc7",
//     items: [
//       {
//         id: "49ae1ed1-82f7-470a-9e7d-e23ad09b2a7e",
//         name: "Chocolate Brownie",
//         image: "https://i.ibb.co/XwGspvK/carrot-pasta-recipe-530x700.jpg",
//         price: 90,
//         quantity: 3,
//       },
//       {
//         id: "58ed3356-a418-4e13-add8-04ac6fc1b10g",
//         name: "Vanilla Ice Cream",
//         image: "https://i.ibb.co/YFzRyZY3/cucumber-idli-recipe-2-530x700.jpg",
//         price: 70,
//         quantity: 2,
//       },
//     ],
//     total: 410.55,
//     restaurant: "Sweet Treats",
//     deliveryAddress: "890, Cedar Lane",
//     estimatedDelivery: "15-25 min",
//     real_time_status: "Completed",
//     order_success: true,
//     payment_status: "paid",
//     firebase_order_id: "sddf",
//     date: "Mar 18, 2025",
//   },
// ]

export default function OrderListing() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const vendorId = getUserID();
  const [orderId, setOrderId] = useState(() => "")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const ordersToDisplay = orders

  const openOrderModal = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
    reset({
      estimatedDelivery: order.estimatedDelivery,
      real_time_status: order.real_time_status,
    })
  }

  const closeOrderModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }


  const onSubmit = async (data) => {
    try {
      const orderRef = doc(db, "orders", selectedOrder.id);
      await updateDoc(orderRef, {
        estimatedDelivery: data.estimatedDelivery,
        real_time_status: data.real_time_status
      });
      toast.success("Order updated successfully!");
      closeOrderModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order");
    }
  };

  // const onSubmit = (data) => {
  //   // In a real app, you would call your API here
  //   console.log("Updating order:", selectedOrder.id, data)

  //   // Update the order in the local state
  //   const updatedOrders = orders.map((order) => (order.id === selectedOrder.id ? { ...order, ...data } : order))

  //   setOrders(updatedOrders)
  //   closeOrderModal()

  //   // Show success notification (in a real app)
  //   alert(`Order ${selectedOrder.id} updated successfully!`)
  // }

  const toggleItemExpand = (orderId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-indigo-100 text-indigo-800"
      case "preparing":
        return "bg-purple-100 text-purple-800"
      case "out for delivery":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const listenToVendorOrders = (vendorId, callback) => {
    const ordersRef = collection(db, "orders");

    const q = query(
      ordersRef,
      where("vendor", "==", vendorId) // filter by vendor field
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      callback(orders);
    });

    return unsubscribe; // Don't forget to cleanup
  };

  useEffect(() => {
    const unsubscribe = listenToVendorOrders(vendorId, (orders) => {
      setOrders(orders);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [vendorId]);

  if (isLoading) {
    return <DeliveryGuy />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Order Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-6 bg-gray-50 py-3 px-4 text-sm font-medium text-gray-500 border-b">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Restaurant</div>
            <div>Total</div>
            <div>Status</div>
            <div>Date</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {ordersToDisplay.length > 0 ? (
                ordersToDisplay.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="group"
                  >
                    {/* Desktop View */}
                    <div
                      className="hidden md:grid md:grid-cols-6 py-4 px-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => openOrderModal(order)}
                    >
                      <div className="font-medium text-gray-900">{order.display_id}</div>
                      <div className="flex items-center">
                       
                        <span>{order.customer_name}</span>
                      </div>
                      <div>{order.restaurant}</div>
                      <div>${order.total.toFixed(2)}</div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.real_time_status)}`}
                        >
                          {order.real_time_status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{order.date}</span>
                        <button
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            openOrderModal(order)
                          }}
                        >
                          <Edit2 className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 mr-2">
                              {getInitials(order.customer_name)}
                            </div>
                            <div>
                              <div className="font-medium">{order.customer_name}</div>
                              <div className="text-sm text-gray-500">Order #{order.id}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.real_time_status)}`}
                          >
                            {order.real_time_status}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">{order.date}</div>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between">
                        <div>
                          <div className="text-sm text-gray-500">Restaurant</div>
                          <div>{order.restaurant}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Total</div>
                          <div className="font-medium">${order.total.toFixed(2)}</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <button
                          className="text-sm text-gray-600 flex items-center"
                          onClick={() => toggleItemExpand(order.id)}
                        >
                          {expandedItems[order.id] ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-1" />
                              Hide items
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-1" />
                              Show items ({order.items.length})
                            </>
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedItems[order.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 space-y-2">
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 rounded bg-gray-200 mr-2 overflow-hidden">
                                        <img
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div>
                                        <div>{item.name}</div>
                                        <div className="text-gray-500">Qty: {item.quantity}</div>
                                      </div>
                                    </div>
                                    <div className="font-medium">${(item.price / 100).toFixed(2)}</div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="mt-4">
                        <button
                          className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                          onClick={() => openOrderModal(order)}
                        >
                          View & Edit Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">No orders available.</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Order Modal */}
      <AnimatePresence>
        {isModalOpen && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeOrderModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">Order #{selectedOrder.id}</h2>
                <button className="text-gray-400 hover:text-gray-500" onClick={closeOrderModal}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
                {/* Customer Info */}
                <div className="px-6 py-4 border-b">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-base font-medium text-gray-700 mr-3">
                      {/* {getInitials(selectedOrder.customer_name)} */}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{selectedOrder.customer_name}</h3>
                      <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {selectedOrder.customer_email}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {selectedOrder.customer_phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="px-6 py-4 border-b">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-medium text-gray-900">Order Details</h3>
                    <div className="flex space-x-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.real_time_status)}`}
                      >
                        {selectedOrder.real_time_status}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.payment_status)}`}
                      >
                        {selectedOrder.payment_status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Restaurant</span>
                      <span className="font-medium">{selectedOrder.restaurant}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery Address</span>
                      <span className="font-medium">{selectedOrder.deliveryAddress}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium">{selectedOrder.date}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4 border-b">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex">
                        <div className="h-16 w-16 rounded bg-gray-200 mr-4 overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.name}</h4>
                            <span className="font-medium">${(item.price / 100).toFixed(2)}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</div>
                          <div className="text-sm font-medium mt-1">
                            Subtotal: ${(item.price * item.quantity / 100).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div key={`delivery-${selectedOrder.display_id}`} className="flex">
                      <div className="h-16 w-16 rounded bg-gray-200 mr-4 overflow-hidden flex-shrink-0">
                        <img
                          src={"https://png.pngtree.com/png-vector/20200922/ourmid/pngtree-calculate-tax-concept-in-flat-style-png-image_2349579.jpg"}
                          alt="delivery"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Delivery Fee</h4>
                          <span className="font-medium">${10.00}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Quantity: {1}</div>
                        <div className="text-sm font-medium mt-1">
                          Subtotal: ${10.00 * 1}
                        </div>
                      </div>
                    </div>
                    <div key={`tax-${selectedOrder.display_id}`} className="flex">
                      <div className="h-16 w-16 rounded bg-gray-200 mr-4 overflow-hidden flex-shrink-0">
                        <img
                          src={"https://png.pngtree.com/png-vector/20200922/ourmid/pngtree-calculate-tax-concept-in-flat-style-png-image_2349579.jpg"}
                          alt="delivery"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Taxes</h4>
                          <span className="font-medium">${3.50}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Quantity: {1}</div>
                        <div className="text-sm font-medium mt-1">
                          Subtotal: ${3.50 * 1}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-lg">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Form */}
                <div className="px-6 py-4">
                  <h3 className="text-base font-medium text-gray-900 mb-4">Update Order</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700 mb-1">
                          Estimated Delivery Time
                        </label>
                        <input
                          id="estimatedDelivery"
                          type="text"
                          className={`w-full px-3 py-2 border ${errors.estimatedDelivery ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                          {...register("estimatedDelivery", { required: "Estimated delivery time is required" })}
                        />
                        {errors.estimatedDelivery && (
                          <p className="mt-1 text-sm text-red-600">{errors.estimatedDelivery.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="real_time_status" className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          id="real_time_status"
                          className={`w-full px-3 py-2 border ${errors.real_time_status ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                          {...register("real_time_status", { required: "Status is required" })}
                        >
                          <option value="Placed">Placed</option>
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Completed">Completed</option>
                        </select>
                        {errors.real_time_status && (
                          <p className="mt-1 text-sm text-red-600">{errors.real_time_status.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        onClick={closeOrderModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-orange-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        Update Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

