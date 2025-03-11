import { useState } from "react"
import { motion } from "framer-motion"
import { X, Minus, Plus, ShoppingCart} from "lucide-react"

const FoodModal = ({ food, onClose }) => {
  const [quantity, setQuantity] = useState(1)
  // const [selectedAddOns, setSelectedAddOns] = useState([])

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // const toggleAddOn = (addOn) => {
  //   setSelectedAddOns((prev) => {
  //     if (prev.some((item) => item.id === addOn.id)) {
  //       return prev.filter((item) => item.id !== addOn.id)
  //     } else {
  //       return [...prev, addOn]
  //     }
  //   })
  // }

  const calculateTotal = () => {
    // const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0)
    return (food.price * quantity)/100 //+ addOnsTotal
  }

  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
        onClick={handleModalClick}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md z-10" onClick={onClose}>
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Food Image */}
        <div className="md:w-2/5 h-64 md:h-auto relative">
          <motion.img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          {food.isVeg && (
            <div className="absolute top-4 left-4 bg-white p-1 rounded-md">
              <div className="w-5 h-5 border border-green-500 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Food Details */}
        <div className="md:w-3/5 p-6 overflow-y-auto">
          <div className="mb-4">
            {food.isVeg && (
              <div className="inline-flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm mb-2">
                <div className="w-3 h-3 border border-green-500 rounded-sm flex items-center justify-center mr-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </div>
                Pure veg
              </div>
            )}
            <h2 className="text-2xl font-bold">{food.name}</h2>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-yellow-500">
                <span className="text-sm font-medium mr-1">4.5</span>
                <span className="text-sm text-gray-500">- {32} Reviews</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{food.description}</p>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Price</h3>
              <p className="text-xl text-red-500 font-bold">${food.price/100}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <motion.button
                  className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center"
                  onClick={decreaseQuantity}
                  whileTap={{ scale: 0.9 }}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <motion.button
                  className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center"
                  onClick={increaseQuantity}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* <div className="mb-6">
            <h3 className="font-semibold mb-3">Add On</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addOns.map((addOn) => (
                <motion.div
                  key={addOn.id}
                  className={`flex items-center p-2 border rounded-lg cursor-pointer ${
                    selectedAddOns.some((item) => item.id === addOn.id) ? "border-red-500 bg-red-50" : "border-gray-200"
                  }`}
                  onClick={() => toggleAddOn(addOn)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={addOn.image || "/placeholder.svg"}
                    alt={addOn.name}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{addOn.name}</p>
                    <p className="text-sm text-gray-500">${addOn.price.toFixed(2)}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      selectedAddOns.some((item) => item.id === addOn.id)
                        ? "bg-red-500 text-white"
                        : "border border-gray-300"
                    }`}
                  >
                    {selectedAddOns.some((item) => item.id === addOn.id) && <Check className="w-4 h-4" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div> */}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <motion.button
              className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add To Cart - ${calculateTotal()}
            </motion.button>
            {/* <motion.button
              className="flex-1 border border-red-500 text-red-500 py-3 rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Buy Now
            </motion.button> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FoodModal