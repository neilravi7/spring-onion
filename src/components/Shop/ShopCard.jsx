import { useState } from "react";
import { motion } from "framer-motion";
import BusinessHours from "./BusinessHours";
import { Star, Clock, MapPin, Phone, TrainTrack } from "lucide-react";
import {getDistance} from "../../helpers/utils";
import { useSelector } from "react-redux";

// Menu categories
const menuCategories = ["All", "Burgers", "Pizza", "Sides", "Beverages", "Desserts"]
const ShopCard = ({ restaurant }) => {
    const [activeCategory, setActiveCategory] = useState("All")
    const {lat, long} = useSelector((state) => state.auth.user);

    return (
        <motion.div className="md:col-span-1 bg-white p-3 rounded-xl shadow-lg h-fit" initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 capitalize">{restaurant.name}</h2>

                {/* <div className="flex items-center mb-2">
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          {restaurant.openTime}
        </span>
        <span className="ml-2 text-sm text-gray-500">Closes at {restaurant.closeTime}</span>
      </div> */}

                <BusinessHours openTime={restaurant.openTime} closeTime={restaurant.closeTime} />

                <div className="flex items-center text-yellow-500 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current text-gray-300" />
                    <span className="ml-1 text-gray-700 text-sm">(120 reviews)</span>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                        <p className="text-gray-700 text-xs">{restaurant.address}</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <TrainTrack className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                        <p className="p-2 font-bold text-sm text-yellow-700 bg-yellow-300 rounded text-center">{getDistance(restaurant.lat, restaurant.long, lat, long).toFixed(0)} km away</p>
                    </div>

                </div>
                <div className="flex items-center">
                    <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="ml-2 text-gray-700 text-sm">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center">
                    <Clock className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="ml-2 text-gray-700 text-sm">Delivery: 20-30 min</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold mb-2">Cuisine Type</h3>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Fast Food</span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Burgers</span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">American</span>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-2">Menu Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {menuCategories.map((category, index) => (
                        <motion.button key={index} className={`px-3 py-1 rounded-full text-sm ${activeCategory === category
                            ? "bg-red-500 text-white" : "bg-gray-100 text-gray-800"}`} onClick={() => setActiveCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>

    );
};

export default ShopCard;
