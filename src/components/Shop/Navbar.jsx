import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ShoppingBag, User, Menu, Search, X, ChefHat, LogOut, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser as userSessionLogout } from "../../helpers/utils";
import { logoutUser as userAuthLogout } from "../../redux/actions/auth";
import { truncateString } from "../../helpers/utils";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [location, setLocation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [manualLocation, setManualLocation] = useState("");
  const dispatch = useDispatch();

  // Logout
  const handleLogout = () => {
    userSessionLogout();
    dispatch(userAuthLogout());
  };

  // Mobile Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Function to fetch address from coordinates using Mapbox Geocoding API
  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    const accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your Mapbox access token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        // Extract the address from the first feature
        const address = data.features[0].place_name;
        setLocation(address);
      } else {
        toast.error("Address not found please enter manually");
        setLocation("Address not found please enter manually");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setLocation("Error fetching address");
    }
  };

  // Get location trough coordinates 
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromCoordinates(latitude, longitude); // Fetch address using Mapbox
          setShowModal(false);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };



  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-red-500">Spring</span>
              <span className="text-2xl font-bold text-green-500"><ChefHat/></span>
              <span className="text-2xl font-bold text-red-500">Onion</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          {/* <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NavLink href="/" isActive>
              Home
            </NavLink>
            <NavLink href="/menu">Menu</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </motion.div> */}

          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isAuthenticated && 
              <button onClick={() => setShowModal(true)} className=" w-96 flex items-center pl-5 pr-4 py-2 border rounded-full w-64 hover:ring-1 hover:ring-red-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <MapPin className={!location? "w-6 h-6 mr-1" : "w-6 h-6 mr-1 text-green-400"} />
                  {truncateString(location, 30) || "Locate Me"}
              </button>
            }
            
          </motion.div>

          {/* User Actions */}
          {isAuthenticated ? (<motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              className="relative p-2 text-gray-700 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </motion.button>
            <motion.button
              className="p-2 text-gray-700 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="p-2 text-gray-700 hover:text-red-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={()=>{handleLogout()}}
            >
              <LogOut className="w-6 h-6" />
            </motion.button>
          </motion.div>) : (
            <>
              <Link to={'/vendor/on-boarding'} className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Add Restaurant</Link>
              <Link to={'/login'} className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Login</Link>
              <Link to={'/sign-up'} className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition duration-300">Sign Up</Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-red-500 focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-white shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-red-500 bg-red-50">
              Home
            </a>
            <a
              href="/menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-red-50"
            >
              Menu
            </a>
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-red-50"
            >
              About
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-500 hover:bg-red-50"
            >
              Contact
            </a>
          </div>
        </motion.div>
      )}
      {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-lg font-semibold text-red-500">Set Your Location</h2>
                        <button onClick={getLocation} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Use My Location</button>
                        <input
                            type="text"
                            placeholder="Enter location manually"
                            value={manualLocation}
                            onChange={(e) => setManualLocation(e.target.value)}
                            className="mt-4 w-full p-2 border rounded hover:ring-1 hover:ring-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={() => { setLocation(manualLocation); setShowModal(false); }}
                            className="mt-3 me-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Save Location
                        </button>
                        <button onClick={() => setShowModal(false)} className="mt-3 ms-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
                    </div>
                </div>
            )}
    </nav>
  )
}

// const NavLink = ({ href, children, isActive }) => {
//   return (
//     <motion.a
//       href={href}
//       className={`text-base font-medium ${isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"} transition-colors`}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       {children}
//     </motion.a>
//   )
// }

export default Navbar

