import { motion } from 'framer-motion';
import { TruckIcon, Wallet2, StarIcon, Star } from 'lucide-react';


const orders = [
  { date: '01/Sep/22', id: '#4357', menu: 'Veg Pizza', rating: 5, reviews: 54, amount: '$45.24', status: 'Refund' },
  { date: '01/Sep/22', id: '#4358', menu: 'Butter Bread', rating: 5, reviews: 23, amount: '$50.34', status: 'Paid' },
  { date: '04/Sep/22', id: '#4360', menu: 'Mutton Biryani', rating: 4, reviews: 12, amount: '$34.21', status: 'Cancel' },
  { date: '04/Sep/22', id: '#4359', menu: 'Seafood Pizza', rating: 4, reviews: 26, amount: '$25.00', status: 'Paid' },
  { date: '07/Sep/22', id: '#4361', menu: 'Butter Cookies', rating: 3, reviews: 26, amount: '$49.99', status: 'Refund' },
]

function VendorHome() {
  return (
    <div>
      {/* Stats */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { icon: TruckIcon, label: 'Food Delivery', value: '10,000' },
          { icon: Wallet2, label: 'Your Balance', value: '$89,000' },
          { icon: StarIcon, label: 'Satisfaction Rating', value: '98%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white overflow-hidden shadow rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-900 truncate">{stat.label}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order History */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Order History</h2>
          <select className="w-full sm:w-52 mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md">
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
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
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
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Paid' ? 'bg-green-100 text-green-800' :
                              order.status === 'Refund' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VendorHome;