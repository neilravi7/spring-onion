import { useEffect, useState } from 'react'
import { Clock, MapPin, Mail, User, Edit, Plus } from 'lucide-react'
import vendor from "../../../assets/vendor-16.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { requestMaker, requestOptionCreator } from '../../../helpers/request';
import { API_URL } from '../../../helpers/urls';
import { getUserID } from '../../../helpers/utils';
import toast from 'react-hot-toast';

const initialRestaurantData = {
  // additionalFields: [
//   { key: "Phone", value: "(555) 123-4567" },
//   { key: "Cuisine Type", value: "International" }
// ]
}

export default function RestaurantProfile() {
  const {isAuthenticated, isVendor} = useSelector((state) => state.auth);
  const [restaurantData, setRestaurantData] = useState(initialRestaurantData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [isEditing, setIsEditing] = useState(false)

  const toggleDeliveryStatus = () => {
    setRestaurantData(prev => ({
      ...prev,
      isAcceptingDeliveries: !prev.isAcceptingDeliveries
    }))
  }

  // const addNewField = () => {
  //   setRestaurantData(prev => ({
  //     ...prev,
  //     additionalFields: [...prev.additionalFields, { key: "New Field", value: "New Value" }]
  //   }))
  // }

  const fetchVendorProfile = () => {
    const vendorID = getUserID();
    const requestOption = requestOptionCreator("GET", {}, true);
    requestMaker(
      API_URL.loadVendorProfile(vendorID), 
      requestOption, dispatch).then((response) => {
        if(!response.isError){
          toast.success("Restaurant Data Fetched Successfully");
          setRestaurantData(response.data);
        }else{
          toast.error("Unable to get Restaurant Data");
        }
    });
  }


  useEffect(() => {
    if(!isAuthenticated && !isVendor){
      navigate("/vendor/login");
    }
    fetchVendorProfile();
  },[isAuthenticated, isVendor]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <img
            src={restaurantData.image === "" ? vendor : restaurantData.image}
            alt={restaurantData.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{restaurantData.name}</h1>
            <Link
              to={"/admin/profile/edit"}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit className="w-5 h-5" />
              <span className="sr-only">Edit Profile</span>
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{restaurantData.ownerName}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">{restaurantData.email}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1" />
              <span className="text-gray-700">{restaurantData.address}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">
                {restaurantData.openTime} - {restaurantData.closeTime}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={toggleDeliveryStatus}
              className={`px-4 py-2 rounded-full font-semibold ${
                restaurantData.isAcceptingDeliveries
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {restaurantData.isAcceptingDeliveries ? 'Accepting Deliveries' : 'Not Accepting Deliveries'}
            </button>
          </div>
        </div>
      </div>

      {/* <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
        <div className="space-y-3">
          {restaurantData.additionalFields.map((field, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{field.key}:</span>
              <span className="text-gray-600">{field.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={addNewField}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add New Field
        </button>
      </div> */}

      {/* {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <p className="text-gray-600 mb-4">Editing functionality to be implemented.</p>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </div>
  )
}