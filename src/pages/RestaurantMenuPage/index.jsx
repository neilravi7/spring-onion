import { useEffect, useState } from "react";
import Navbar from "../../components/Shop/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { requestMaker, requestOptionCreator } from "../../helpers/request";
import { API_URL } from "../../helpers/urls";
import toast from "react-hot-toast";
import DeliveryGuy from "../../components/Loader/DeliveryGuy";
import ShopCard from "../../components/Shop/ShopCard";
import ShopMenu from "../../components/Shop/ShopMenu";


function RestaurantMenuPage() {
  const {isAuthenticated, isCustomer} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(() => {});
  const [menuItems, setMenuItems] = useState(() => []);
  const restaurantId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurantAndMenu = () => {
    const requestOptions = requestOptionCreator("GET", {}, true);
    
    // fetch shop details
    requestMaker(
      API_URL.loadVendorProfile(restaurantId), 
      requestOptions)
      .then(
        (response) => {
          if(response.isError){
            toast.error("Unable to load shop data");
          }
          else{
            // toast.success("Shop data loaded successfully");
            setRestaurant(response.data);
        }
      }
    )
    // get shop menu
    requestMaker(
      API_URL.getShopMenu(restaurantId), 
      requestOptions)
      .then(
        (response) => {
          if(response.isError){
            toast.error("Unable to load shop menu");
          }else{
            toast.success("Shop Data Loaded");
            setMenuItems(response.data);
            setIsLoading(false);
            
          }
        }
      )
  }

  useEffect(() => {
    if(!isAuthenticated && !isCustomer){
      navigate("/");
    }
    fetchRestaurantAndMenu();
  }, [isAuthenticated, isCustomer]);

  // Fallback Loader
  if(isLoading){
    return <DeliveryGuy />
  }

  return (
    
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <ShopCard restaurant={restaurant}/>
        <ShopMenu menuItems={menuItems} /> 
      </div>
    </div>
  )
}

export default RestaurantMenuPage;