import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Settings, LogOut, ChevronDown, Star, PlusCircle } from 'lucide-react'

const sidebarItems = [
  { icon: 'Grid', label: 'Dashboard', active: true },
  { icon: 'Sliders', label: 'Manage' },
  { icon: 'ShoppingBag', label: 'Orders' },
  { icon: 'Users', label: 'Customers' },
  { icon: 'Store', label: 'Restaurants' },
  { icon: 'Package', label: 'Product' },
]

const stats = [
  { icon: 'Truck', label: 'Food Delivered', value: '23,568' },
  { icon: 'Wallet', label: 'Your Balance', value: '$ 8,904.80' },
  { icon: 'Star', label: 'Satisfaction Rating', value: '98%' },
]

const orders = [
  { date: '01/Sep/22', id: '#4357', menu: 'Veg Pizza', rating: 5, reviews: 54, amount: '$45.24', status: 'Refund' },
  { date: '01/Sep/22', id: '#4358', menu: 'Butter Bread', rating: 5, reviews: 23, amount: '$50.34', status: 'Paid' },
  { date: '04/Sep/22', id: '#4360', menu: 'Mutton Biryani', rating: 4, reviews: 12, amount: '$34.21', status: 'Cancel' },
  { date: '04/Sep/22', id: '#4359', menu: 'Seafood Pizza', rating: 4, reviews: 26, amount: '$25.00', status: 'Paid' },
  { date: '07/Sep/22', id: '#4361', menu: 'Butter Cookies', rating: 3, reviews: 26, amount: '$49.99', status: 'Refund' },
]

const mealPlan = [
  { time: '8:25 AM', meal: 'Breakfast', items: [
    { name: 'Butter Bread', price: '$1.25', originalPrice: '$1.50' },
    { name: 'Fresh Salad', price: '$0.78', originalPrice: '$0.99' },
  ]},
  { time: '6:25 AM', meal: 'Breakfast', items: [
    { name: 'Curry Fried Rice', price: '$1.25', originalPrice: '$1.50' },
    { name: 'Barbeque', price: '$0.78', originalPrice: '$0.99' },
  ]},
  { time: '08:30 PM', meal: 'Dinner', items: [] },
]

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('Customers List')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-red-500 flex items-center">
            <img src="/placeholder.svg?height=24&width=24" alt="Yum logo" className="mr-2" />
            Yum
          </h1>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 ${
                item.active ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <Settings className="mr-3" />
            Settings
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
            <LogOut className="mr-3" />
            Logout
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-700">Kaiya Botosh</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex">
              {['Customers List', 'Customers Grid'].map((tab) => (
                <button
                  key={tab}
                  className={`${
                    activeTab === tab
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{item.label}</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order History */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Order History</h2>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md">
                <option>All</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Menu
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img className="h-10 w-10 rounded-full" src="/placeholder.svg?height=40&width=40" alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{order.menu}</div>
                                  <div className="flex items-center">
                                    {[...Array(order.rating)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 text-yellow-400" />
                                    ))}
                                    <span className="ml-1 text-sm text-gray-500">({order.reviews})</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                order.status === 'Refund' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Plan */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Meal Plan</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {mealPlan.map((meal, mealIndex) => (
                  <li key={mealIndex}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-red-600 truncate">{meal.meal}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {meal.time}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          {meal.items.length > 0 ? (
                            meal.items.map((item, itemIndex) => (
                              <p key={itemIndex} className="flex items-center text-sm text-gray-500 mr-6">
                                <img src="/placeholder.svg?height=20&width=20" alt={item.name} className="flex-shrink-0 mr-1.5 h-5 w-5 rounded-full" />
                                {item.name}
                                <span className="ml-1 font-medium text-gray-900">{item.price}</span>
                                <span className="ml-1 text-xs line-through text-gray-400">{item.originalPrice}</span>
                              </p>
                            ))
          ) : (
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <PlusCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              Add meal
                            
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}