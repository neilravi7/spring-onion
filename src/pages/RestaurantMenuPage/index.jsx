import React from 'react';
import { ShoppingBag, Clock, Star, Phone, Utensils, Pizza, Wine, IceCream } from 'lucide-react';

export default function RestaurantMenuPage() {
  return (
    <div className="bg-[#fbfbfb] min-h-screen">
      <header className="bg-[#fff0e9] px-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">FoodMarket</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition duration-300">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition duration-300">Restaurants</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition duration-300">Cuisines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition duration-300">Offers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-red-500 transition duration-300">About Us</a></li>
            </ul>
          </nav>
          <div className="flex space-x-2">
            <button className="text-red-500 font-semibold hover:text-red-600 transition duration-300">Login</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300">Sign Up</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Burger Palace</h1>
              <p className="text-gray-600 mb-2">American, Burgers, Fast Food</p>
              <div className="flex items-center">
                <Star className="text-yellow-500 mr-1" />
                <span className="font-semibold mr-2">4.5</span>
                <span className="text-gray-600">(500+ ratings)</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="flex items-center text-gray-600 mb-2">
                <Clock className="mr-2" /> 20-30 min delivery
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="mr-2" /> +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Open Now</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Free Delivery</span>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Online Payment Available</span>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Menu Categories</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {[
              { name: 'Burgers', icon: Utensils },
              { name: 'Sides', icon: Pizza },
              { name: 'Drinks', icon: Wine },
              { name: 'Desserts', icon: IceCream }
            ].map((category, index) => (
              <button key={index} className="bg-white px-4 py-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition duration-300 flex items-center space-x-2">
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
