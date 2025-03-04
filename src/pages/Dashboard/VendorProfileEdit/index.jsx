import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { User, Mail, Phone, MapPin, Utensils, FileText, Check } from 'lucide-react';
import { requestOptionCreator, requestMaker } from '../../../helpers/request';
import { API_URL } from '../../../helpers/urls';
import { getUserID } from '../../../helpers/utils';
import { getAccessToken } from '../../../helpers/utils';
import { form } from 'framer-motion/client';
// import { pre } from 'framer-motion/client';


const initialRestaurantData = {
  "first_name": "",
  "last_name": "",
  "email": "",
  "image_url": "",
  "name": "",
  "phone": "",
  "cuisine_type": [],
  "description": "",
  "is_active": false,
  "address": ""
}

export default function ProfileEditContent() {
  const [restaurantData, setRestaurantData] = useState(() => initialRestaurantData);
  const {isAuthenticated} = useSelector((state) => state.auth);
  const [imageUrl, setImageUrl] = useState(() => "");
  const [isImageUploading, setIsImageUploading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: restaurantData
  });


  // Handle Image Changes {Uploading New Images}

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setIsImageUploading(true);
  
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("album", "BHPmGr");
  
      const token = getAccessToken();
      
      if (!token) {
        toast.error("Unauthorized: Please log in again.");
        return;
      }
      
      fetch(API_URL.fileUploadAPI(), {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to upload the image");
          }
          return response.json();
        })
        .then((data) => {
          setRestaurantData({...restaurantData, image_url:data.url});
          setImageUrl(data.url);
          setIsImageUploading(false);
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
          setIsImageUploading(false);
        });
    }
  };
  
  // Fetching Vendor Data
  const fetchVendor = () => {
    const vendorID = getUserID();
    const requestOptions = requestOptionCreator("GET", {}, true);
    requestMaker(API_URL.loadVendorDetail(vendorID), requestOptions)
    .then((response) => {
      if(response.isError){
        toast.error("Error while loading vendor data");
      }else{
        setRestaurantData(response.data);
        setImageUrl(response.data.image_url); // exceptional
        reset(response.data);
      }
    })
  }

  // Updating vendor data
  const updateVendor = (requestBody) => {
    const vendorID = getUserID();
    const requestOptions = requestOptionCreator("PUT", requestBody, true);
    requestMaker(API_URL.updateVendorProfile(vendorID), requestOptions)
    .then((response) => {
      if(response.isError){
        toast.error("Error while load vendor data");
      }else{
        setRestaurantData(response.data);
        reset(response.data);
        toast.success("Profile Updated");
      }
    })
  }

  const onSubmit = (data) => {
    const formData = {...data, image_url:imageUrl, is_active:true}
    setRestaurantData(formData);
    updateVendor(formData);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/vendor/login");
    }
    if (restaurantData.name === "") {
      fetchVendor();
    }
  },[isAuthenticated, restaurantData.name]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Restaurant Profile</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={restaurantData.image_url}
              alt={restaurantData.name}
              className="w-full h-auto rounded-lg shadow-md cursor-pointer mb-4"
            />
            <input
              type="file"
              id="image_url"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
              <input
                {...register("name", { required: "Restaurant name is required" })}
                id="name"
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 inline-block mr-1" />
                  First Name
                </label>
                <input
                  {...register("first_name", { required: "First name is required" })}
                  id="first_name"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>}
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 inline-block mr-1" />
                  Last Name
                </label>
                <input
                  {...register("last_name", { required: "Last name is required" })}
                  id="last_name"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 inline-block mr-1" />
                Email Address
              </label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                id="email"
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 inline-block mr-1" />
                Phone Number
              </label>
              <input
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10,12}$/,
                    message: "Invalid phone number"
                  }
                })}
                id="phone"
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 inline-block mr-1" />
            Address
          </label>
          <textarea
            {...register("address", { required: "Address is required" })}
            id="address"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="cuisine_type" className="block text-sm font-medium text-gray-700">
            <Utensils className="w-4 h-4 inline-block mr-1" />
            Cuisine Type
          </label>
          <input
            {...register("cuisine_type.0", { required: "Cuisine type is required" })}
            id="cuisine_type"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.cuisine_type && <p className="mt-1 text-sm text-red-600">{errors.cuisine_type[0]?.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4 inline-block mr-1" />
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            id="description"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div >
          <label className="flex items-center">
            <input
              {...register("is_active")}
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">
              <Check className="w-4 h-4 inline-block mr-1" />
              Active
            </span>
          </label>
        </div>

        <div className="flex items-end justify-end">
          {isImageUploading ? <button
            type="button"
            className="px-6 py-3 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            Image Upload In Progress
          </button>
          :
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            disabled={isImageUploading}
          >
            Save Changes
          </button>}
        </div>
      </form>
    </div>
  )
}