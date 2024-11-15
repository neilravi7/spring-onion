import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ChefHat, MapPin, Camera, AlertCircle } from 'lucide-react';

export default function FoodVendorRegistration() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log(data)
    // Handle registration logic here
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ChefHat className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Your Restaurant
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our network of amazing food vendors
          </p>
        </motion.div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <motion.div variants={itemVariants} className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="sr-only">First name</label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="First name"
                  {...register("firstName", { required: "First name is required" })}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">Last name</label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Last name"
                  {...register("lastName", { required: "Last name is required" })}
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="restaurant-name" className="sr-only">Restaurant name</label>
            <input
              id="restaurant-name"
              name="restaurantName"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Restaurant name"
              {...register("restaurantName", { required: "Restaurant name is required" })}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="address" className="sr-only">Address</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="address"
                id="address"
                className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Restaurant address"
                {...register("address", { required: "Address is required" })}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="restaurant-image" className="block text-sm font-medium text-gray-700">
              Restaurant Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Restaurant preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                ) : (
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="restaurant-image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                  >
                    <span>Upload a file</span>
                    <input 
                      id="restaurant-image" 
                      name="restaurantImage" 
                      type="file" 
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                      {...register("restaurantImage", { required: "Restaurant image is required" })}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </motion.div>

          {Object.keys(errors).length > 0 && (
            <motion.div variants={itemVariants} className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      {Object.keys(errors).map((key) => (
                        <li key={key}>{errors[key].message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ChefHat className="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
              </span>
              Register Restaurant
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}