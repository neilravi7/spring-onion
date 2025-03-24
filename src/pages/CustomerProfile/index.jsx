
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import {
  ShoppingBag,
  Heart,
  CreditCard,
  MapPin,
  User,
  Settings,
  LogOut,
  Eye,
  EyeOff,
  Clock,
  Check,
  Mail,
  Phone,
  Edit2,
  Shield,
  Award,
  Menu,
  X,
  Utensils,
} from "lucide-react"
import {getUserDetails} from "../../helpers/utils";
import {requestMaker, requestOptionCreator} from "../../helpers/request";
import { getUserID } from "../../helpers/utils"
import { API_URL } from "../../helpers/urls"

//! Firebase
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import DeliveryGuy from "../../components/Loader/DeliveryGuy"


// Sample orders data
const ordersData = [
  {
    id: "50262129294",
    restaurant: "The Red Box",
    location: "JP Nagar Jp-Nagar",
    date: "Fri, Aug 30, 11:12 PM",
    status: "Order confirmed",
    items: [
      { name: "Dragon Chicken", quantity: 1 },
      { name: "Veg Fried Rice & Schezwan Cauliflower", quantity: 1 },
    ],
    total: 257,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "50262129295",
    restaurant: "Pizza Hut",
    location: "Koramangala",
    date: "Wed, Aug 28, 8:45 PM",
    real_time_status: "Delivered",
    items: [
      { name: "Pepperoni Pizza", quantity: 1 },
      { name: "Garlic Bread", quantity: 2 },
      { name: "Coke", quantity: 1 },
    ],
    total: 549,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "50262129296",
    restaurant: "Burger King",
    location: "HSR Layout",
    date: "Mon, Aug 26, 2:30 PM",
    real_time_status: "Delivered",
    items: [
      { name: "Whopper", quantity: 2 },
      { name: "French Fries", quantity: 1 },
      { name: "Chocolate Shake", quantity: 1 },
    ],
    total: 399,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("orders")
  const [userData, setUserData] = useState(() => {
    const userInfo = getUserDetails();
    const [first_name, last_name] = userInfo.name.split(" ");
    const transformedUser = {
      first_name: first_name || "",
      last_name: last_name || "",
      email: userInfo.email || "",
      phone: userInfo.phone || "",
      address: userInfo.address || "",
      image_url: userInfo.profileImage || ""
    };
    return transformedUser;
  });
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // const [expandedOrder, setExpandedOrder] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [orders, setOrders] = useState(()=>[]);
  const customerId = getUserID();
  const [isLoading, setIsLoading] = useState(true);
  


  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm({
    defaultValues: userData,
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    watch: watchPassword,
  } = useForm()

  const newPassword = watchPassword ? watchPassword("newPassword") : ""

  // Update User Profile
  const onSubmitProfile = (data) => {
    setIsUpdating(true)

    const requestOption = requestOptionCreator("PUT", data, true);
    requestMaker(API_URL.customerProfileUpdate(customerId), requestOption).then((response) => {
      if(response.isError){
        setUpdateSuccess(false)
      }else{
        setUserData(response.data)
        setUpdateSuccess(true)
        setIsUpdating(false)
      }
      setIsUpdating(false)

    });
  }

  // Update User Credentials  
  const onSubmitPassword = (data) => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Password updated:", data)
      setIsUpdating(false)
      setUpdateSuccess(true)

      setTimeout(() => {
        setUpdateSuccess(false)
      }, 3000)
    }, 1500)
  }

  // const toggleOrderExpand = (orderId) => {
  //   if (expandedOrder === orderId) {
  //     setExpandedOrder(null)
  //   } else {
  //     setExpandedOrder(orderId)
  //   }
  // }

  const getStatusColor = (status) => {
    if (status.toLowerCase().includes("accepted")) {
      return "text-blue-700 rounded bg-blue-100 text-center p-2"
    } else if (status.toLowerCase().includes("completed")) {
      return "text-green-700 rounded bg-green-100 text-center p-2"
    } else if (status.toLowerCase().includes("preparing")) {
      return "text-orange-700 rounded bg-orange-100 text-center p-2"
    } else {
      return "bg-gray-200 text-gray-700"
    }
  }

  const tabVariants = {
    inactive: {
      color: "#6B7280",
      backgroundColor: "transparent",
      transition: { duration: 0.2 },
    },
    active: {
      color: "#1F2937",
      backgroundColor: "#F3F4F6",
      transition: { duration: 0.2 },
    },
    hover: {
      backgroundColor: "#F9FAFB",
      transition: { duration: 0.2 },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
  }

  // ! Firebase data loader
  const listenToCustomerOrders = (customerId, callback) => {
    const ordersRef = collection(db, "orders");

    const q = query(
      ordersRef,
      where("customer", "==", customerId),
      orderBy("createdAt", "desc")
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
    const unsubscribe = listenToCustomerOrders(customerId, (orders) => {
      setOrders(orders);
      console.log(orders)
      setIsLoading(false);
    });
    return () => unsubscribe();
  },[customerId])

  if(isLoading){
    return <DeliveryGuy/>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 sm:py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center w-full sm:w-auto justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{userData.first_name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-teal-100 sm:space-x-2">
                <span>{userData.phone}</span>
                <span className="hidden sm:inline text-teal-300">·</span>
                <span>{userData.email}</span>
              </div>
            </div>
            <button className="sm:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <motion.button
            onClick={() => handleTabClick("update-profile")}
            className="mt-4 sm:mt-0 border border-teal-300 text-teal-100 px-4 py-2 rounded hover:bg-teal-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EDIT PROFILE
          </motion.button>
        </div>
      </header>

      <div className="flex flex-1 bg-white">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 bg-red-100 p-6">
          <nav className="space-y-2">
          <motion.button
              onClick={() => handleTabClick("profile")}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "profile" ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <User className={`mr-3 h-5 w-5 ${activeTab === "profile" ? "text-red-600" : "text-gray-500"}`} />
              <span className={`${activeTab === "profile" ? "font-medium" : ""}`}>Profile</span>
            </motion.button>

            <motion.button
              onClick={() => handleTabClick("orders")}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "orders" ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag className={`mr-3 h-5 w-5 ${activeTab === "orders" ? "text-red-600" : "text-gray-500"}`} />
              <span className={`${activeTab === "orders" ? "font-medium" : ""}`}>Orders</span>
            </motion.button>

            {/* <motion.button
              onClick={() => handleTabClick("super")}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "super" ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Award className={`mr-3 h-5 w-5 ${activeTab === "super" ? "text-red-600" : "text-gray-500"}`} />
              <span className={`${activeTab === "super" ? "font-medium" : ""}`}>Swiggy SUPER</span>
            </motion.button>

            <motion.button
              onClick={() => handleTabClick("favorites")}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "favorites" ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className={`mr-3 h-5 w-5 ${activeTab === "favorites" ? "text-red-600" : "text-gray-500"}`} />
              <span className={`${activeTab === "favorites" ? "font-medium" : ""}`}>Favourites</span>
            </motion.button>

            <motion.button
              onClick={() => handleTabClick("payments")}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "payments" ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <CreditCard className={`mr-3 h-5 w-5 ${activeTab === "payments" ? "text-red-600" : "text-gray-500"}`} />
              <span className={`${activeTab === "payments" ? "font-medium" : ""}`}>Payments</span>
            </motion.button> */}

            <motion.button
              onClick={() => handleTabClick("addresses")}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "addresses" ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className={`mr-3 h-5 w-5 ${activeTab === "addresses" ? "text-red-600" : "text-gray-500"}`} />
              <span className={`${activeTab === "addresses" ? "font-medium" : ""}`}>Addresses</span>
            </motion.button>


            <motion.button
              onClick={() => handleTabClick("settings")}
              className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "settings" ? "bg-white shadow-sm" : "hover:bg-white/60"}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className={`mr-3 h-5 w-5 ${activeTab === "settings" ? "text-red-600" : "text-gray-500"}`} />
              <span className={`${activeTab === "settings" ? "font-medium" : ""}`}>Settings</span>
            </motion.button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                className="absolute top-0 left-0 w-3/4 h-full bg-white shadow-lg"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={userData.image_url || "/placeholder.svg"}
                      alt={`${userData.first_name} ${userData.last_name}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="font-medium">
                        {userData.first_name} {userData.last_name}
                      </p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <nav className="p-4 space-y-1">
                  <button
                    onClick={() => handleTabClick("orders")}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "orders" ? "bg-gray-100" : ""}`}
                  >
                    <ShoppingBag
                      className={`mr-3 h-5 w-5 ${activeTab === "orders" ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span className={`${activeTab === "orders" ? "font-medium" : ""}`}>Orders</span>
                  </button>

                  <button
                    onClick={() => handleTabClick("super")}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "super" ? "bg-gray-100" : ""}`}
                  >
                    <Award className={`mr-3 h-5 w-5 ${activeTab === "super" ? "text-red-600" : "text-gray-500"}`} />
                    <span className={`${activeTab === "super" ? "font-medium" : ""}`}>Swiggy SUPER</span>
                  </button>

                  <button
                    onClick={() => handleTabClick("favorites")}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "favorites" ? "bg-gray-100" : ""}`}
                  >
                    <Heart
                      className={`mr-3 h-5 w-5 ${activeTab === "favorites" ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span className={`${activeTab === "favorites" ? "font-medium" : ""}`}>Favourites</span>
                  </button>

                  <button
                    onClick={() => handleTabClick("payments")}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "payments" ? "bg-gray-100" : ""}`}
                  >
                    <CreditCard
                      className={`mr-3 h-5 w-5 ${activeTab === "payments" ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span className={`${activeTab === "payments" ? "font-medium" : ""}`}>Payments</span>
                  </button>

                  <button
                    onClick={() => handleTabClick("addresses")}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "addresses" ? "bg-gray-100" : ""}`}
                  >
                    <MapPin
                      className={`mr-3 h-5 w-5 ${activeTab === "addresses" ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span className={`${activeTab === "addresses" ? "font-medium" : ""}`}>Addresses</span>
                  </button>

                  <button
                    onClick={() => handleTabClick("profile")}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "profile" ? "bg-gray-100" : ""}`}
                  >
                    <User className={`mr-3 h-5 w-5 ${activeTab === "profile" ? "text-red-600" : "text-gray-500"}`} />
                    <span className={`${activeTab === "profile" ? "font-medium" : ""}`}>Profile</span>
                  </button>

                  <button
                    onClick={() => handleTabClick("settings")}
                    className={`flex items-center w-full px-4 py-3 text-gray-700 rounded-lg ${activeTab === "settings" ? "bg-gray-100" : ""}`}
                  >
                    <Settings
                      className={`mr-3 h-5 w-5 ${activeTab === "settings" ? "text-red-600" : "text-gray-500"}`}
                    />
                    <span className={`${activeTab === "settings" ? "font-medium" : ""}`}>Settings</span>
                  </button>

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <button className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg">
                      <LogOut className="mr-3 h-5 w-5" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="flex justify-around">
            <button onClick={() => handleTabClick("orders")} className="flex flex-col items-center py-3 px-2 flex-1">
              <ShoppingBag className={`h-6 w-6 ${activeTab === "orders" ? "text-red-600" : "text-gray-500"}`} />
              <span
                className={`text-xs mt-1 ${activeTab === "orders" ? "text-red-600 font-medium" : "text-gray-500"}`}
              >
                Orders
              </span>
            </button>

            <button onClick={() => handleTabClick("favorites")} className="flex flex-col items-center py-3 px-2 flex-1">
              <Heart className={`h-6 w-6 ${activeTab === "favorites" ? "text-red-600" : "text-gray-500"}`} />
              <span
                className={`text-xs mt-1 ${activeTab === "favorites" ? "text-red-600 font-medium" : "text-gray-500"}`}
              >
                Favourites
              </span>
            </button>

            <button onClick={() => handleTabClick("profile")} className="flex flex-col items-center py-3 px-2 flex-1">
              <User className={`h-6 w-6 ${activeTab === "profile" ? "text-red-600" : "text-gray-500"}`} />
              <span
                className={`text-xs mt-1 ${activeTab === "profile" ? "text-red-600 font-medium" : "text-gray-500"}`}
              >
                Profile
              </span>
            </button>

            <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center py-3 px-2 flex-1">
              <Menu className="h-6 w-6 text-gray-500" />
              <span className="text-xs mt-1 text-gray-500">More</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 pb-20 md:pb-8">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Profile Information</h2>
                  <p className="mt-1 text-sm text-gray-500">Personal details and information about your account.</p>
                </div>

                <div className="bg-white overflow-hidden rounded-xl border border-gray-200">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
                      <img
                        src={userData.image_url || "/placeholder.svg"}
                        alt={`${userData.first_name} ${userData.last_name}`}
                        className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-teal-100 mx-auto sm:mx-0"
                      />
                      <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                        <h3 className="text-xl font-bold">
                          {userData.first_name} {userData.last_name}
                        </h3>
                        <p className="text-gray-500">{userData.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-500 mb-2">
                          <Phone className="h-4 w-4 mr-2" />
                          <span className="text-sm">Phone Number</span>
                        </div>
                        <p className="text-gray-900 font-medium">{userData.phone}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center text-gray-500 mb-2">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="text-sm">Email Address</span>
                        </div>
                        <p className="text-gray-900 font-medium">{userData.email}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="text-sm">Address</span>
                        </div>
                        <p className="text-gray-900 font-medium">{userData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    onClick={() => handleTabClick("update-profile")}
                    className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "update-profile" && (
              <motion.div
                key="update-profile"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Update Profile</h2>
                  <p className="mt-1 text-sm text-gray-500">Update your personal information and contact details.</p>
                </div>

                <form
                  onSubmit={handleSubmitProfile(onSubmitProfile)}
                  className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative">
                      <img
                        src={userData.image_url || "/placeholder.svg"}
                        alt={`${userData.first_name} ${userData.last_name}`}
                        className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-teal-100"
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 p-2 rounded-full bg-teal-600 text-white cursor-pointer shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 className="h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                        First name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        {...registerProfile("first_name", { required: "First name is required" })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errorsProfile.first_name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                      />
                      {errorsProfile.first_name && (
                        <p className="mt-1 text-sm text-red-600">{errorsProfile.first_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        {...registerProfile("last_name", { required: "Last name is required" })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errorsProfile.last_name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                      />
                      {errorsProfile.last_name && (
                        <p className="mt-1 text-sm text-red-600">{errorsProfile.last_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...registerProfile("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errorsProfile.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors  rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                      />
                      {errorsProfile.email && (
                        <p className="mt-1 text-sm text-red-600">{errorsProfile.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        {...registerProfile("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid 10-digit phone number",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errorsProfile.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                      />
                      {errorsProfile.phone && (
                        <p className="mt-1 text-sm text-red-600">{errorsProfile.phone.message}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        id="address"
                        rows={3}
                        {...registerProfile("address", { required: "Address is required" })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errorsProfile.address ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                      />
                      {errorsProfile.address && (
                        <p className="mt-1 text-sm text-red-600">{errorsProfile.address.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                    <motion.button
                      type="button"
                      onClick={() => handleTabClick("profile")}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isUpdating}
                      className={`px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-sm ${isUpdating ? "opacity-70" : "hover:bg-teal-700"}`}
                      whileHover={isUpdating ? {} : { scale: 1.02 }}
                      whileTap={isUpdating ? {} : { scale: 0.98 }}
                    >
                      {isUpdating ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Updating...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </motion.button>
                  </div>
                </form>

                <AnimatePresence>
                  {updateSuccess && (
                    <motion.div
                      className="fixed bottom-20 md:bottom-4 right-4 bg-green-50 p-4 rounded-lg border border-green-200 shadow-lg flex items-center"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                    >
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-800 font-medium">Profile updated successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                key="orders"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 max-w-4xl mx-auto"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Your Orders</h2>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                      whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start">
                          <div className="flex-shrink-0 w-full sm:w-20 h-20 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-4">
                            <Utensils
                              className="w-full h-full object-cover text-gray-700"
                            ></Utensils>
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{order.restaurant}</h3>
                                <p className="text-gray-500">{order.location}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                  ORDER #{order.display_id} | {order.date}
                                </p>
                              </div>
                              {!order.payment_status === "pending" && <div className="mt-2 sm:mt-0 sm:text-right">
                                <p className={`${getStatusColor(order.real_time_status)} font-medium`}>{order.real_time_status}</p>
                                <motion.button
                                  className="text-red-600 font-medium mt-2 hover:text-teal-700"
                                  whileHover={{ x: 3 }}
                                >
                                  {order.payment_status}
                                </motion.button>
                              </div>}
                              {order.payment_status === "pending" && <div className="mt-2 sm:mt-0 sm:text-right">
                                <p className="font-medium bg-red-200 text-red-700 rounded p-2" >Canceled</p>
                                
                              </div>}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                <p className="text-gray-700 mb-2 sm:mb-0">
                                  {order.items.map((item, index) => (
                                    <span key={index}>
                                      {item.name} x {item.quantity}
                                      {index < order.items.length - 1 ? ", " : ""}
                                    </span>
                                  ))}
                                </p>
                                {order.payment_status === "pending" ? (<p className="font-bold">Total Paid: ₹0 </p>):<p className="font-bold">Total Paid: ₹ {order.total}</p>}
                              </div>

                              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-3">
                                <Link to={`/customer/order/status?order_id=${order.display_id}`}>
                                <motion.button
                                  className="px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 w-full sm:w-auto"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  TRACK
                                </motion.button>
                                </Link>
                                <motion.button
                                  className="px-6 py-2 border border-orange-500 text-orange-500 font-medium rounded-md hover:bg-orange-50 w-full sm:w-auto"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  HELP
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Account Settings</h2>
                  <p className="mt-1 text-sm text-gray-500">Manage your account security and preferences.</p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-600" />
                    Change Password
                  </h3>
                  <p className="text-gray-500 mb-6">Update your password to maintain account security.</p>

                  <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-5">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="currentPassword"
                          {...registerPassword("currentPassword", {
                            required: "Current password is required",
                          })}
                          className={`w-full px-4 py-3 bg-gray-50 border ${
                            errorsPassword.currentPassword ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errorsPassword.currentPassword && (
                        <p className="mt-1 text-sm text-red-600">{errorsPassword.currentPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id="newPassword"
                          {...registerPassword("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                          })}
                          className={`w-full px-4 py-3 bg-gray-50 border ${
                            errorsPassword.newPassword ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errorsPassword.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errorsPassword.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          {...registerPassword("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) => value === newPassword || "Passwords do not match",
                          })}
                          className={`w-full px-4 py-3 bg-gray-50 border ${
                            errorsPassword.confirmPassword ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errorsPassword.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errorsPassword.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="pt-4">
                      <motion.button
                        type="submit"
                        disabled={isUpdating}
                        className={`w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-sm ${isUpdating ? "opacity-70" : "hover:bg-teal-700"}`}
                        whileHover={isUpdating ? {} : { scale: 1.02 }}
                        whileTap={isUpdating ? {} : { scale: 0.98 }}
                      >
                        {isUpdating ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating Password...
                          </>
                        ) : (
                          "Change Password"
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>

                <AnimatePresence>
                  {updateSuccess && (
                    <motion.div
                      className="fixed bottom-20 md:bottom-4 right-4 bg-green-50 p-4 rounded-lg border border-green-200 shadow-lg flex items-center"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                    >
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-800 font-medium">Password updated successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Placeholder content for other tabs */}
            {(activeTab === "super" ||
              activeTab === "favorites" ||
              activeTab === "payments" ||
              activeTab === "addresses") && (
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {activeTab === "super" && "Swiggy SUPER"}
                    {activeTab === "favorites" && "Your Favourites"}
                    {activeTab === "payments" && "Payment Methods"}
                    {activeTab === "addresses" && "Saved Addresses"}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">This section is under development.</p>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                  <Clock className="h-12 w-12 sm:h-16 sm:w-16 text-teal-500 mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-500 max-w-md">
                    We're working hard to bring you this feature. Please check back later!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}