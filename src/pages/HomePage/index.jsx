import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, MapPin, Clock, Star, Menu, X, ChefHat, Coffee, ImageOff } from 'lucide-react';
import SearchComponent from '../../components/MarketPlace/SearchComponent';
import vendor from '../../assets/vendor-13.jpg';
import appBg from '../../assets/chef-1.png';


const restaurants = [
  { name: 'Food world', rating: 4.6, status: 'Opens Tomorrow', image: vendor, discount: '20% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=F', distance: '1.2 km', cuisine: 'South Indian' },
  { name: 'Pizza hub', rating: 4.0, status: 'Opens Tomorrow', image: vendor, discount: '10% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=P', distance: '0.8 km', cuisine: 'Italian' },
  { name: 'Donuts hut', rating: 2.0, status: 'Open Now', image: vendor, discount: '15% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=D', distance: '1.5 km', cuisine: 'Desserts' },
  { name: 'Donuts hut', rating: 5.0, status: 'Open Now', image: vendor, discount: '15% off', isFast: true, logo: 'https://v0.dev/placeholder.svg?height=40&width=40&text=D', distance: '2.0 km', cuisine: 'Desserts' },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocated, setIsLocated] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-red-500 flex items-center">
            <ChefHat className="mr-2" />
            Spring Onion
          </a>
          {isLocated && <SearchComponent/>}
          <div className="hidden md:flex items-center space-x-4">
            {
              isAuthenticated ? 
              <>
                <div className="relative">
                  <input type="text" placeholder="Search for food or restaurants" className="pl-10 pr-4 py-2 border rounded-full w-64 hover:ring-1 hover:ring-red-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
                </div>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                  <ShoppingCart className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                  <User className="h-5 w-5" />
                </button>
              </>
              :
              <>
                <Link to={'/login'}className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Login</Link>
                <Link to={'/sign-up'}className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition duration-300">Sign Up</Link>
              </>
            }
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4">
            <div className="container mx-auto px-4 space-y-4">
              {
                isAuthenticated ?
                <>
                    <div className="relative">
                      <input type="text" placeholder="Search for food or restaurants" className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500" />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="flex justify-between">
                      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                        <User className="h-5 w-5" />
                      </button>
                    </div>
                </>
              :
                <div className="flex justify-between">
                  <Link to={'/login'} className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Login</Link>
                  <Link to={'/sign-up'} className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition duration-300">Sign Up</Link>
                </div>
              }
            </div>
          </div>
        )}
      </header>

      <main className="container-2xl mx-auto px-4 py-8">
        {isLocated ? 
        <></>
        :
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-8 text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Hungry? We've got you covered</h1>
            <p className="mb-6 text-lg">Order food from your favorite restaurants and get it delivered right to your doorstep.</p>
            <div className="flex justify-center">
              {/* <div className="relative w-full max-w-md">
                <input type="text" placeholder="Enter delivery address" className="w-full pl-10 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500" />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-red-500 px-4 py-1 rounded-full hover:bg-gray-100 transition duration-300">Find Food</button>
              </div> */}
              <SearchComponent />
            </div>
          </div>
        </section>  }
        

        <section className="mb-12 bg-light py-5 px-2">
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
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg">
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
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Choose Your Location</h3>
              <p className="text-gray-600">Enter your address to find nearby restaurants.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Search className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Choose Restaurant</h3>
              <p className="text-gray-600">Browse menus and select your favorite dishes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <ShoppingCart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Get It Delivered</h3>
              <p className="text-gray-600">Your order will be delivered to your doorstep.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img src={appBg} height={300} width={300} className="object-cover" alt="Mobile app" />
              </div>
              <div className="p-8 md:w-1/2">
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
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-red-500">Spring Onion </h3>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition duration-300">Food Delivery</a></li>
                <li><a href="#" className="hover:text-gray-300 transition duration-300">Restaurants</a></li>
                <li><a href="#" className="hover:text-gray-300 transition duration-300">Partnerships</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300 transition duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 FoodDash. All rights reserved.</p>
            <img src="/placeholder.svg?height=40&width=120" alt="Payment methods" className="h-8 mt-4 md:mt-0" />
          </div>
        </div>
      </footer>
    </div>
  )
}