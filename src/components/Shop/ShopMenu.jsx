import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Clock } from "lucide-react"
import FoodModal from "./FoodModel"
import { addToCart, removeToCart } from "../../redux/actions/cart"
import { useDispatch, useSelector } from "react-redux"


const ShopMenu = ({ menuItems }) => {
    const {cart} = useSelector((state) => state.cart)
    const [selectedFood, setSelectedFood] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    
    const isItemInCart = (id) => {
        return cart.some((item) => item.food_item_id === id);
    }

    const openModal = (food) => {
        setSelectedFood(food)
        setIsModalOpen(true)
        // Disable scrolling when modal is open
        document.body.style.overflow = "hidden"
    }
    
    const closeModal = () => {
        setIsModalOpen(false)
        // Re-enable scrolling
        document.body.style.overflow = "auto"
    }

    const handleAddToCart = (id, quantity) => {
        if(!isItemInCart(id)){
            const requestPayload = {
                food_item:id,
                quantity:quantity
            }
            dispatch(addToCart(requestPayload));
        }else{
            const cartItem = cart.find((item) => item.food_item_id === id).cart_item_id;
            // console.log("cartItem : ", cartItem);
            dispatch(removeToCart(cartItem));
        }
    }


    return (
        <>
        <div className="md:col-span-3">
            <motion.h2 className="text-2xl font-bold mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{
                duration: 0.5, delay: 0.4
            }}>
                Our Menu
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((food, index) => (
                    <motion.div key={food.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => openModal(food)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="relative h-48 overflow-hidden">
                            <motion.img
                                onLoad={()=>{setIsLoading(false)}}
                                onError={()=>{setIsLoading(false)}}
                                src={food.image} 
                                alt={food.name} 
                                className={`w-full h-full object-cover ₹{isLoading && "animate-pulse"}`} whileHover={{
                                scale: 1.05
                            }} transition={{ duration: 0.3 }} />
                            <div className="absolute top-2 left-2 bg-white p-1 rounded-md">
                                    <div className="w-4 h-4 border border-green-500 rounded-sm flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                            {/* {food.isVeg ? (
                                <div className="absolute top-2 left-2 bg-white p-1 rounded-md">
                                    <div className="w-4 h-4 border border-green-500 rounded-sm flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                            ) : (<div className="absolute top-2 left-2 bg-white p-1 rounded-md">
                                <div className="w-4 h-4 border border-red-500 rounded-sm flex items-center justify-center">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                            </div>)} */}
                        </div>

                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-lg">{food.name}</h3>
                                <div className="flex items-center bg-yellow-100 px-1.5 py-0.5 rounded">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs font-medium ml-0.5">{food.rating}</span>
                                </div>
                            </div>

                            <div className="flex items-center mt-1 text-sm text-gray-500">
                                <span>By {food.restaurant}</span>
                                <div className="mx-2 w-1 h-1 bg-gray-500 rounded-full"></div>
                                <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>{food.time}</span>
                                </div>
                            </div>

                            <div className="mt-3 flex justify-between items-center">
                                <span className="font-bold text-red-500">₹{food.price/100}</span>
                                <motion.button
                                    className="text-xs bg-red-500 text-white px-2 py-1 rounded-full flex items-center"
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => {
                                        e.stopPropagation()
                                        handleAddToCart(food.id, 1);
                                    }}
                                >
                                    {!isItemInCart(food.id) ? ("Add to cart") : ("Remove item")}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
        <AnimatePresence>
        {isModalOpen && selectedFood && <FoodModal food={selectedFood}  onClose={closeModal} />} {/** addOns={addOns}  */}
      </AnimatePresence>
    </>

    )
}

export default ShopMenu;