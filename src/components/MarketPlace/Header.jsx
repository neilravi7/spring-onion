import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChefHat, LogOut } from 'lucide-react';

import { logoutUser as userSessionLogout } from '../../helpers/utils';
import { logoutUser as userAuthLogout } from '../../redux/actions/auth';

export default function Header() {
    const { isAuthenticated } = useSelector((state) => state.auth); //isLocated, isCustomer
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch();

    //!handle logout functionality
    const handleLogout = () => {
        userSessionLogout();
        dispatch(userAuthLogout());
    }

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                <a href="/" className="text-2xl font-bold text-red-500 flex items-center">
                    <ChefHat className="mr-2" />
                    Spring Onion
                </a>
                {/* Search Component */}
                {/* GOES HERE */}
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
                                <button onClick={() => handleLogout()} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                            :
                            <>
                                <Link to={'/vendor/on-boarding'} className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Add Restaurant</Link>
                                <Link to={'/login'} className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Login</Link>
                                <Link to={'/sign-up'} className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition duration-300">Sign Up</Link>
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
                                        <button onClick={() => handleLogout()} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                                            <LogOut className="h-5 w-5" />
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
    )
}