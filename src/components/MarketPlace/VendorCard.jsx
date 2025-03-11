import { MapPin, Clock, Star } from 'lucide-react';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

export default function VendorCard(vendor) {
    const restaurant = vendor.vendor;

    return (
        <Link to={`/restaurant/${restaurant.user}`}>
            <motion.div
                // key={restaurant.id}
                className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="relative">
                    <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        {`${restaurant.discount}% off`}
                    </div>
                    {restaurant.isFast && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                            <Clock className="w-4 h-4 mr-1" /> Fast
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                            {/* <img src={restaurant.logo} alt={`${restaurant.name} logo`} className="w-10 h-10 mr-2 rounded-md" /> */}
                            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                        </div>
                        <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-500 mr-1" />
                            <span className="font-semibold">{restaurant.rating}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {/* <span>{restaurant.distance}</span> */}
                            <span>{"unable to measure"}</span>

                        </div>
                        <div className="text-sm text-gray-600">
                            {restaurant.cuisine_type}
                        </div>
                    </div>

                    {restaurant.is_active ? <div className="text-sm font-semibold text-green-500">
                        Open Now
                    </div> : <div className="text-sm font-semibold text-orange-500">
                        Open Tomorrow
                    </div>}
                </div>
            </motion.div>
        </Link>

    )
}