import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Settings, LogOut, ChevronDown,LayoutDashboard, SquareDashedKanban, ShoppingBag, Users, ChefHat, TruckIcon, Wallet2, StarIcon, Menu as MenuIcon, X, User, Edit, BellIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser as userSessionLogout } from '../../helpers/utils';
import { logoutUser as userAuthLogout } from '../../redux/actions/auth';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', link:"/admin/home" },
  // { icon: ShoppingBag, label: 'Orders', link:"#" },
  { icon: Users, label: 'Restaurant Profile', link:"/admin/profile" },
  { icon: SquareDashedKanban, label: 'Menu', link:"/admin/menu" },
]

export default function DashboardLayout() {
  const [activeSidebarItem, setActiveSidebarItem] = useState("Dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isAuthenticated, isVendor } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(userAuthLogout())
    userSessionLogout()
  }

  useEffect(() => {
    if (!isAuthenticated && !isVendor) {
      navigate("/vendor/login")
    }
  }, [isAuthenticated, isVendor, navigate])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  }

  const SidebarContent = () => (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500 flex items-center">
          <ChefHat className="mr-2 text-red-500" />
          Spring Onion
        </h1>
      </div>
      <nav className="mt-8">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            onClick={() => {
              setActiveSidebarItem(item.label)
              setIsSidebarOpen(false)
            }}
            to={item.link}
            className={`rounded-tl-2xl rounded-bl-2xl flex ms-3 my-2 items-center px-4 py-2 text-gray-700 transition-colors duration-200 ease-in-out ${
              item.label === activeSidebarItem ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'
            }`}
          >
            <motion.span
              className="mr-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon />
            </motion.span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-60 p-4">
        <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ease-in-out">
          <Settings className="mr-3" />
          Settings
        </a>
        <button onClick={logOut} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ease-in-out w-full text-left">
          <LogOut className="mr-3" />
          Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-red-50">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 bg-white shadow-md">
        <SidebarContent />
      </aside>

      {/* Sidebar for mobile screens */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-gray-600 opacity-75"
              onClick={toggleSidebar}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-md"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <div className="absolute top-0 right-0 p-4">
                <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="mr-4 text-gray-500 hover:text-gray-800 md:hidden"
                onClick={toggleSidebar}
              >
                <MenuIcon className="h-6 w-6" />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200 ease-in-out"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-5 h-5" />
              </motion.button>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                  <img
                    src="https://www.fakemail.net/avatars/avat_005.png"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-700">Kaiya Botosh</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Menu.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                          to={"/admin/profile"}
                            className={`${
                              active ? 'bg-red-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors duration-200 ease-in-out`}
                          >
                            <User className="w-5 h-5 mr-2" aria-hidden="true" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/admin/profile/edit"}
                            className={`${
                              active ? 'bg-red-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors duration-200 ease-in-out`}
                          >
                            <Edit className="w-5 h-5 mr-2" aria-hidden="true" />
                            Edit Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/admin/notification"}
                            className={`${
                              active ? 'bg-red-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors duration-200 ease-in-out`}
                          >
                            <BellIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                            Notifications
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </header>

        {/* Breadcrumbs and Page Heading */}
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{activeSidebarItem}</h1>
        </div>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  )
}