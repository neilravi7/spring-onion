import { MapPin, Clock, Star } from 'lucide-react';

export default function VendorCard(vendor) {
    const restaurant = vendor.vendor;
    
    return (
        <div key={restaurant.id} className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <div className="relative">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {restaurant.discount}
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
                        <span>{restaurant.distance}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                        {restaurant.cuisine}
                    </div>
                </div>
                <div className={`text-sm font-semibold ${restaurant.status === 'Open Now' ? 'text-green-500' : 'text-orange-500'}`}>
                    {restaurant.status}
                </div>
            </div>
        </div>
    )
}