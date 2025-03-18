// hooks
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//assets
import { Search, ShoppingCart, MapPin, Clock, Star, Coffee } from 'lucide-react';
import vendor from '../../assets/vendor-13.jpg';
import appBg from '../../assets/chef-1.png';

// Components
// import Header from '../../components/MarketPlace/Header';
import Footer from '../../components/MarketPlace/Footer';
import VendorCard from '../../components/MarketPlace/VendorCard';
import Navbar from '../../components/Shop/Navbar';

//utility functions
import { requestMaker, requestOptionCreator } from '../../helpers/request';
import { API_URL } from '../../helpers/urls';
import toast from 'react-hot-toast';


const restaurantsList = [
  { id: 1, name: 'Food world', rating: 4.6, status: 'Opens Tomorrow', image: vendor, discount: '20% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=F', distance: '1.2 km', cuisine: 'South Indian' },
  { id: 2, name: 'Pizza hub', rating: 4.0, status: 'Opens Tomorrow', image: vendor, discount: '10% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=P', distance: '0.8 km', cuisine: 'Italian' },
  { id: 3, name: 'Donuts hut', rating: 2.0, status: 'Open Now', image: vendor, discount: '15% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=D', distance: '1.5 km', cuisine: 'Desserts' },
  { id: 4, name: 'Donuts hut', rating: 5.0, status: 'Open Now', image: vendor, discount: '15% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=D', distance: '2.0 km', cuisine: 'Desserts' },
]

const categories = [
  { id: 1, name: "Fast Food", image: "/placeholder.svg?height=60&width=60" },
  { id: 2, name: "Pizza", image: "/placeholder.svg?height=60&width=60" },
  { id: 3, name: "Sushi", image: "/placeholder.svg?height=60&width=60" },
  { id: 4, name: "Chinese", image: "/placeholder.svg?height=60&width=60" },
  { id: 5, name: "Italian", image: "/placeholder.svg?height=60&width=60" },
  { id: 6, name: "Mexican", image: "/placeholder.svg?height=60&width=60" },
]

export default function HomePage() {
  const { isAuthenticated, isLocated, isVendor } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState(restaurantsList);

  const fetchRestaurants = () => {
    const requestOptions = requestOptionCreator("GET", {}, true);
    requestMaker(API_URL.getAllVendor(), requestOptions).then((response) => {
      if(response.isError){
        toast.error("Unable to load restaurants");
        setRestaurants([]);
      }else{
        toast.success("Restaurants data loaded successfully");
        setRestaurants(response.data);
      }
    })
  }

  useEffect(() => {
    if (!isAuthenticated && isVendor) {
      navigate("/admin/login");
    }
    if(isAuthenticated)
      {
        fetchRestaurants();
      }
  }, [isAuthenticated, isVendor]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Menu */}
      <Navbar />
      {/* Header End */}
      {/* Section container */}
      <main className="container mx-auto px-4 py-5">

        {/* <section className="mb-12 bg-light py-2 px-2">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="text-center group">
                <div className="bg-red-100 rounded-full p-8 inline-block mb-4 group-hover:bg-red-200 transition duration-300">
                  <Coffee className="text-4xl text-red-500 group-hover:text-red-600 transition duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              </div>
            ))}
          </div>
        </section> */}

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Vendor Cards */}
            {
              restaurants.map(
                (restaurant, index) => <VendorCard key={index} vendor={restaurant} />
              )
            }
          </div>
        </section>

        {!isAuthenticated && <>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            <div className="p-6 rounded-lg shadow-md text-center bg-green-500">
              <MapPin className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">Choose Your Location</h3>
              <p className=" text-white">Enter your address to find nearby restaurants.</p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-lg shadow-md text-center">
              <Search className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2 text-white">Choose Restaurant</h3>
              <p className="text-white">Browse menus and select your favorite dishes.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <ShoppingCart className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-white font-bold text-lg mb-2">Get It Delivered</h3>
              <p className="text-white">Your order will be delivered to your doorstep.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-red-600 rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img src={appBg} height={300} width={300} className="object-cover" alt="Mobile app" />
              </div>
              <div className="p-8 md:w-1/2 bg-white">
                <h2 className="text-2xl font-bold mb-4">Get the FoodDash App</h2>
                <p className="text-gray-600 mb-6">Get the full FoodDash experience on your phone. Order food, track delivery in real-time, and more!</p>
                <div className="flex space-x-4">
                  <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-300">App Store</button>
                  <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-300">Google Play</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>}
      </main>
      {/* Section container end*/}

      {/* Footer */}
      <Footer />
      {/* Footer End */}
    </div>
  )
}