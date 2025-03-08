import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChefHat, LogOut, MapPin, ChevronDown } from 'lucide-react';
import { logoutUser as userSessionLogout, truncateString } from '../../helpers/utils';
import { logoutUser as userAuthLogout } from '../../redux/actions/auth';
import toast from 'react-hot-toast';

export default function Header() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [manualLocation, setManualLocation] = useState("");
    const dispatch = useDispatch();

    const handleLogout = () => {
        userSessionLogout();
        dispatch(userAuthLogout());
    };

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
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                <a href="/" className="text-2xl font-bold text-red-600 flex items-center">
                    
                    Spring<ChefHat className="text-gray-600"/>Onion
                </a>
                {isAuthenticated && 
                <button onClick={() => setShowModal(true)} className=" w-96 flex items-center pl-5 pr-4 py-2 border rounded-full w-64 hover:ring-1 hover:ring-red-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <MapPin className={!location? "w-6 h-6 mr-1" : "w-6 h-6 mr-1 text-green-400"} />
                    {truncateString(location, 30) || "Locate Me"}
                </button>}
                <div className="hidden md:flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <div className="relative">
                                <input type="text" placeholder="Search for food or restaurants" className="pl-10 pr-4 py-2 border rounded-full w-64 hover:ring-1 hover:ring-red-200 focus:outline-none focus:ring-2 focus:ring-red-500" />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                            </div>
                            <div className='relative'>
                                <button className="p-3 rounded-full font-extrabold bg-red-500 hover:bg-red-600 text-white transition duration-300">
                                    <ShoppingCart className="h-5 w-5" />
                                </button>
                                <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded-full border border-gray-500">
                                    {6}
                                </span>
                            </div>

                            <button className="p-3 rounded-full font-extrabold bg-red-500 hover:bg-red-600 text-white transition duration-300">
                                <User className="h-5 w-5" />
                            </button>
                            <button onClick={handleLogout} className="p-3 rounded-full font-extrabold bg-red-500 hover:bg-red-600 text-white transition duration-300">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={'/vendor/on-boarding'} className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Add Restaurant</Link>
                            <Link to={'/login'} className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition duration-300">Login</Link>
                            <Link to={'/sign-up'} className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition duration-300">Sign Up</Link>
                        </>
                    )}
                </div>
                <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
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
        </header>
    );
}